<template>
  <div id="home">
    <NewestGame />
    <RecentGames />
    <LatestNewsPost />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import NewestGame from '@/components/home/NewestGame.vue';
import RecentGames from '@/components/home/RecentGames.vue';
import LatestNewsPost from '@/components/home/LatestNewsPost.vue';
export default defineComponent({
  name: 'home',
  components: {
    NewestGame,
    RecentGames,
    LatestNewsPost
  }
});
</script>

<style lang="scss">
#home {
  padding-top: 66px;
}
</style>
