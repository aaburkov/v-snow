import { PluginObject } from "vue";
import { DirectiveBinding } from "vue/types/options";
import component from "./Component.vue";
import Scene from "./Scene";

const statefulDirective = () => {
  let scene: Scene;
  return {
    inserted(el: HTMLElement, binding: DirectiveBinding) {
      scene = new Scene(el, binding.value);
      scene.start();
    },
    update(el: HTMLElement, binding: DirectiveBinding) {
      scene.updateConfig(binding.value);
    }
  };
};
export const directive = statefulDirective();

const plugin: PluginObject<any> = {
  install(Vue) {
    Vue.directive("snow", directive);
    Vue.component("VSnow", component);
  }
};

// auto install
if (typeof window !== "undefined" && window.Vue) {
  plugin.install(window.Vue);
  (window as any).vsnow = plugin;
}

export {
  plugin as default,
  component as VSnowContainer,
  directive as VSnowDirective
};
