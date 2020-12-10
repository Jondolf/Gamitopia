<template>
  <div class="game-page">
    <GameHeader :game="game" />
    <slot><!-- Game container comes here --></slot>
    <GooglePlayLink v-if="game.googlePlayStoreLink" :link="game.googlePlayStoreLink" />
    <GameDescription :game="game" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import GameHeader from '@/components/games/GameHeader.vue';
import GameDescription from '@/components/games/GameDescription.vue';
import GooglePlayLink from '@/components/games/GooglePlayLink.vue';
import { GameInfo } from '../../interfaces/GameInfo';

export default defineComponent({
  name: 'GamePage',

  components: {
    GameHeader,
    GameDescription,
    GooglePlayLink
  },

  props: {
    game: {
      type: Object as () => GameInfo,
      required: true
    }
  }
});
</script>

<style scoped>
.game-page {
  padding-top: 66px;
}
</style>
