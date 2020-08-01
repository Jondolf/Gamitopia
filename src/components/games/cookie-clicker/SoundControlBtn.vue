<template>
  <button v-on:click="$emit('btnClicked')" class="sound-control-btn">
    <i class="material-icons" ref="soundToggleIcon"></i>
  </button>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  name: 'SoundControlBtn',

  props: {
    soundOnText: String,
    soundOffText: String,
    soundOn: Boolean
  },

  mounted() {
    const soundToggleIcon = this.$refs.soundToggleIcon as HTMLButtonElement;
    if (this.soundOn) {
      soundToggleIcon.innerText = this.soundOnText;
    } else {
      soundToggleIcon.innerText = this.soundOffText;
    }
  },

  watch: {
    soundOn() {
      const soundToggleIcon = this.$refs.soundToggleIcon as HTMLButtonElement;
      if (this.soundOn) {
        soundToggleIcon.innerText = this.soundOnText;
      } else {
        soundToggleIcon.innerText = this.soundOffText;
      }
    }
  }
});
</script>

<style lang="scss" scoped>
@import '@/global.scss';
.sound-control-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 65px;
  height: 65px;
  border-radius: 50%;
  overflow: hidden;
  background-color: white;
  border: 1px solid black;
  background-size: 70%;
  background-repeat: no-repeat;
  background-position: center center;
  transition: 0.4s;
  font-family: 'Material Icons';
  font-size: 35px;
  &:hover {
    background-color: rgba(255, 255, 255, 0.7);
  }

  i {
    color: black;
  }
}
</style>
