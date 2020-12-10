<template>
  <div class="target-practise-game">
    <UnityGame
      buildUrl="/unity-games/target-practise/Build"
      fileName="targetPractiseBuild"
      gameName="Target Practise"
      gameVersion="1.0"
      :isGzipped="false"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import UnityGame from '@/components/games/UnityGame.vue';

export default defineComponent({
  name: 'TargetPractiseGame',

  components: {
    UnityGame
  }
});
</script>

<style scoped lang="scss">
.target-practise-game {
  width: 100%;
  height: 100%;
}
</style>
