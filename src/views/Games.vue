<template>
  <div id="games">
    <GameThumbnails />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import GameThumbnails from "@/components/games/GameThumbnails.vue";
export default Vue.extend({
  name: "home",
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
