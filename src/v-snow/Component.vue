<template>
  <div
    id="vue_snow_container"
    :class="[containerClass, 'snow_container']"
    ref="container"
  >
    <slot></slot>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import Scene from "./Scene";
interface State {
  scene: Scene | null;
}
export default Vue.extend({
  props: {
    containerClass: String,
    density: Number,
    fall_speed: Number,
    size: Number,
    color: String,
    opacity: Number,
    images: Array as PropType<string[]>,
    zIndex: String
  },
  data(): State {
    return {
      scene: null
    };
  },
  mounted() {
    this.scene = new Scene("#vue_snow_container", {
      ...(this.density && { density: this.density }),
      ...(this.fall_speed && { fall_speed: this.fall_speed }),
      ...(this.size && { size: this.size }),
      ...(this.color && { color: this.color }),
      ...(this.opacity && { opacity: this.opacity }),
      ...(this.images && { images: this.images }),
      ...(this.zIndex && { zIndex: this.zIndex })
    });
    this.scene.start();
  },
  watch: {
    density(newVal) {
      this.scene?.updateConfig({ density: newVal });
    },
    fall_speed(newVal) {
      this.scene?.updateConfig({ fall_speed: newVal });
    },
    size(newVal) {
      this.scene?.updateConfig({ size: newVal });
    },
    color(newVal) {
      this.scene?.updateConfig({ color: newVal });
    },
    opacity(newVal) {
      this.scene?.updateConfig({ opacity: newVal });
    },
    images(newVal) {
      this.scene?.updateConfig({ images: newVal });
    }
  }
});
</script>

<style scoped>
.snow_container {
  position: fixed;
  left: 0;
  top: 0;
  pointer-events: none;
  height: 100%;
  width: 100%;
}
</style>
