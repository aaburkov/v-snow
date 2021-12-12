# V-Snow

[![Vue2](https://img.shields.io/badge/Vue-2.x-brightgreen.svg?style=for-the-badge)](https://vuejs.org/)
[![npm](https://img.shields.io/npm/v/vsnow?style=for-the-badge)](https://www.npmjs.com/package/vsnow)
[![npm](https://img.shields.io/npm/dw/vsnow?style=for-the-badge)](https://www.npmjs.com/package/vsnow)

![alt text](assets/img/vue.png)

Snowfall effect plugin for Vue js

## 👀 Demo

You can watch the demo and play with the parameters on **[DEMO PAGE](http://a-boorkov.github.io/v-snow)**

## 💾 Instalation

This plugin requires Vue 2.X.

```sh
npm install -S vsnow
```

## Initialization

### ES2015 (Webpack/Rollup/Browserify/etc)

> Global install

```javascript
import Vue from "vue";
import VSnow from "vsnow";

//Full install
Vue.use(VSnow);

// Or as a directive-only
import { VSnowDirective } from "vsnow";
Vue.directive("snow", VSnowDirective);

// Or only as a component
import { VSnowContainer } from "vsnow";
Vue.component("VSnow", VSnowContainer);
```

> Installation inside a component

```javascript
<template>
  <div >
    <!-- DIRECTIVE -->
    <div v-snow>
    </div>
    <!-- OR -->
    <VSnow>
  </div>
</template>
<script>
  import {VSnowDirective, VSnowContainer} from 'vsnow'

  export default {
    components: {
      VSnow: VSnowContainer
    },
    directives:{
      'snow' : VSnowDirective,
    }
  }
</script>
```

### UMD (Browser)

```html
<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/vsnow/dist/vsnow.min.js"></script>
```

> Plugin will be installed automatically.

### SSR (NUXT)

`plugins/VSnow.js`

```js
import VSnow from "vsnow";
import Vue from "vue";

Vue.use(VSnow);
```

`nuxt.config.js`

```js
module.exports = {
  //...
  plugins: [{ src: "~/plugins/VSnow", mode: "client" }]
  //...
};
```

## 🚀 Usage

```html
<template>
  <!-- Directive -->
  <div v-snow="snowOptions"></div>

  <!-- Component -->
  <VSnow
    containerClass="myClass"
    :density="snowOptions.density"
    :size="snowOptions.size"
    :fall_speed="snowOptions.fall_speed"
    :color="snowOptions.color"
    :images="snowOptions.images"
    :opacity="snowOptions.opacity"
  />
</template>
<script>
  export default {
    data() {
      return {
        snowOptions: {
          density: 50,
          fall_speed: 4,
          size: 10,
          color: "#FFFFFF",
          opacity: 1,
          images: images
        }
      };
    }
  };
</script>
```

### `That's it 🤩`

## ⚙️ Configuration

> All parameters are optional and have default values

| Props          | Description                                              | Type                 | Default |
| -------------- | -------------------------------------------------------- | -------------------- | ------- |
| show           | Determines whether the animation should be played or not | Boolean              | true    |
| zIndex         | z-index of canvas                                        | String               | '999'   |
| dencity        | Count of flakes                                          | Number from 0 to 100 | 50      |
| fall_speed     | Snowflake falling speed                                  | Number from 1 to 5   | 2       |
| size           | Size of snowflake                                        | Number               | 10      |
| color          | Color of snowflakes                                      | String               | #FFFFFF |
| images         | Array of images path`s | String[] | []                   |
| opacity        | Opacity of snowflakes                                    | Number               | 1       |
| containerClass | Class of component                                       | String               | ''      |

> **Notice**: DENSITY Calculated from the screen width using the formula - **(view_width/400) x density**

## 👏 Contributing

I've more than happy to see potential contributions, so don't hesitate. If you have any suggestions, ideas or problems feel free to add new issue, but first please make sure your question does not repeat previous ones.
