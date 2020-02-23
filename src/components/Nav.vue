<template>
  <div id="nav">
    <DarkMode />
    <div class="nav-link-container">
      <p v-if="isAdmin">Admin</p>
      <router-link to="/">Home</router-link>
      <router-link to="/games">Games</router-link>
      <router-link to="/news">News</router-link>
      <router-link to="/about">About</router-link>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import DarkMode from '@/components/DarkMode.vue';

import globalVariables from '@/global.variables';

export default Vue.extend({
  name: 'Nav',
  components: {
    DarkMode
  },

  data() {
    return {
      isAdmin: globalVariables.isAdmin
    };
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '@/global.scss';
#nav {
  background-color: var(--secondary-color);
  color: white;
  padding: 0 20px;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  box-sizing: border-box;
  position: fixed;
  top: 0;
  align-items: center;
  height: 68px;
  z-index: 10;
  .nav-link-container {
    display: flex;
    align-items: center;
    font-size: 22px;
    margin-right: 22px;
  }

  .nav-link-container a {
    display: inline-block;
    margin-left: 28px;
    color: white;
    font-weight: normal;
    font-style: normal;
  }

  .nav-link-container a:hover {
    color: rgb(200, 200, 255);
    border-bottom: 2px solid rgb(200, 200, 255);
    margin-bottom: -2px;
    text-decoration: none;
  }
}
.darkMode {
  #nav .nav-link-container a {
    font-weight: normal;
    font-style: normal;
  }
  #nav .nav-link-container a:hover {
    color: rgb(230, 40, 40);
    border-bottom: 2px solid rgb(230, 40, 40);
    margin-bottom: -2px;
    text-decoration: none;
  }
}
@media only screen and (max-width: 500px) {
  #nav .nav-link-container a {
    font-size: 20px;
  }
}

@media only screen and (max-width: 460px) {
  #nav .nav-link-container a {
    font-size: 17px;
  }
}

@media only screen and (max-width: 430px) {
  #nav .nav-link-container a {
    font-size: 15px;
    margin-left: 10px;
  }
}

@media only screen and (max-width: 350px) {
  #nav .nav-link-container a {
    font-size: 14px;
    margin-left: 8px;
  }
}
</style>
