# Lionshare Desktop

<img width="1044" alt="Lionshare"
  src="https://cloud.githubusercontent.com/assets/31465/21711143/f96d2ea8-d3a1-11e6-81b0-7c676e0d469a.png">

Lionshare is a simple macOS application that helps you track cryptocurrencies and
your portfolio. Build using Electron, React and Mobx.

For the API and other parts of the Lionshare herd, checkout our [Github page](https://github.com/lionsharecapital)
or get in touch with us on [Twitter](https://twitter.com/getlionshare).

## Development

Electron specific code, including application configuration and Webpack build files,
can be found under `desktop/`. All React application code is stored inside `src/`.

To run development application and Webpack server:

```
yarn
yarn run dev
```

## About

Lionshare is an open source project created by [Ben Jennings](https://twitter.com/benjennin_gs), [Jori Lallo](https://twitter.com/jorilallo) and [Maksim](https://twitter.com/maksim_s).

## FAQ

**When will Lionshare support < your favorite coin >?**

Right now we're supporting coins with the most marget cap listed on GDAX and Poloniex. If we're not yet supporting your favorite coin, please create an issue to [lionshare-api](https://github.com/lionsharecapital/lionshare-api/issues) repository or upvote an existing one :+1:

**Does my portfolio leave my computer?**

No, Lionshare is completely client-side and doesn't hold any keys. We take security very seriously and all our communication happends over HTTPS and all the code is open source.

**How will you make money?**

We won't, this is a side project.

**When can I have a Linux, Windows, iOS, etc version?**

Right now we're focused on supporting macOS but open to adding support for other platforms in the future.

## License

MIT
