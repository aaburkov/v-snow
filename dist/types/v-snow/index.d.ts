import { PluginObject } from "vue";
import { DirectiveBinding } from "vue/types/options";
import component from "./Component.vue";
import Scene from "./Scene";
export declare const directive: {
    inserted(el: HTMLElement, binding: DirectiveBinding): void;
    update(el: HTMLElement, binding: DirectiveBinding): void;
};
declare const plugin: PluginObject<any>;
export { plugin as default, component as VSnowContainer, directive as VSnowDirective, Scene as VSnowFunction };
