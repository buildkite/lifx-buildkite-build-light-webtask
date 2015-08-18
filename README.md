# LIFX Buildkite Build Light (Webtask.io)

An example [Webtask](https://webtask.io) webhook [Buildkite](https://buildkite.com/) endpoint for creating a [LIFX](https://lifx.com/) powered build light.

:v::panda_face::v:

![LIFX panda build light in action](http://i.imgur.com/FrBTgnf.gif)

## Usage

### Install webtask-cli

```bash
npm install -h webtask-cli
wt init
```

### Create a webtask

```
wt create https://raw.githubusercontent.com/buildkite/lifx-buildkite-build-light-webtask/master/index.js \
  --secret LIFX_ACCESS_TOKEN=[TOKEN FROM LIFX] \
  --param  LIFX_BULB_SELECTOR=all
```

The `LIFX_ACCESS_TOKEN` is a LIFX API token you generate from [https://cloud.lifx.com/settings](https://cloud.lifx.com/settings).

The `LIFX_BULB_SELECTOR` is LIFX API build selector to choose which bulbs to turn on (see [LIFX developer docs](http://developer.lifx.com/#selectors) for examples). The default is `all`.

You can optionally provide a `WEBHOOK_TOKEN` to verify the webhook came from Buildkite. You'd also provide that same token in the next step, when you set up the webhook in Buildkite.

### Setup the webhook in Buildkite

Copy the URL given to you by `wt create` and paste it into a new webhook notification in Buildkite:

**Organization Settings** → **Notifications** → **Webhooks** → **Add**

### Trigger a build!

:tada:

### Check your webtask logs

```
wt logs
```

## Personalising

One bulb per project? One bulb per build pipeline step? A LIFX chandelier that twinkles rainbows after each deploy? The possibilities are endless!

Check out [developer.lifx.com](https://developer.lifx.com/) to see what’s possible with the API, then fork this project, and get hacking.

## License

See the [LICENSE](LICENSE.md) file for license rights and limitations (MIT).