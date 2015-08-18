var webtask = require("webtask-tools");
var express = require("express");
var request = require("request");

function lifxBreathe(lifxAccessToken, bulbSelector, params, callback) {
  request({
    url: "https://api.lifx.com/v1beta1/lights/" + bulbSelector + "/effects/breathe.json",
    method: "POST",
    json: params,
    headers: { "Authorization":  "Bearer " + lifxAccessToken }
  }, callback);
}

var app = express();

app.post("/", function(req, res) {
  console.log("Received POST", req.headers, req.webtaskContext.data);

  var lifxAccessToken  = req.webtaskContext.data.LIFX_ACCESS_TOKEN;
  var bulbSelector     = req.webtaskContext.data.LIFX_BULB_SELECTOR || "all";
  var webhookToken     = req.webtaskContext.data.WEBHOOK_TOKEN;

  if (!lifxAccessToken)
    return res.status(500).send("Missing LIFX_ACCESS_TOKEN secret");

  // Verify the buildkite webhook token if there was one configured
  if (webhookToken && req.headers["x-buildkite-token"] != webhookToken)
    return res.status(401).send("Invalid webhook token");

  // Find the event name
  var buildkiteEvent = req.headers["x-buildkite-event"];

  // Returns whatever LIFX returns, unless there"s an error and then it returns a 500
  var breatheResponse = function(params) {
    return lifxBreathe(lifxAccessToken, bulbSelector, params, function(lifxError, lifxResponse, lifxBody) {
      if (lifxResponse && lifxResponse.statusCode)
        res.status(lifxResponse.statusCode).send(JSON.stringify(lifxBody));
      else
        res.status(500).send(String(lifxError) + " - " + String(lifxBody));
    });
  }

  if (buildkiteEvent == "build.running") {
    console.log("Build running");
    return breatheResponse({
      power_on:   false,
      color:      "yellow brightness:5%",
      from_color: "yellow brightness:35%",
      period:     5,
      cycles:     9999,
      persist:    true
    });
  }

  if (buildkiteEvent == "build.finished") {
    if (req.webtaskContext.data.build.state == "passed") {
      console.log("Build passed");
      return breatheResponse({
        power_on:   false,
        color:      "green brightness:75%",
        from_color: "green brightness:10%",
        period:     0.45,
        cycles:     3,
        persist:    true,
        peak:       0.2
      });
    } else {
      console.log("Build failed");
      return breatheResponse({
        power_on:   false,
        color:      "red brightness:60%",
        from_color: "red brightness:25%",
        period:     0.1,
        cycles:     20,
        persist:    true,
        peak:       0.2
      });
    }
  }

  res.send("Ignoring webhook event `" + buildkiteEvent + "`");
});

module.exports = webtask.fromExpress(app);
