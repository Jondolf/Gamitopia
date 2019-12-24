<template>
  <div class="death-screen">
    <h3>You died.</h3>
    <p>You lost {{ coinsLost }} coins.</p>
    <button v-on:click="openMap">Back to map</button>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "Death-Screen",
  components: {},
  props: {
    coinsLost: Number
  },
  methods: {
    openMap() {
      this.$emit("openMap");
    }
  },
  watch: {}
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "@/global.scss";
.death-screen {
  background-color: rgba(0, 0, 0, 0.5);
  width: 33%;
  text-align: left;
  border-radius: 5px;
  position: absolute;
  top: 10%;
  z-index: 2;
  overflow: hidden;
  color: white;
  box-shadow: black 3px 3px 10px;
  h3 {
    padding: 10px 10px 0 10px;
  }
  p {
    padding: 5px 10px 2px 10px;
  }
  button {
    background-color: rgba(0, 0, 0, 0);
    color: white;
    outline: none;
    border: none;
    width: 100%;
    transition: 0.3s;
    height: 100%;
    text-align: left;
    padding: 0 10px 2px 10px;
  }
  button:hover {
    background-color: rgba(50, 50, 50, 0.5);
  }
}
</style>
