<template>
  <div class="features">
    <span class="one">FAST</span>
    <span class="two">CONFIGURABLE</span>
    <span class="three">RESIZABLE</span>
  </div>
</template>

<script>
import Vue from "vue";

export default Vue.extend({});
</script>

<style scoped lang="scss">
.features {
  height: 3.5rem;
  color: $vue-color;
  overflow: hidden;
  position: relative;
}
.one,
.two,
.three {
  position: absolute;
  display: inline-block;
  font-weight: bold;
  font-size: 2.5rem;
  animation: slide-up 18s infinite;
  transform: translateY(-100px);
  right: 50%;
}
.one {
  animation-delay: 0s;
}
.two {
  animation-delay: 6s;
}
.three {
  animation-delay: 12s;
}
@keyframes slide-up {
  0% {
    transform: translate(50%, -100px);
  }
  10% {
    transform: translate(50%, 0);
  }
  35% {
    transform: translate(50%, 0);
  }
  45% {
    transform: translate(50%, 100px);
  }
  80% {
    transform: translate(50%, 100px);
  }
  100% {
    transform: translate(50%, 100px);
  }
}
</style>
