<template>
  <div class="in-the-shadows-game">
    <GodotGame buildUrl="/godot-games/in-the-shadows" fileName="inTheShadows" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import GodotGame from '@/components/games/GodotGame.vue';

export default defineComponent({
  name: 'InTheShadowsGame',

  components: {
    GodotGame
  }
});
</script>

<style scoped lang="scss">
.in-the-shadows-game {
  width: 100%;
  height: 100%;
}
</style>
