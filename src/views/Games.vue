<template>
  <div id="games">
    <GameThumbnails />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import GameThumbnails from '@/components/games/GameThumbnails.vue';

export default defineComponent({
  name: 'Games',

  components: {
    GameThumbnails
  }
});
</script>

<style lang="scss">
#games {
  padding-top: 66px;
}
</style>
