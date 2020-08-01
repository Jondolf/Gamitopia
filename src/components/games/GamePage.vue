<template>
  <div class="game-page">
    <GameHeader :game="game" />
    <slot><!-- Game container comes here --></slot>
    <GameDescription :game="game" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import GameHeader from '@/components/games/GameHeader.vue';
import GameDescription from '@/components/games/GameDescription.vue';
import { GameInfo } from '../../interfaces/GameInfo';

export default Vue.extend({
  name: 'GamePage',

  components: {
    GameHeader,
    GameDescription
  },

  props: {
    game: Object as () => GameInfo
  }
});
</script>

<style scoped>
.game-page {
  padding-top: 66px;
}
</style>
