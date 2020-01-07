<template>
  <div>
    <i v-on:click="toggleDarkMode" id="darkModeButton" class="material-icons">{{
      iconText
    }}</i>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  name: 'DarkMode',
  data() {
    return {
      iconText:
        localStorage.getItem('darkMode') === 'true'
          ? 'brightness_2'
          : 'wb_sunny',
      darkModeOnOff: true
    };
  },
  methods: {
    toggleDarkMode() {
      this.darkModeOnOffBoolean();
      this.darkModeOnOff = !this.darkModeOnOff;
      localStorage.setItem('darkMode', this.darkModeOnOff.toString());

      if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('darkMode');
        this.iconText = 'brightness_2';
      } else if (localStorage.getItem('darkMode') === 'false') {
        document.body.classList.remove('darkMode');
        this.iconText = 'wb_sunny';
      }
    },
    darkModeOnOffBoolean() {
      if (localStorage.getItem('darkMode') === 'true') {
        this.darkModeOnOff = true;
      } else {
        this.darkModeOnOff = false;
      }
    }
  },
  created() {
    if (localStorage.getItem('darkMode') === 'true') {
      document.body.classList.add('darkMode');
    } else if (localStorage.getItem('darkMode') === 'false') {
      document.body.classList.remove('darkMode');
    }
  }
});
</script>

<style lang="scss" scoped>
@import '@/global.scss';
#darkModeButton {
  width: 3vw;
  height: 3vw;
  font-size: 35px;
  padding: 1vw;
  border-radius: 5px;
  transition: 1s;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}

#darkModeButton:hover {
  width: 4vw;
  height: 4vw;
  font-size: 40px;
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
