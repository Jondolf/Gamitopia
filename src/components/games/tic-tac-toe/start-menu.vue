<template>
  <div class="start-menu">
    <h2>Tic-Tac-Toe</h2>
    <button v-on:click="this.toggleStartMenuVisibility">
      Start Game
    </button>
    <Settings
      v-if="this.settingsVisibility"
      @openSettingsBtnClicked="this.toggleSettingsVisibility"
    />
    <button v-on:click="this.toggleSettingsVisibility">Settings</button>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Settings from "@/components/games/tic-tac-toe/settings.vue";
export default Vue.extend({
  name: "Start-Menu",
  components: {
    Settings
  },
  methods: {
    toggleStartMenuVisibility() {
      this.$emit("startMenuBtnClicked");
    },
    toggleSettingsVisibility() {
      this.settingsVisibility = !this.settingsVisibility;
    }
  },
  data: function() {
    return {
      startMenuVisibility: true,
      settingsVisibility: false
    };
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "@/global.scss";
.start-menu {
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
.darkMode .start-menu {
  background-color: black;
}
.darkMode button {
  background-color: rgb(36, 41, 49);
  color: white;
  border-color: white;
}
.darkMode button:hover {
  background-color: rgb(50, 57, 68);
}
</style>
