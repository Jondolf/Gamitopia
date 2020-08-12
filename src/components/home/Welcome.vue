<template>
  <div class="welcome">
    <span class="welcome-to-text">Welcome To</span>
    <h1 class="gamitopia-text">Gamitopia</h1>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Welcome'
});
</script>

<style lang="scss" scoped>
.welcome {
  min-height: 150px;
  height: 30vh;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;

  .welcome-to-text {
    border-bottom: 2px solid white;
  }

  .gamitopia-text {
    font-size: 42px;
    font-weight: bold;
    margin: 5px 0 5px 0;
  }
}
</style>
