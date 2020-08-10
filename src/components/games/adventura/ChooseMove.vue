<template>
  <div class="choose-move">
    <button
      v-if="unlockedMoves.includes('Iron sword')"
      @click="strikeWithSword(ironSword.damage)"
    >
      Strike with sword 0MP
    </button>
    <button
      v-if="unlockedMoves.includes('Heal scroll')"
      @click="heal(healScroll.heal, healScroll.manaToConsume)"
    >
      Heal {{ healScroll.manaToConsume }}MP
    </button>
    <button
      v-if="unlockedMoves.includes('Fire scroll')"
      @click="blastFire(fireScroll.damage, fireScroll.manaToConsume)"
    >
      Blast fire {{ fireScroll.manaToConsume }}MP
    </button>
    <button
      v-if="unlockedMoves.includes('Water scroll')"
      @click="blastWater(waterScroll.damage, waterScroll.manaToConsume)"
    >
      Blast water {{ waterScroll.manaToConsume }}MP
    </button>
    <button
      v-if="unlockedMoves.includes('Ice scroll')"
      @click="blastIce(iceScroll.damage, iceScroll.manaToConsume)"
    >
      Blast ice {{ iceScroll.manaToConsume }}MP
    </button>
    <button
      v-if="unlockedMoves.includes('Earth scroll')"
      @click="blastEarth(earthScroll.damage, earthScroll.manaToConsume)"
    >
      Blast earth {{ earthScroll.manaToConsume }}MP
    </button>
    <button
      v-if="unlockedMoves.includes('Air scroll')"
      @click="blastAir(airScroll.damage, airScroll.manaToConsume)"
    >
      Blast air {{ airScroll.manaToConsume }}MP
    </button>
    <button
      v-if="unlockedMoves.includes('Lightning scroll')"
      @click="
        blastLightning(lightningScroll.damage, lightningScroll.manaToConsume)
      "
    >
      Blast lightning {{ lightningScroll.manaToConsume }}MP
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Melee } from '@/components/games/adventura/melee';
import { Magic } from '@/components/games/adventura/magic';
export default defineComponent({
  name: 'ChooseMove',

  props: {
    unlockedMoves: Array,
    ironSword: Melee,
    fireScroll: Magic,
    waterScroll: Magic,
    iceScroll: Magic,
    earthScroll: Magic,
    airScroll: Magic,
    lightningScroll: Magic,
    healScroll: Magic
  },

  methods: {
    strikeWithSword(amount: number) {
      this.$emit('strike-with-sword', amount);
    },
    blastFire(amount: number, manaToConsume: number) {
      this.$emit('blast-fire', amount, manaToConsume);
    },
    blastWater(amount: number, manaToConsume: number) {
      this.$emit('blast-water', amount, manaToConsume);
    },
    blastIce(amount: number, manaToConsume: number) {
      this.$emit('blast-ice', amount, manaToConsume);
    },
    blastEarth(amount: number, manaToConsume: number) {
      this.$emit('blast-earth', amount, manaToConsume);
    },
    blastAir(amount: number, manaToConsume: number) {
      this.$emit('blast-air', amount, manaToConsume);
    },
    blastLightning(amount: number, manaToConsume: number) {
      this.$emit('blast-lightning', amount, manaToConsume);
    },
    heal(amount: number, manaToConsume: number) {
      this.$emit('heal', amount, manaToConsume);
    }
  }
});
</script>

<style lang="scss" scoped>
.choose-move {
  background-color: rgba(0, 0, 0, 0.5);
  width: 33%;
  text-align: left;
  border-radius: 5px;
  position: absolute;
  top: 10%;
  z-index: 2;
  overflow: hidden;
  box-shadow: black 3px 3px 10px;
  button {
    background-color: rgba(0, 0, 0, 0);
    color: white;
    outline: none;
    border: none;
    width: 100%;
    transition: 0.3s;
    height: 100%;
    text-align: left;
    padding: 3px 5px 3px 5px;
  }
  button:hover {
    background-color: rgba(50, 50, 50, 0.5);
  }
}
</style>
