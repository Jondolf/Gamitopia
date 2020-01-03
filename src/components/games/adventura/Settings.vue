<template>
  <div class="settings" ref="startMenu">
    <div class="ui-elements">
      <h1>Settings</h1>
      <div class="btn-container">
        <button v-on:click="closeSettings">Go back</button>
        <button v-on:click="toggleFullscreen">
          <span v-if="fullscreenOn">Fullscreen on</span
          ><span v-if="!fullscreenOn">Fullscreen off</span>
        </button>
        <button v-on:click="toggleMusic">
          <span v-if="musicOn">Music on</span
          ><span v-if="!musicOn">Music off</span>
        </button>
        <button v-on:click="toggleSfx">
          <span v-if="sfxOn">Sound effects on</span
          ><span v-if="!sfxOn">Sound effects off</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  name: 'settings',
  components: {},
  props: {
    fullscreenOn: Boolean,
    musicOn: Boolean,
    sfxOn: Boolean
  },
  data() {
    return {};
  },
  methods: {
    closeSettings() {
      this.$emit('closeSettings');
    },
    toggleFullscreen() {
      this.$emit('toggleFullscreen');
    },
    toggleMusic() {
      this.$emit('toggleMusic');
    },
    toggleSfx() {
      this.$emit('toggleSfx');
    }
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '@/global.scss';

@keyframes BACKGROUND-MOVE {
  0% {
    background-position-x: 0;
  }
  100% {
    background-position-x: 10000000px;
  }
}
@keyframes HEADER-ANIMATION {
  0% {
    font-size: 25px;
  }
  50% {
    font-size: 30px;
    font-weight: bold;
  }
  100% {
    font-size: 25px;
  }
}
.settings {
  height: 473px;
  overflow: hidden;
  .ui-elements {
    z-index: 2;
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
  }
  h1 {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 84px;
    color: white;
    text-shadow: 0 0 3px black;
    animation: HEADER-ANIMATION 10s infinite;
  }
  .btn-container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    height: 50%;
    button {
      background-color: rgba(255, 255, 255, 0.7);
      color: black;
      width: 60%;
      padding: 15px;
      border: none;
      border-radius: 5px;
      transition: 0.4s;
    }
    button:hover {
      background-color: rgba(255, 255, 255, 0.9);
      width: 65%;
      padding: 20px;
    }
  }
}
</style>
