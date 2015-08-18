# LIFX Buildkite Build Light (Webtask)

An example (serverless) [Webtask](https://webtask.io) webhook endpoint for creating a [LIFX](https://lifx.com/) powered [Buildkite](https://buildkite.com/) build light.

:v::panda_face::v:

![LIFX panda build light in action](http://i.imgur.com/FrBTgnf.gif)

## Usage

### Install webtask-cli

```bash
npm install -h webtask-cli
wt init
```

### Create a webtask

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

### Setup the webhook in Buildkite

Create a new webhook notification in Buildkite and paste in your webtask's URL: **Organization Settings** → **Notifications** → **Webhooks** → **Add**

Head back to your webtask logs and you should already see a `ping` event! If so, all that's left is to trigger a build! :tada:

## Personalising

One bulb per project? One bulb per build pipeline step? A LIFX chandelier that twinkles rainbows after each deploy? The possibilities are endless!

Check out [api.developer.lifx.com](http://api.developer.lifx.com) to see what’s possible with the API, then fork this project, and get hacking.

## License

See the [LICENSE](LICENSE.md) file for license rights and limitations (MIT).
