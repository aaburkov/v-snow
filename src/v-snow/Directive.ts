import { DirectiveBinding } from "vue/types/options";
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
      scene.start();
    }
  };
};
export default statefulDirective();
