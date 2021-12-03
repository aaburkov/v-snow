import component from "./Component.vue";
import Scene from "./Scene";

const statefulDirective = () => {
  let scene;
  return {
    inserted(el, binding) {
      scene = new Scene(el, binding.value);
      scene.start();
    },
    update(el, binding) {
      scene.updateConfig(binding.value);
    }
  };
};

export const directive = statefulDirective();

function install(Vue, options) {
  if (install.installed) return;
  install.installed = true;

  // Vue.VSnowFunction = Scene;
  Vue.directive("snow", directive);
  Vue.component("VueSnow", component);
}

const plugin = {
  install
};

let GlobalVue = null;
if (typeof window !== "undefined") {
  GlobalVue = window.Vue;
} else if (typeof global !== "undefined") {
  GlobalVue = global.vue;
}

if (GlobalVue) {
  GlobalVue.use(plugin);
}

component.install = install;

export {
  plugin as default,
  component as VSnowContainer,
  directive as VSnowDirective,
  Scene as VSnowFunction
};
