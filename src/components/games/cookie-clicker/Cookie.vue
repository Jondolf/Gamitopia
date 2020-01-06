<template>
  <button v-on:click="$emit('cookieClicked')" class="cookie" ref="cookie" />
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  name: 'Cookie',
  mounted() {
    const cookie = this.$refs.cookie as HTMLButtonElement;
    cookie.style.backgroundImage =
      'url(' + require('@/assets/images/cookie-clicker/cookie.png') + ')';
  }
});
</script>

<style lang="scss" scoped>
@import '@/global.scss';
.cookie {
  width: 25vw;
  height: 25vw;
  margin: 20px;
  background-color: rgba(0, 0, 0, 0);
  border-radius: 30%;
  outline: none;
  border: none;
  background-size: 100%;
  background-position: center center;
  background-repeat: no-repeat;
}

.cookie:active {
  background-size: 95%;
}

@media only screen and (max-width: 800px) {
  .cookie {
    width: 40vw;
    height: 40vw;
  }
}
</style>
