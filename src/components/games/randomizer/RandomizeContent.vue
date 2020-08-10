<template>
  <div class="randomize-content">
    <keep-alive>
      <div>
        <NumberRange v-if="whatToRandomize === 'Number range'" />
        <HeadsOrTails v-if="whatToRandomize === 'Heads or tails'" />
        <ThrowDice v-if="whatToRandomize === 'Throw dice'" />
      </div>
    </keep-alive>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import NumberRange from './what-to-randomize/NumberRange.vue';
import HeadsOrTails from './what-to-randomize/HeadsOrTails.vue';
import ThrowDice from './what-to-randomize/ThrowDice.vue';

export default defineComponent({
  name: 'RandomizeContent',

  components: {
    NumberRange,
    HeadsOrTails,
    ThrowDice
  },

  props: {
    whatToRandomize: String
  }
});
</script>

<style lang="scss" scoped>
.randomize-content {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  padding-top: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
