<template>
  <div id="home">
    <div class="top-container">
      <Welcome />
      <NewestGame />
    </div>
    <RecentGames />
    <LatestNewsPost />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Welcome from '@/components/home/Welcome.vue';
import NewestGame from '@/components/home/NewestGame.vue';
import RecentGames from '@/components/home/RecentGames.vue';
import LatestNewsPost from '@/components/home/LatestNewsPost.vue';

export default defineComponent({
  name: 'Home',

  components: {
    Welcome,
    NewestGame,
    RecentGames,
    LatestNewsPost
  }
});
</script>

<style lang="scss" scoped>
#home {
  padding-top: 66px;

  .top-container {
    background-color: var(--color-primary);
    text-align: center;
    min-height: 70vh;
    padding-bottom: 2.5vw;
    color: white;
  }
}
</style>
