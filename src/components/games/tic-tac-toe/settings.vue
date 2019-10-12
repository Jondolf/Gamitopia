<template>
  <div class="settings">
    <h2>Settings</h2>
    <button v-on:click="this.toggleSettingsVisibility">
      Back To Start Menu
    </button>
    <div class="grid-size-setting-container">
      <div class="grid-size">
        <h3>Coming Soon</h3>
        <p>4x4</p>
      </div>
      <div class="grid-size">
        <h3>Already Active</h3>
        <p>3x3</p>
      </div>
    </div>
    <p>*working settings coming soon</p>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "Start-Menu",
  components: {},
  methods: {
    toggleSettingsVisibility() {
      this.$emit("openSettingsBtnClicked");
    }
  },
  data: function() {
    return {
      settingsVisibility: true
    };
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "@/global.scss";
.settings {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: white;
  z-index: 2;
  button {
    width: 100%;
    height: 20%;
    background-color: rgba(34, 40, 49, 0.5);
    color: white;
    font-size: 16px;
    outline: none;
    border: 1px solid black;
    border-left: none;
    border-right: none;
  }

  button:hover {
    background-color: rgba(34, 40, 49, 0.75);
  }
}
.darkMode button {
  background-color: rgb(36, 41, 49);
  color: white;
  border-color: white;
}
.darkMode button:hover {
  background-color: rgb(50, 57, 68);
}
.darkMode .settings {
  background-color: black;
}
.grid-size-setting-container {
  display: flex;
  justify-content: space-between;
  padding: 10%;
  h3 {
    border: 1px solid;
    padding: 5px;
    margin-bottom: 15px;
    font-size: 3vw;
  }
}

@media only screen and (min-width: 600px) {
  .grid-size h3 {
    font-size: 2.4vw;
  }
}

@media only screen and (min-width: 1100px) {
  .grid-size h3 {
    font-size: 1.5vw;
  }
}
</style>
