<template>
  <div class="choose-move">
    <button
      v-if="unlockedMoves.includes('Iron sword')"
      v-on:click="strikeWithSword(ironSword.damage)"
    >
      Strike with sword 0MP
    </button>
    <button
      v-if="unlockedMoves.includes('Heal scroll')"
      v-on:click="heal(healScroll.heal, healScroll.manaToConsume)"
    >
      Heal {{ healScroll.manaToConsume }}MP
    </button>
    <button
      v-if="unlockedMoves.includes('Fire scroll')"
      v-on:click="blastFire(fireScroll.damage, fireScroll.manaToConsume)"
    >
      Blast fire {{ fireScroll.manaToConsume }}MP
    </button>
    <button
      v-if="unlockedMoves.includes('Water scroll')"
      v-on:click="blastWater(waterScroll.damage, waterScroll.manaToConsume)"
    >
      Blast water {{ waterScroll.manaToConsume }}MP
    </button>
    <button
      v-if="unlockedMoves.includes('Ice scroll')"
      v-on:click="blastIce(iceScroll.damage, iceScroll.manaToConsume)"
    >
      Blast ice {{ iceScroll.manaToConsume }}MP
    </button>
    <button
      v-if="unlockedMoves.includes('Earth scroll')"
      v-on:click="blastEarth(earthScroll.damage, earthScroll.manaToConsume)"
    >
      Blast earth {{ earthScroll.manaToConsume }}MP
    </button>
    <button
      v-if="unlockedMoves.includes('Air scroll')"
      v-on:click="blastAir(airScroll.damage, airScroll.manaToConsume)"
    >
      Blast air {{ airScroll.manaToConsume }}MP
    </button>
    <button
      v-if="unlockedMoves.includes('Lightning scroll')"
      v-on:click="
        blastLightning(lightningScroll.damage, lightningScroll.manaToConsume)
      "
    >
      Blast lightning {{ lightningScroll.manaToConsume }}MP
    </button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Melee } from '@/components/games/adventura/melee';
import { Magic } from '@/components/games/adventura/magic';
export default Vue.extend({
  name: 'Choose-Move',
  components: {},
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
  data() {
    return {};
  },
  methods: {
    strikeWithSword(amount: number) {
      this.$emit('strikeWithSword', amount);
    },
    blastFire(amount: number, manaToConsume: number) {
      this.$emit('blastFire', amount, manaToConsume);
    },
    blastWater(amount: number, manaToConsume: number) {
      this.$emit('blastWater', amount, manaToConsume);
    },
    blastIce(amount: number, manaToConsume: number) {
      this.$emit('blastIce', amount, manaToConsume);
    },
    blastEarth(amount: number, manaToConsume: number) {
      this.$emit('blastEarth', amount, manaToConsume);
    },
    blastAir(amount: number, manaToConsume: number) {
      this.$emit('blastAir', amount, manaToConsume);
    },
    blastLightning(amount: number, manaToConsume: number) {
      this.$emit('blastLightning', amount, manaToConsume);
    },
    heal(amount: number, manaToConsume: number) {
      this.$emit('heal', amount, manaToConsume);
    }
  },
  watch: {}
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '@/global.scss';
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
