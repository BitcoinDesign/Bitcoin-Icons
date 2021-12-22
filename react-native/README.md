
# Bitcoin Icons for React Native

[![npm version](https://img.shields.io/npm/v/@bitcoin-design/bitcoin-icons-react-native.svg?style=flat-square)](https://www.npmjs.com/package/@bitcoin-design/bitcoin-icons-react-native)
[![npm downloads](https://img.shields.io/npm/dm/@bitcoin-design/bitcoin-icons-react-native.svg?style=flat-square)](https://www.npmjs.com/package/@bitcoin-design/bitcoin-icons-react-native)

Bitcoin Icons is an open-source/open-design set of icons made for Bitcoin centric applications. Included are general icons most applications need like arrows and a home icon, and maybe more importantly Bitcoin-specific icons like a wallet, keys, miner and Bitcoin symbols.

https://bitcoinicons.com

### Installation

First, install `@bitcoin-design/bitcoin-icons-react` from npm:

```sh-native
```

### Usage

Now each icon can be imported individually as a React component:

```js
import { BitcoinIcon } from '@bitcoin-design/bitcoin-icons-react-native/filled'

function MyComponent() {
  return (
    <div>
      <BitcoinIcon style={{height: "5px", width: "5px", color: '#F7931A' }} />
      <p>...</p>
    </div>
  )
}
```

The outline icons can be imported from `@bitcoin-design/bitcoin-icons-react/outline`, and the filled icons can be imported from `@bitcoin-design/bitcoin-icons-react/filled`.

Icons use an upper camel case naming convention and are always suffixed with the word `Icon`.
