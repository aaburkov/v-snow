<template>
  <button type="button" class="btn" @click="onPress" :disabled="disabled">
    <span class="label">
      {{ label }}
    </span>
  </button>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "Button",
  props: {
    label: {
      type: String,
      required: true
    },
    onPress: {
      type: Function,
      required: true
    },
    disabled: Boolean
  }
});
</script>

<style scoped lang="scss">
.btn {
  cursor: pointer;
  background-color: $red-color;
  color: $primary-color;
  font-weight: bold;
  font-size: 1.5rem;
  border-radius: 5px;
  border: none;
  padding: 0.4rem 0.9rem;
  transition: background-color, transform 0.3s ease;

  &:hover {
    &:not(:disabled) {
      background-color: $dark-red-color;
    }
  }
  &:active {
    transform: scale(1.05);
  }
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}
</style>
