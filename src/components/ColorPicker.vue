<template>
  <label class="wrapper">
    <div class="circle" :style="{ 'border-color': value }">
      <input type="color" :value="value" @input="onInput" />
    </div>
  </label>
</template>

<script>
import Vue from "vue";
export default Vue.extend({
  props: {
    value: String
  },
  methods: {
    onInput(e) {
      this.$emit("input", e.target.value);
    }
  }
});
</script>

<style scoped lang="scss">
input {
  top: -10px;
  border: none;
  outline: none;
  -webkit-appearance: none;
  width: 0;
  height: 0;
  position: absolute;
  z-index: -1;
}
label {
  display: inline-block;
  position: relative;
  width: 60px;
  height: 60px;
  cursor: pointer;
  overflow: hidden;
}

.circle {
  position: relative;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border-width: 17px;
  border-style: solid;
  cursor: inherit;
}

.color_picker {
  -webkit-appearance: none;
  border: none;
  background: #fff;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  overflow: hidden;
  outline: none;
  cursor: inherit;

  &::-webkit-color-swatch,
  &::-moz-color-swatch {
    border-color: transparent;
  }

  &::-webkit-color-swatch-wrapper {
    padding: 0;
  }

  &::-webkit-color-swatch {
    border: none;
    border-radius: 50%;
  }

  &::-moz-focus-inner {
    border: none;
    padding: 0;
    border-radius: 50%;
  }

  &::-moz-color-swatch {
    border: none;
    border-radius: 50%;
    height: 140px;
  }
}
</style>
