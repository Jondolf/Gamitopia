<template>
  <div class="settings">
    <h2>Settings</h2>
    <button v-on:click="this.toggleSettingsVisibility">
      Back To Home Menu
    </button>
    <div class="grid-size-setting-container">
      <button id="3x3-grid" v-on:click="this.activate3x3GridClicked">
        3x3 Grid
      </button>
      <button id="4x4-grid" v-on:click="this.activate4x4GridClicked">
        4x4 Grid
      </button>
    </div>
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
    },
    activate3x3GridClicked() {
      this.$emit("activateThreeByThreeGridClicked");
    },
    activate4x4GridClicked() {
      this.$emit("activateFourByFourGridClicked");
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
    color: white;
    font-size: 16px;
    outline: none;
    border: 1px solid black;
    border-left: none;
    border-right: none;
    background-color: rgba(34, 40, 49, 0.5);
    transition: 0.4s;
  }

  button:hover {
    background-color: rgb(91, 97, 112);
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
  button {
    border: 1px solid;
    margin: 5px;
    padding: 5px;
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
