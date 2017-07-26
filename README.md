# Lionshare Desktop

![1-diwz_x9p3c86sfo-gydi5a](https://cloud.githubusercontent.com/assets/31465/22240931/0e1f9c58-e1d2-11e6-9c28-d7cbd3b3f03b.png)

[**Blog: Announcing Lionshare**](https://medium.com/@jorilallo/announcing-lionshare-541daf082160)

Lionshare is a simple macOS application that helps you track cryptocurrencies and
your portfolio. Build using Electron, React and Mobx.

For the API and other parts of the Lionshare herd, checkout our [Github page](https://github.com/lionsharecapital)
or get in touch with us on [Twitter](https://twitter.com/getlionshare).

_Special thanks to [Coinbase](http://coinbase.com/) for sponsoring the release of Lionshare as open source software. If you’re interested in building products to reinvent the future of finance, [get in touch](https://www.coinbase.com/careers)._


## Development

Electron specific code, including application configuration and Webpack build files,
can be found under `desktop/`. All React application code is stored inside `src/`.

### Installation

To install for development, clone the repository and install the dependencies with `yarn`.

```bash
$ git clone git@github.com:lionsharecapital/lionshare-desktop.gitfd$a
$ cd lionshare-desktop
$ yarn 
```

### Running

To run development application and Webpack server:

```
yarn run dev
```

## About

Lionshare is an open source project created by [Ben Jennings](https://twitter.com/benjennin_gs), [Jori Lallo](https://twitter.com/jorilallo) and [Maksim Stepanenko](https://twitter.com/maksim_s).

## Donate

Lionshare is an open source side project. To support development and keep our server running, you can donate using Bitcoin and Ethereum:

- Bitcoin: `14cYsomReqcsznbKTuW6Mh91uZm2j2AF5B`
- Ethereum: `0xbBC664b891D6Fc7EBF516594D690e370C5C32A9f`

## FAQ

**When will Lionshare support < your favorite coin >?**

Right now we're supporting coins with the most market cap listed on GDAX and Poloniex. If we're not yet supporting your favorite coin, please create an issue to [lionshare-api](https://github.com/lionsharecapital/lionshare-api/issues) repository or upvote an existing one :+1:

**Does my portfolio leave my computer?**

No, Lionshare is completely client-side and doesn't hold any keys. We take security very seriously and all our communication happens over HTTPS. All code is open source.

**How will you make money?**

We won't, this is a side project.

**When can I have a Linux, Windows, iOS, etc version?**

Right now we're focused on supporting macOS but open to adding support for other platforms in the future.

## License

MIT
