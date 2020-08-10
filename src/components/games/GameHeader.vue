<template>
  <div class="game-header">
    <h2>{{ game.name }}</h2>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { GameInfo } from '@/interfaces/GameInfo';

export default defineComponent({
  name: 'GameHeader',
  props: {
    game: Object as () => GameInfo
  }
});
</script>

<style lang="scss">
.game-header h2 {
  margin: 30px;
  color: var(--color-light-contrast);
}
</style>
