<template>
  <div id="app">
    <GithubCorner
      class="github_corner"
      url="https://github.com/aaburkov/v-snow"
    />
    <header class="header">
      <img src="../assets/img/vue.png" class="logo" />
      <h1 class="head_title">
        <span class="snowflake">❄️</span>
        V-SNOW
        <span class="snowflake">❄️</span>
      </h1>
    </header>
    <VSnow
      containerClass="snow"
      :density="snowOptions.density"
      :size="snowOptions.size"
      :fall_speed="snowOptions.fall_speed"
      :color="snowOptions.color"
      :images="snowOptions.images"
      :opacity="snowOptions.opacity"
      :show="snowOptions.show"
      zIndex="-1"
    />
    <Features />
    <div class="controlls_wrapper">
      <div class="controll_item">
        <span class="controll_label">SHOW</span>
        <Switcher v-model="snowOptions.show" />
      </div>
      <div class="controll_item">
        <span class="controll_label">SPEED</span>
        <SpinBox :min="1" :max="5" v-model="snowOptions.fall_speed" :step="1" />
      </div>
      <div class="controll_item">
        <span class="controll_label">DENSITY</span>
        <SpinBox :min="1" :max="100" v-model="snowOptions.density" :step="5" />
      </div>
      <div class="controll_item">
        <span class="controll_label">SIZE</span>
        <SpinBox :min="1" :max="50" v-model="snowOptions.size" :step="1" />
      </div>
      <div class="controll_item">
        <span class="controll_label">COLOR</span>
        <ColorPicker v-model="snowOptions.color" />
      </div>
      <div class="controll_item">
        <span class="controll_label">OPACITY</span>
        <SpinBox :min="0" :max="1" v-model="snowOptions.opacity" :step="0.1" />
      </div>
      <div class="controll_item full_width">
        <span class="controll_label">IMAGES</span>
        <textarea
          v-model="imagesInputValue"
          class="textarea"
          placeholder="Paste images URL's separated by comma and press CONFIRM"
        ></textarea>
        <Btn label="Confirm" :onPress="confirmImages" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import GithubCorner from "./components/GithubCorner.vue";
import Btn from "./components/Button.vue";
import SpinBox from "./components/SpinBox.vue";
import ColorPicker from "./components/ColorPicker.vue";
import Features from "./components/Features.vue";
import Switcher from "./components/Switcher.vue";
export default Vue.extend({
  name: "App",
  components: {
    GithubCorner,
    Btn,
    SpinBox,
    ColorPicker,
    Features,
    Switcher
  },
  data() {
    const images: string[] = [];
    const imagePreset = [
      "https://pngimg.com/uploads/snowflakes/snowflakes_PNG7576.png",
      "https://pngimg.com/uploads/snowflakes/snowflakes_PNG7586.png",
      "https://pngimg.com/uploads/snowflakes/snowflakes_PNG7590.png"
    ];
    return {
      imagesInputValue: "",
      snowOptions: {
        density: 100,
        fall_speed: 4,
        size: 10,
        color: "#FFFFFF",
        opacity: 1,
        images: images,
        show: true
      }
    };
  },
  methods: {
    confirmImages() {
      this.snowOptions.images = this.imagesInputValue.split(",");
      this.imagesInputValue = "";
    }
  }
});
</script>
<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  padding: 50px 0;
  color: $primary-color;
}
.header {
  margin-bottom: 20px;
}
.snowflake {
  display: inline-block;
  animation: rotate 6s infinite linear;
}
.head_title {
  font-family: "WinterHoliday";
  font-size: 3.5rem;
  margin: 0;
}
.logo {
  width: 8rem;
  height: auto;
}
.github_corner {
  position: fixed;
  top: 0;
  right: 0;
}
.controlls_wrapper {
  overflow: hidden;
  width: 90%;
  max-width: 700px;
  margin: 0 auto;
  padding: 30px 15px;
  border-radius: 20px;
  z-index: 10;
  background-color: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(2px);
  display: flex;
  flex-wrap: wrap;
}
.controll_item {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 1em;
  margin-bottom: 1em;
  flex-grow: 1;
  flex-basis: 200px;
}
.controll_item.full_width {
  flex-basis: 100%;
  margin: 0;
}

.controll_label {
  margin-bottom: 5px;
  font-weight: bold;
  font-size: 1rem;
}
.textarea {
  resize: none;
  border-radius: 5px;
  padding: 10px 15px;
  font-size: 1rem;
  background-color: transparent;
  overflow: hidden;
  width: 90%;
  height: 100px;
  color: $primary-color;
  border: 1px solid $primary-color;
  margin-bottom: 10px;
}
.snow {
  z-index: 0;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@media screen and (max-width: 510px) {
  .controll_item {
    margin-right: 0;
  }
}
</style>
