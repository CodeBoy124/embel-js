# EmbelJS - Embedded Elements Javascript

[![Crafted by Human](./docs/crafted-white.svg)](https://madebyhuman.iamjarl.com)
![v0.0.0](https://img.shields.io/badge/v0.0.0-orange)

![EmbelJS logo](./docs/logo.png)

A simple, easy to learn framework for creating HTML elements

```js
const { H1, Ul, Li } = e;

const name_list = ["Matthew", "Mark", "Luke", "John"];

H1("Hello, World");
Ul(() => {
  for (let name of name_list) {
    Li(name);
  }
});
```

It is inspired by [VanJS](https://vanjs.org/), and I recently came across [Creo](https://github.com/xnimorz/creo), which is similar to this project

## Getting started

Every nice library has a guide to follow along and learn. You can find the one for this project [here](./docs/get-started.md)

### ESM vs UMD

You might have noticed there are ESM and UMD versions of the library. For those who are unfamiliar with ESM, the UMD version is probably the easiest to start with. Just use a script tag like `<script src="path/to/embel.umd.js"></script>`

## Reference

For the more advanced users, that have already read the get started, you can find the reference [here](./docs/reference.md)

## Crafted by Human

[![Crafted by Human](https://madebyhuman.iamjarl.com/badges/crafted-white.svg)](https://madebyhuman.iamjarl.com)

So far, this project has been entirely made by hand, without AI involvement.
