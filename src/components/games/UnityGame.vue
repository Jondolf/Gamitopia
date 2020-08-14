<template>
  <div ref="container" class="unity-game unity-desktop">
    <canvas ref="canvas"></canvas>
    <div ref="loadingBar" cass="unity-loading-bar">
      <div cass="unity-logo"></div>
      <div ref="progressBarEmpty" class="unity-progress-bar-empty">
        <div ref="progressBarFull" class="unity-progress-bar-full"></div>
      </div>
    </div>

    <button ref="fullscreenButton" class="toggle-fullscreen-button">
      <i class="material-icons">fullscreen</i>
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import useUnityLoader from '@/composables/games/useUnityLoader';

export default defineComponent({
  name: 'UnityGame',

  props: {
    buildUrl: { type: String, required: true },
    projectName: { type: String, required: true },
    gameName: { type: String, required: true },
    gameVersion: { type: String, required: true },
    isGzipped: { type: Boolean, required: true }
  },

  setup(props) {
    const { container, canvas, loadingBar, progressBarFull, fullscreenButton, loadGame } = useUnityLoader();

    onMounted(() => loadGame(props.buildUrl, props.projectName, props.gameName, props.gameVersion, props.isGzipped));

    return {
      container,
      canvas,
      loadingBar,
      progressBarFull,
      fullscreenButton
    };
  }
});
</script>

<style scoped lang="scss">
.unity-game {
  width: 100%;
  height: 100%;
  position: relative;

  canvas {
    width: 100% !important;
    height: 100% !important;
    background: #222831;
  }

  .toggle-fullscreen-button {
    width: 50px;
    height: 50px;
    position: absolute;
    top: 15px;
    right: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(255, 255, 255, 0.25);
    border-radius: 50%;

    i {
      font-size: 30px;
      color: black;
    }
  }

  .unity-loading-bar {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    display: none;
  }

  .unity-logo {
    width: 154px;
    height: 130px;
    background: url('/unity-games/unity-logo-dark.png') no-repeat center;
  }

  .unity-progress-bar-empty {
    width: 141px;
    height: 18px;
    margin-top: 10px;
    background: url('/unity-games/progress-bar-empty-dark.png') no-repeat center;
  }

  .unity-progress-bar-full {
    width: 0%;
    height: 18px;
    margin-top: 10px;
    background: url('/unity-games/progress-bar-full-dark.png') no-repeat center;
  }
}
</style>
