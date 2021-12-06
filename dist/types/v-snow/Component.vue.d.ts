import Vue from "vue";
import Scene from "./Scene";
interface State {
    scene: Scene | null;
}
declare const _default: import("vue/types/vue").ExtendedVue<Vue, State, unknown, unknown, {
    containerClass: string;
    density: number;
    fall_speed: number;
    size: number;
    color: string;
    opacity: number;
    images: string[];
    zIndex: string;
    show: boolean;
}>;
export default _default;
