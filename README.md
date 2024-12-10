<p align="center">
  <a href="https://cmmv.io/" target="blank"><img src="https://raw.githubusercontent.com/andrehrferreira/docs.cmmv.io/main/public/assets/logo_CMMV2_icon.png" width="300" alt="CMMV Logo" /></a>
</p>
<p align="center">Contract-Model-Model-View (CMMV) <br/> Building scalable and modular applications using contracts.</p>
<p align="center">
    <a href="https://www.npmjs.com/package/@cmmv/core"><img src="https://img.shields.io/npm/v/@cmmv/core.svg" alt="NPM Version" /></a>
    <a href="https://github.com/andrehrferreira/cmmv-server/blob/main/LICENSE"><img src="https://img.shields.io/npm/l/@cmmv/core.svg" alt="Package License" /></a>
    <a href="https://dl.circleci.com/status-badge/redirect/circleci/QyJWAYrZ9JTfN1eubSDo5u/JEtDUbr1cNkGRxfKFJo7oR/tree/main" target="_blank"><img src="https://dl.circleci.com/status-badge/img/circleci/QyJWAYrZ9JTfN1eubSDo5u/JEtDUbr1cNkGRxfKFJo7oR/tree/main.svg?style=svg" alt="CircleCI" /></a>
</p>

<p align="center">
  <a href="https://cmmv.io">Documentation</a> &bull;
  <a href="https://github.com/andrehrferreira/cmmv-encryptor/issues">Report Issue</a>
</p>

## Description

The `@cmmv/vue` module provides seamless integration between CMMV and Vue applications, offering a transpiler to generate **mixins for Vue 2** and **composables for Vue 3** based on CMMV contracts. This module enables efficient RPC function usage and provides transparent reading and writing of data using Protobuf contracts.

With `@cmmv/vue`, you can quickly connect your Vue applications to the CMMV framework, allowing full utilization of RPC functionalities with minimal setup.


## Installation

Install the ``@cmmv/vue`` package via npm:

```bash
$ pnpm add @cmmv/vue
```

## Features

* **RPC Integration:** Easily connect Vue applications with CMMV RPC functions.
* **Automatic Protobuf Parsing:** Provides transparent handling of Protobuf contracts for reading and writing data.
* **Mixins for Vue 2:** Automatically generated mixins simplify RPC integration.
* **Composables for Vue 3:** Leverage Vue's Composition API with generated composables for better reactivity and code organization.
* **Dynamic Contract Updates:** Automatically updates when contracts are modified on the server side.

## Quick Start

### Vue 2

For Vue 2, the module generates mixins for handling RPC methods. Here's an example:

```javascript
import Vue from 'vue';
import RPCMixins from 'http://localhost:3000/assets/rpc-mixins.js';

// Register RPC Mixins globally
Vue.mixin(RPCMixins);

new Vue({
  el: '#app',
  data: {
    message: '',
  },
  async created() {
    // Example RPC call
    this.message = await this.rpc.getMessage({ id: 1 });
  },
});
```

### Vue 3

For Vue 3, the module generates composables for streamlined integration with the Composition API:

```javascript
import { createApp } from 'vue';
import { useRPC } from 'http://localhost:3000/assets/rpc-composables.js';

const app = createApp({
  setup() {
    const rpc = useRPC();
    const message = ref('');

    onMounted(async () => {
      message.value = await rpc.getMessage({ id: 1 });
    });

    return { message };
  },
});

app.mount('#app');
```