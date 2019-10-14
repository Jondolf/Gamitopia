<template>
  <div>
    <img v-on:click="toggleDarkMode" v-bind:src="imgUrl" id="darkModeButton" />
  </div>
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
  width: 3vw;
  height: 3vw;
  padding: 1vw;
  border-radius: 5px;
  transition: 1s;
  border-radius: 50%;
}

#darkModeButton:hover {
  width: 4vw;
  height: 4vw;
  padding-left: 0.5vw;
}

@media only screen and (max-width: 1000px) {
  #darkModeButton {
    width: 4vw;
    height: 4vw;
  }
  #darkModeButton:hover {
    width: 5vw;
    height: 5vw;
    padding-left: 0.5vw;
  }
}

@media only screen and (max-width: 700px) {
  #darkModeButton {
    width: 5vw;
    height: 5vw;
  }
  #darkModeButton:hover {
    width: 6vw;
    height: 6vw;
    padding-left: 0.5vw;
  }
}

@media only screen and (max-width: 500px) {
  #darkModeButton {
    width: 7vw;
    height: 7vw;
  }
  #darkModeButton:hover {
    width: 8.5vw;
    height: 8.5vw;
    padding-left: 0.5vw;
  }
}
</style>
