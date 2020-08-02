<template>
  <div class="top-bar">
    <button @click="openStartMenu">Open Menu</button>
    <button @click="onClickButton">Restart</button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'TopBar',

  methods: {
    onClickButton() {
      this.$emit('clicked');
    },

    openStartMenu() {
      this.$emit('startMenuBtnClicked');
    }
  }
});
</script>

<style lang="scss" scoped>
.top-bar {
  height: 10vw;
  border-bottom: 2px solid black;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;

  button {
    width: 50%;
    height: 100%;
    background-color: rgba(34, 40, 49, 0.5);
    color: white;
    font-size: 3vw;
    outline: none;
    border: none;
    font-family: Nunito;
    background-color: rgba(34, 40, 49, 0.5);
    transition: 0.4s;
    &:hover {
      background-color: rgb(91, 97, 112);
    }
  }
}

.dark .top-bar {
  background-color: black;
  border-bottom: 2px solid white;

  button {
    background-color: rgb(36, 41, 49);
    &:hover {
      background-color: rgb(50, 57, 68);
    }
  }
}

@media only screen and (min-width: 600px) {
  .top-bar {
    height: 6vw;
    button {
      font-size: 2vw;
    }
  }
}

@media only screen and (min-width: 1100px) {
  .top-bar {
    height: 4vw;
    button {
      font-size: 1.5vw;
    }
  }
}
</style>
