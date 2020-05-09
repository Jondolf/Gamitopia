<template>
  <div class="top-bar">
    <button v-on:click="openStartMenu">Open Menu</button>
    <button v-on:click="onClickButton">Restart</button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  name: 'Top-Bar',
  components: {},
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '@/global.scss';
.top-bar {
  height: 10vw;
  border-bottom: 2px solid black;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  button {
    width: 100%;
    height: 100%;
    background-color: rgba(34, 40, 49, 0.5);
    color: white;
    font-size: 3vw;
    outline: none;
    border: none;
    font-family: Nunito;
    background-color: rgba(34, 40, 49, 0.5);
    transition: 0.4s;
  }

  button:hover {
    background-color: rgb(91, 97, 112);
  }
}
.dark.default-dark button {
  background-color: rgb(36, 41, 49);
}
.dark.default-dark button:hover {
  background-color: rgb(50, 57, 68);
}
.dark.default-dark .top-bar {
  background-color: black;
  border-bottom: 2px solid white;
}

@media only screen and (min-width: 600px) {
  .top-bar {
    height: 6vw;
  }
  .top-bar button {
    font-size: 2vw;
  }
}

@media only screen and (min-width: 1100px) {
  .top-bar {
    height: 4vw;
  }
  .top-bar button {
    font-size: 1.5vw;
  }
}
</style>
