import { PluginObject } from "vue";
import Component from "./Component.vue";
import Directive from "./Directive";

const plugin: PluginObject<any> = {
  install(Vue) {
    Vue.directive("snow", Directive);
    Vue.component("VSnow", Component);
  }
};

// auto install
if (typeof window !== "undefined" && window.Vue) {
  plugin.install(window.Vue);
  (window as any).vsnow = plugin;
}

export {
  plugin as default,
  Component as VSnowContainer,
  Directive as VSnowDirective
};
