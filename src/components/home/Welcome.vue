<template>
  <div class="welcome">
    <span class="welcome-to-text">Welcome To</span>
    <img src="@/assets/images/gamitopia_logo_wide.png" alt="Gamitopia wide logo" class="gamitopia-text" />
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
  font-size: 20px;

  .welcome-to-text {
    border-bottom: 2px solid white;
  }

  .gamitopia-text {
    width: 60vh;
    max-width: 80vw;
    margin: 5px 0 5px 0;
  }
}
</style>
