<template>
  <div class="randomizer-game">
    <keep-alive>
      <WhatToRandomizeMenu
        v-if="isWhatToRandomizeMenuOpen"
        @changeOption="changeOption"
        @closeWhatToRandomizeMenu="isWhatToRandomizeMenuOpen = false"
      />
    </keep-alive>

    <div class="top-container">
      <button
        @click="isWhatToRandomizeMenuOpen = !isWhatToRandomizeMenuOpen"
        class="open-what-to-randomize-menu-button"
      >
        <i class="material-icons">menu</i>
      </button>
      <h2>{{ whatToRandomize }}</h2>
      <button
        @click="$emit('toggleFullscreen')"
        class="toggle-fullscreen-button"
      >
        <i class="material-icons">{{
          isFullscreen ? 'fullscreen_exit' : 'fullscreen'
        }}</i>
      </button>
    </div>

    <RandomizeContent :whatToRandomize="whatToRandomize" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import RandomizeContent from '@/components/games/randomizer/RandomizeContent.vue';
import WhatToRandomizeMenu from '@/components/games/randomizer/WhatToRandomizeMenu.vue';

export default Vue.extend({
  name: 'RandomizerGame',

  components: {
    RandomizeContent,
    WhatToRandomizeMenu
  },

  props: {
    isFullscreen: Boolean
  },

  data() {
    return {
      whatToRandomize: 'Number range',
      isWhatToRandomizeMenuOpen: false
    };
  },

  methods: {
    changeOption(optionName: string) {
      this.whatToRandomize = optionName;
    }
  }
});
</script>

<style lang="scss" scoped>
@import '@/global.scss';
@keyframes animategradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

@media only screen and (max-width: 500px) {
  .randomizer-game .top-container h2 {
    display: none;
  }
}

.randomizer-game {
  width: 100%;
  height: 100%;
  background: linear-gradient(
    -45deg,
    #124cca,
    #e7623a,
    #a83ae7,
    #124cca,
    #1296ca,
    #1bbb78,
    #1296ca,
    #124cca
  );
  color: white;
  background-size: 900% 900%;
  animation: animategradient 90s infinite;
  cursor: default;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.top-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  z-index: 5;
  height: 70px;
  h2 {
    margin: 0;
    width: 100%;
    text-align: center;
  }
  button {
    background: transparent;
    outline: none;
    border: none;
    position: absolute;
    top: 15px;
    width: 45px;
    height: 45px;
    border-radius: 5px;
    transition: 0.4s ease-out;
    display: flex;
    justify-content: center;
    align-items: center;
    &:hover {
      border-radius: 50%;
      background-color: rgba(255, 255, 255, 0.25);
    }
    &:first-child {
      left: 15px;
    }
    &:last-child {
      right: 15px;
    }
    i {
      font-weight: bold;
      font-size: 40px;
    }
  }
}
</style>
