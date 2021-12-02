<template>
  <div class="wrapper">
    <Btn label="-" :onPress="decrease" :disabled="value == min" />
    <span class="value">
      {{ value }}
    </span>
    <Btn label="+" :onPress="increase" :disabled="value == max" />
  </div>
</template>

<script>
import Vue from "vue";
import Btn from "./Button.vue";
export default Vue.extend({
  props: {
    min: {
      type: Number
    },
    max: {
      type: Number
    },
    value: {
      type: Number
    },
    step: {
      type: Number
    }
  },
  components: {
    Btn
  },
  methods: {
    increase() {
      if (this.value + this.step > this.max) {
        this.$emit("input", this.max);
      } else {
        this.$emit("input", parseFloat((this.value + this.step).toFixed(1)));
      }
    },
    decrease() {
      if (this.value - this.step < this.min) {
        this.$emit("input", this.min);
      } else {
        this.$emit("input", parseFloat((this.value - this.step).toFixed(1)));
      }
    }
  }
});
</script>

<style scoped lang="scss">
.value {
  display: inline-block;
  font-size: 20px;
  min-width: 30px;
}
</style>
