<template>
  <div class="hand">
    <!--<VPopover v-for="(card, index) in cards" :key="index" :trigger="'hover'">
      <Card
        :card="card"
        :style="`transform: rotate(${getRotationAngle(index)}deg)`"
        class="tooltip-target b3 medium"
      />
      <Card
        :key="index + 'tooltip'"
        :card="card"
        class="large"
        slot="popover"
      />
    </VPopover>-->
  </div>
</template>

<script>
import { defineComponent } from 'vue';
// @ts-ignore
// import { VPopover } from 'v-tooltip';
// import Card from './Card.vue';
import ICard from '@/interfaces/Card';

export default defineComponent({
  name: 'CardHand',

  components: {
    // VPopover,
    // Card
  },

  props: {
    cards: Array
  },

  methods: {
    getRotationAngle(index) {
      const maxAngle = 45;
      const angleInBetween = maxAngle / (this.cards.length - 1);
      return -(maxAngle / 2) + index * angleInBetween;
    }
  }
});
</script>

<style lang="scss" scoped>
.hand,
.v-popover.hand .trigger {
  height: 50%;
  padding: 10px;
  position: absolute;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: flex-end;
}
</style>
