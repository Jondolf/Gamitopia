<template>
  <button @click="$emit('btn-clicked')" class="sound-control-btn">
    <i class="material-icons" ref="soundToggleIcon"></i>
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
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
