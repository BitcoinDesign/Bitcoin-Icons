# Bitcoin Icons for Vue

[![npm version](https://img.shields.io/npm/v/@bitcoin-design/bitcoin-icons-vue.svg?style=flat-square)](https://www.npmjs.com/package/@bitcoin-design/bitcoin-icons-vue)
[![npm downloads](https://img.shields.io/npm/dm/@bitcoin-design/bitcoin-icons-vue.svg?style=flat-square)](https://www.npmjs.com/package/@bitcoin-design/bitcoin-icons-vue)

Bitcoin Icons is an open-source/open-design set of icons made for Bitcoin centric applications. Included are general icons most applications need like arrows and a home icon, and maybe more importantly Bitcoin-specific icons like a wallet, keys, miner and Bitcoin symbols.

https://bitcoinicons.com

### Installation

*Note that this library currently only supports Vue 3.*

First, install `@bitcoin-design/bitcoin-icons-vue` from npm:

```sh
npm install @bitcoin-design/bitcoin-icons-vue
```

### Usage

Now each icon can be imported individually as a Vue component:

```vue
<template>
  <div>
    <BitcoinIcon style="height:5px;width:5px;color:#F7931A" />
    <p>...</p>
  </div>
</template>

<script>
import { BitcoinIcon } from '@bitcoin-design/bitcoin-icons-vue/filled'

export default {
  components: { BitcoinIcon }
}
</script>
```

The outline icons can be imported from `@bitcoin-design/bitcoin-icons-vue/outline`, and the filled icons can be imported from `@bitcoin-design/bitcoin-icons-vue/filled`.

Icons use an upper camel case naming convention and are always suffixed with the word `Icon`.
