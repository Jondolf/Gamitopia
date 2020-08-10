<template>
  <div class="get-item">
    <h3>You got an item!</h3>
    <p>{{ itemToUnlock }}</p>
    <button @click="openMap">Back to map</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Melee, IronSword } from '@/components/games/adventura/melee';
import {
  Magic,
  FireScroll,
  WaterScroll,
  EarthScroll,
  AirScroll,
  LightningScroll,
  HealScroll
} from '@/components/games/adventura/magic';

export default defineComponent({
  name: 'ChooseMove',

  props: {
    getItem: Boolean,
    currentArea: Object,
    itemToUnlock: String
  },

  data() {
    return {
      ironSword: new IronSword(),
      fireScroll: new FireScroll(),
      waterScroll: new WaterScroll(),
      earthScroll: new EarthScroll(),
      airScroll: new AirScroll(),
      lightningScroll: new LightningScroll(),
      healScroll: new HealScroll(6)
    };
  },

  methods: {
    openMap() {
      this.$emit('open-map');
    }
  }
});
</script>

<style lang="scss" scoped>
.get-item {
  background-color: rgba(0, 0, 0, 0.5);
  width: 33%;
  text-align: left;
  border-radius: 5px;
  position: absolute;
  top: 10%;
  z-index: 2;
  overflow: hidden;
  color: white;
  box-shadow: black 3px 3px 10px;
  h3 {
    padding: 10px 10px 0 10px;
  }
  p {
    padding: 5px 10px 2px 10px;
  }
  button {
    background-color: rgba(0, 0, 0, 0);
    color: white;
    outline: none;
    border: none;
    width: 100%;
    transition: 0.3s;
    height: 100%;
    text-align: left;
    padding: 0 10px 2px 10px;
  }
  button:hover {
    background-color: rgba(50, 50, 50, 0.5);
  }
}
</style>
