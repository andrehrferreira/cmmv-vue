<p align="center">
  <a href="https://cmmv.io/" target="blank"><img src="https://raw.githubusercontent.com/cmmvio/docs.cmmv.io/main/public/assets/logo_CMMV2_icon.png" width="300" alt="CMMV Logo" /></a>
</p>
<p align="center">Contract-Model-Model-View (CMMV) <br/> Building scalable and modular applications using contracts.</p>
<p align="center">
    <a href="https://www.npmjs.com/package/@cmmv/vue"><img src="https://img.shields.io/npm/v/@cmmv/vue.svg" alt="NPM Version" /></a>
    <a href="https://github.com/cmmvio/cmmv-vue/blob/main/LICENSE"><img src="https://img.shields.io/npm/l/@cmmv/vue.svg" alt="Package License" /></a>
</p>

<p align="center">
  <a href="https://cmmv.io">Documentation</a> &bull;
  <a href="https://github.com/cmmvio/cmmv-vue/issues">Report Issue</a>
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
import RPCMixins from '/assets/rpc-mixins.js';

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
import { useRPC } from '/assets/rpc-composables.js';

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

### Nuxt

In the plugins/ directory, create a file named rpc.client.ts to register the RPC composables globally.

```javascript
import { defineNuxtPlugin } from '#app';
import { useRPC } from '/assets/rpc-composables.js';

export default defineNuxtPlugin(() => {
    return {
        provide: {
            rpc: useRPC(),
        },
    };
});
```

**Example Component:** ``pages/index.vue``

```vue
<template>
  <div>
    <h1>Tasks</h1>
    <ul>
      <li v-for="task in tasks" :key="task.id">
        {{ task.label }} - {{ task.checked ? 'Completed' : 'Pending' }}
      </li>
    </ul>
    <button @click="fetchTasks">Load Tasks</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const tasks = ref([]);
const { $rpc } = useNuxtApp();

const fetchTasks = async () => {
  try {
    tasks.value = await $rpc.GetTasksList();
  } catch (error) {
    console.error('Error fetching tasks:', error);
  }
};
</script>
```