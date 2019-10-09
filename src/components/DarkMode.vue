<template>
  <img v-on:click="toggleDarkMode" v-bind:src="imgUrl" id="darkModeButton" />
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "DarkMode",
  data() {
    return {
      imgUrl:
        localStorage.getItem("darkMode") === "true"
          ? require("@/assets/images/turnDarkModeOff.png")
          : require("@/assets/images/turnDarkModeOn.png"),
      darkModeOnOff: true
    };
  },
  methods: {
    toggleDarkMode() {
      this.darkModeOnOffBoolean();
      this.darkModeOnOff = !this.darkModeOnOff;
      localStorage.setItem("darkMode", this.darkModeOnOff.toString());

      if (localStorage.getItem("darkMode") === "true") {
        document.body.classList.add("darkMode");
        this.imgUrl = require("@/assets/images/turnDarkModeOff.png");
      } else if (localStorage.getItem("darkMode") === "false") {
        document.body.classList.remove("darkMode");
        this.imgUrl = require("@/assets/images/turnDarkModeOn.png");
      }
    },
    darkModeOnOffBoolean() {
      if (localStorage.getItem("darkMode") === "true") {
        this.darkModeOnOff = true;
      } else {
        this.darkModeOnOff = false;
      }
    }
  },
  created() {
    if (localStorage.getItem("darkMode") === "true") {
      document.body.classList.add("darkMode");
    } else if (localStorage.getItem("darkMode") === "false") {
      document.body.classList.remove("darkMode");
    }
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "@/global.scss";

#darkModeButton {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

@media only screen and (max-width: 460px) {
  #darkModeButton {
    width: 28px;
    height: 28px;
  }
}

@media only screen and (max-width: 430px) {
  #darkModeButton {
    width: 26px;
    height: 26px;
  }
}

@media only screen and (max-width: 350px) {
  #darkModeButton {
    width: 26px;
    height: 26px;
  }
}
</style>
