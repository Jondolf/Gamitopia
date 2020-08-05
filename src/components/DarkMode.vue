<template>
  <button class="dark-mode-toggle-button">
    <i @click="toggleDarkMode" class="dark-mode-toggle-button material-icons">{{
      iconText
    }}</i>
  </button>
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
          : 'wb_sunny'
    };
  },
  methods: {
    toggleDarkMode() {
      if (localStorage.getItem('gamitopiaTheme') === 'dark default-dark') {
        localStorage.setItem('gamitopiaTheme', 'light default-light');
        document.body.className = 'light default-light';
        this.iconText = 'wb_sunny';
      } else if (
        localStorage.getItem('gamitopiaTheme') === 'light default-light'
      ) {
        localStorage.setItem('gamitopiaTheme', 'dark default-dark');
        document.body.className = 'dark default-dark';
        this.iconText = 'brightness_2';
      } else {
        document.body.className = 'light default-light';
        localStorage.setItem('gamitopiaTheme', 'light default-light');
      }
    }
  },

  created() {
    if (localStorage.getItem('gamitopiaTheme') === 'dark default-dark') {
      document.body.className = 'dark default-dark';
    } else if (
      localStorage.getItem('gamitopiaTheme') === 'light default-light'
    ) {
      document.body.className = 'light default-light';
    } else {
      document.body.className = 'light default-light';
      localStorage.setItem('gamitopiaTheme', 'light default-light');
    }
  }
});
</script>

<style lang="scss" scoped>
@import '@/global.scss';
.dark-mode-toggle-button {
  width: 45px;
  height: 45px;
  margin: 0 10px;
  border-radius: 5px;
  transition: 0.5s;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  i {
    font-size: 35px;
    &:hover {
      font-size: 40px;
    }
  }
}
</style>
