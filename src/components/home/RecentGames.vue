<template>
  <div class="recent-games">
    <h2>Recent Games</h2>
    <div class="game-container">
      <GameThumbnail v-for="(game, index) in recentGames" :key="index" :game="game" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useStore } from 'vuex';
import GameThumbnail from '@/components/games/GameThumbnail.vue';

export default defineComponent({
  name: 'RecentGames',

  components: {
    GameThumbnail
  },

  setup() {
    const recentGames = useStore().state.games.recentGames;
    return { recentGames };
  }
});
</script>

<style lang="scss" scoped>
h2 {
  margin: 65px auto 20px auto;
  color: var(--color-light-contrast);
}

.new-img {
  width: 18vw;
  border-radius: var(--border-radius);
  margin: 20px, 0;
  transition: 1s;
}

.new-img:hover {
  width: 20vw;
}

.game-container {
  margin: auto;
  padding: initial;
}
</style>
