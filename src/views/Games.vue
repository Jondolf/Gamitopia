<template>
  <div id="games">
    <PageHeader>Games</PageHeader>
    <GameThumbnails />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import PageHeader from '@/components/PageHeader.vue';
import GameThumbnails from '@/components/games/GameThumbnails.vue';

export default defineComponent({
  name: 'Games',

  components: {
    PageHeader,
    GameThumbnails
  }
});
</script>
