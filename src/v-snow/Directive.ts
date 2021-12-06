import { DirectiveBinding } from "vue/types/options";
import { DirectiveOptions } from "vue/types/umd";
import Scene from "./Scene";

const statefulDirective = (): DirectiveOptions => {
  let scene: Scene | null;
  return {
    inserted(el: HTMLElement, binding: DirectiveBinding) {
      scene = new Scene(el, binding.value);
      scene.start();
    },
    update(el: HTMLElement, binding: DirectiveBinding) {
      scene?.updateConfig(binding.value);
      scene?.start();
    },
    unbind() {
      scene?.destroyScene();
    }
  };
};
export default statefulDirective();
