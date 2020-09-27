<template>
  <button class="dark-mode-toggle-button">
    <i @click="toggleDarkMode" class="dark-mode-toggle-button material-icons">{{ iconText }}</i>
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'DarkMode',
  data() {
    let highlightJSLightTheme;
    let highlightJSDarkTheme;
    return {
      iconText: localStorage.getItem('darkMode') === 'true' ? 'brightness_2' : 'wb_sunny',
      highlightJSLightTheme: (highlightJSLightTheme as unknown) as HTMLLinkElement,
      highlightJSDarkTheme: (highlightJSDarkTheme as unknown) as HTMLLinkElement
    };
  },
  methods: {
    toggleDarkMode() {
      if (localStorage.getItem('gamitopiaTheme') === 'dark default-dark') {
        localStorage.setItem('gamitopiaTheme', 'light default-light');
        document.body.className = 'light default-light';
        this.highlightJSLightTheme.disabled = false;
        this.highlightJSDarkTheme.disabled = true;
        this.iconText = 'wb_sunny';
      } else if (localStorage.getItem('gamitopiaTheme') === 'light default-light') {
        localStorage.setItem('gamitopiaTheme', 'dark default-dark');
        document.body.className = 'dark default-dark';
        this.highlightJSLightTheme.disabled = true;
        this.highlightJSDarkTheme.disabled = false;
        this.iconText = 'brightness_2';
      } else {
        document.body.className = 'light default-light';
        this.highlightJSLightTheme.disabled = false;
        this.highlightJSDarkTheme.disabled = true;
        localStorage.setItem('gamitopiaTheme', 'light default-light');
      }
    }
  },

  mounted() {
    this.highlightJSLightTheme = document.getElementById('highlightJSLightTheme')! as HTMLLinkElement;
    this.highlightJSDarkTheme = document.getElementById('highlightJSDarkTheme')! as HTMLLinkElement;
    if (localStorage.getItem('gamitopiaTheme') === 'dark default-dark') {
      document.body.className = 'dark default-dark';
      this.highlightJSLightTheme.disabled = true;
      this.highlightJSDarkTheme.disabled = false;
    } else if (localStorage.getItem('gamitopiaTheme') === 'light default-light') {
      document.body.className = 'light default-light';
      this.highlightJSLightTheme.disabled = false;
      this.highlightJSDarkTheme.disabled = true;
    } else {
      document.body.className = 'light default-light';
      this.highlightJSLightTheme.disabled = false;
      this.highlightJSDarkTheme.disabled = true;
      localStorage.setItem('gamitopiaTheme', 'light default-light');
    }
  }
});
</script>

<style lang="scss" scoped>
.dark-mode-toggle-button {
  width: 45px;
  height: 45px;
  margin: 0 10px;
  border-radius: var(--border-radius);
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
