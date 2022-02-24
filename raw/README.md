# Bitcoin Icons

[![npm version](https://img.shields.io/npm/v/@bitcoin-design/bitcoin-icons-svg.svg?style=flat-square)](https://www.npmjs.com/package/@bitcoin-design/bitcoin-icons-svg)
[![npm downloads](https://img.shields.io/npm/dm/@bitcoin-design/bitcoin-icons-svg.svg?style=flat-square)](https://www.npmjs.com/package/@bitcoin-design/bitcoin-icons-svg)

Bitcoin Icons is an open-source/open-design set of icons made for Bitcoin centric applications. Included are general icons most applications need like arrows and a home icon, and maybe more importantly Bitcoin-specific icons like a wallet, keys, miner and Bitcoin symbols.

https://bitcoinicons.com

### Installation

First, install `@bitcoin-design/bitcoin-icons-svg` from npm:

```sh
npm install @bitcoin-design/bitcoin-icons-svg
```

### Usage

Now each icon can be imported individually

```JavaScript
import { BitcoinIcon } from '@bitcoin-design/bitcoin-icons-svg/filled'

console.log(BitcoinIcon)
// ==>
// {
//   name: 'bitcoin',
//   svg: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">...</svg>'
// };
```

The outline icons can be imported from `@bitcoin-design/bitcoin-icons-svg/outline`, and the filled icons can be imported from `@bitcoin-design/bitcoin-icons-svg/filled`.

Icons use an upper camel case naming convention and are always suffixed with the word `Icon`.
