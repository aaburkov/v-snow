# V-Snow

[![Vue2](https://img.shields.io/badge/Vue-2.x-brightgreen.svg?style=for-the-badge)](https://vuejs.org/)
[![npm](https://img.shields.io/npm/v/vsnow?style=for-the-badge)](https://www.npmjs.com/package/vsnow)
[![npm](https://img.shields.io/npm/dw/vsnow?style=for-the-badge)](https://www.npmjs.com/package/vsnow)

Snowfall effect plugin for Vue js

## 👀 Demo

You can play with params on
[DEMO PAGE](http://gamazu.github.io/v-snow)

## 💾 Instalation

This plugin requires Vue 2.X.

```sh
npm install -S vsnow
```

## Initialization

### ES2015 (Webpack/Rollup/Browserify/etc)

```javascript
import Vue from "vue";
import VSnow from "vsnow";

//Full install
Vue.use(VSnow);
// Or as a directive-only
import { VSnowDirective } from "vsnow";
Vue.directive("v-snow", VSnowDirective);
// Or only as a component
import { VSnowContainer } from "vsnow";
Vue.filter("VSnow", VSnowContainer);
```

### UMD (Browser)

```html
<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/vsnow/dist/vsnow.min.js"></script>
```

Plugin will be installed automatically.

## 🚀 Usage

```html
<!-- As a directive -->
<div v-snow>
  <!-- content -->
</div>

<!-- As a wrapper component -->
<VSnow />
```

`That's all 🤩`

## ⚙️ Configuration
