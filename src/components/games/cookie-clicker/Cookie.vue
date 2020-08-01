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
@keyframes cookie-rotate {
  0% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(180deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.cookie {
  width: 60%;
  max-width: 350px;
  padding-top: 100%;
  margin: 20px;
  background-color: rgba(0, 0, 0, 0);
  border-radius: 30%;
  outline: none;
  border: none;
  background-size: 100%;
  background-position: center center;
  background-repeat: no-repeat;
  animation: cookie-rotate 50s linear infinite;
  transition: 0.1s;
}

.cookie:active {
  background-size: 95%;
}

@media only screen and (max-width: 800px) {
  .cookie {
    width: 80%;
    max-width: 315px;
    margin-bottom: 0;
  }
}
</style>
