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
  width: 20vw;
  height: 20vw;
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
    width: 40vw;
    height: 40vw;
  }
}
</style>
