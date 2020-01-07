<template>
  <button
    v-on:click="$emit('btnClicked')"
    ref="soundToggle"
    class="material-icons"
    id="soundControlBtn"
  ></button>
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
    const soundToggle = this.$refs.soundToggle as HTMLButtonElement;
    if (this.soundOn) {
      soundToggle.innerText = this.soundOnText;
    } else {
      soundToggle.innerText = this.soundOffText;
    }
  },

  watch: {
    soundOn() {
      const soundToggle = this.$refs.soundToggle as HTMLButtonElement;
      if (this.soundOn) {
        soundToggle.innerText = this.soundOnText;
      } else {
        soundToggle.innerText = this.soundOffText;
      }
    }
  }
});
</script>

<style lang="scss" scoped>
@import '@/global.scss';
#soundControlBtn {
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

  // Google's icon font
  font-family: 'Material Icons';
  font-size: 35px;
}

#soundControlBtn:hover {
  background-color: rgba(255, 255, 255, 0.7);
}
</style>
