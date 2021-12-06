<template>
  <div class="container">
    <input type="checkbox" id="toggle" :checked="value" @input="onInput" />
    <label for="toggle"></label>
  </div>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
  props: {
    value: Boolean
  },
  methods: {
    onInput(e) {
      this.$emit("input", e.target.checked);
    }
  }
});
</script>

<style scoped lang="scss">
.container {
  display: inline-flex;
}
input[type="checkbox"] {
  visibility: hidden;
  &:checked + label {
    transform: rotate(360deg);
    background-color: $vue-color;
    &:before {
      transform: translateX(54px);
      background-color: #fff;
    }
  }
}

label {
  display: flex;
  width: 100px;
  height: 46px;
  border: 3px solid;
  border-radius: 99em;
  position: relative;
  transition: transform 0.75s ease-in-out;
  transform-origin: 50% 50%;
  cursor: pointer;
  background-color: $dark-red-color;

  &:before {
    transition: transform 0.75s ease;
    transition-delay: 0.5s;
    content: "";
    display: block;
    position: absolute;
    width: 38px;
    height: 38px;
    background-color: #000;
    border-radius: 50%;
    top: 1px;
    left: 1px;
  }
}

@media screen and (max-width: 600px) {
}

@media screen and (max-width: 400px) {
  label {
    width: 90px;
    height: 36px;
    &:before {
      width: 28px;
      height: 28px;
    }
  }
}
</style>
