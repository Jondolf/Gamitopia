<template>
  <div id="home">
    <NewestGame />
    <RecentGames />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import NewestGame from '@/components/home/NewestGame.vue';
import RecentGames from '@/components/home/RecentGames.vue';
export default Vue.extend({
  name: 'home',
  components: {
    NewestGame,
    RecentGames
  }
});
</script>

<style lang="scss">
#home {
  padding-top: 66px;
}
</style>
