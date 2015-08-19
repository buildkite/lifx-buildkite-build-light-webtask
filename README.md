# LIFX Buildkite Build Light (Webtask)

An example [Webtask](https://webtask.io) webhook endpoint for creating a [LIFX](https://lifx.com/) powered [Buildkite](https://buildkite.com/) build light.

Create a webhook endpoint in one line using [webtask-cli](https://github.com/auth0/wt-cli):

<img src="http://i.imgur.com/PWolg0s.png" width="642" alt="Screenshot of creating a webtask">

Add the URL as Buildkite webhook notification:

<img src="http://i.imgur.com/NuOTKz4.png" width="673" alt="Screenshot of adding it to Buildite">

:v::panda_face::v:

![LIFX panda build light in action](http://i.imgur.com/FrBTgnf.gif)

## Step by step

### 1. Install the webtask-cli

```bash
npm install -h webtask-cli
wt init
```

### 2. Create the webtask

```bash
wt create https://raw.githubusercontent.com/buildkite/lifx-buildkite-build-light-webtask/master/index.js \
  --secret LIFX_ACCESS_TOKEN="[TOKEN FROM LIFX]" \
  --param  LIFX_BULB_SELECTOR="all"
```

* `LIFX_ACCESS_TOKEN` is a LIFX API token you generate from [https://cloud.lifx.com/settings](https://cloud.lifx.com/settings).
* `LIFX_BULB_SELECTOR` is LIFX API build selector to choose which bulbs to turn on (see [LIFX developer docs](http://api.developer.lifx.com/docs/selectors) for examples). The default is `all`.
* `WEBHOOK_TOKEN` is optional, and can be provided to verify the webhook came from Buildkite.

Copy the URL, and then start streaming your webtask’s logs:

```bash
wt logs
```

### 3. Setup the webhook notification

Create a new webhook notification in Buildkite and paste in your webtask's URL: **Organization Settings** → **Notifications** → **Webhooks** → **Add**

Make sure to enable all the `build` scopes, as well as the `ping` (so you can see a ping notification in your `wt logs` straight after saving your webhook).

All that's left is to trigger a build! :tada:

### 4. Debugging

You can use the request logs on the bottom of the Buildkite webhook settings page to see the request to and response from your webtask, and you can use `wt logs` to see the logs from your webtask container.

## Personalising

One bulb per project? One bulb per build pipeline step? A LIFX chandelier that twinkles rainbows after each deploy? The possibilities are endless!

Check out [api.developer.lifx.com](http://api.developer.lifx.com) to see what’s possible with the API, then fork this project, and get hacking.

## License

See the [LICENSE](LICENSE.md) file for license rights and limitations (MIT).
