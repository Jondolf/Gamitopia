<template>
  <div class="game-board">
    <div class="dark-overlay"></div>
    <CardHand
      :cards="enemyHand"
      style="top: -10px; transform: rotate(180deg)"
    />
    <CardHand :cards="playerHand" style="bottom: -10px" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CardHand from './CardHand.vue';
import ICard from '@/interfaces/Card';

export default defineComponent({
  name: 'GameBoard',

  components: {
    CardHand
  },

  props: {
    playerHand: Array as () => ICard[],
    enemyHand: Array as () => ICard[]
  }
});
</script>

<style lang="scss">
.game-board {
  width: 100%;
  height: 100%;
  position: relative;
  background: blanchedalmond;
  background-image: url('../../../assets/images/card-game/background.png');
  background-size: cover;
  background-position: center;

  .dark-overlay {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.4);
  }
}
</style>
