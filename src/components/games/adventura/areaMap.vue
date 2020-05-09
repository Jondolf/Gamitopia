<template>
  <div class="area-map">
    <div class="top-btn-container">
      <button v-on:click="openStartMenu" class="top-btn">
        Back to main menu
      </button>
      <button v-on:click="openShop" class="top-btn">Shop</button>
    </div>

    <div class="area-map-btn-container">
      <div
        v-for="(area, index) in areas"
        :key="index"
        @click="goToArea(area)"
        class="area-map-btn"
      >
        <div
          v-if="
            bossesDefeated.includes(area.bossDefeatedToUnlock) || index === 0
          "
          :style="`background-image: url(${area.groundImgSrc})`"
          class="unlocked-area"
        >
          <span>{{ area.name }}</span>
          <button
            @click="getBoss(area)"
            :style="`background-image: url(${area.areaBoss.imgSrc})`"
            class="fight-boss-btn"
          >
            <span>Fight boss</span>
          </button>
        </div>
        <div
          v-if="!bossesDefeated.includes(area.bossDefeatedToUnlock)"
          class="locked-area"
        >
          <span>?</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {
  Grasslands,
  Desert,
  LandOfTheDead,
  Castle,
  SnowLands,
  Forest,
  BlueAbyss
} from '@/components/games/adventura/area';
import { Enemy } from './enemy';

export default Vue.extend({
  name: 'area-map',
  components: {},
  props: {
    currentEnemy: Object as () => Enemy,
    bossesDefeated: Array
  },
  data() {
    const areas = {
      grasslands: new Grasslands(),
      desert: new Desert(),
      forest: new Forest(),
      castle: new Castle(),
      blueAbyss: new BlueAbyss(),
      snowlands: new SnowLands(),
      landOfTheDead: new LandOfTheDead()
    };
    return {
      currentArea: null,
      areas: areas
    };
  },
  methods: {
    openShop() {
      this.$emit('openShop');
    },
    openStartMenu() {
      this.$emit('openStartMenu');
    },
    goToArea(area: any) {
      if (area === this.areas.grasslands) {
        this.$emit('newCurrentArea', area);
      }
      if (this.bossesDefeated.includes(area.bossDefeatedToUnlock)) {
        this.$emit('newCurrentArea', area);
      }
    },
    getBoss(area: any) {
      if (area === this.areas.grasslands) {
        this.$emit('bossArea', area, area.areaBoss);
      }
      if (this.bossesDefeated.includes(area.bossDefeatedToUnlock)) {
        this.$emit('bossArea', area, area.areaBoss);
      }
    }
  }
});
</script>

<style lang="scss" scoped>
@import '@/global.scss';
.area-map {
  background-color: black;
  position: absolute;
  width: 100%;
  top: 0;
  bottom: 0;
  overflow: auto;
  .top-btn-container {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 3;
    width: 100%;
    height: 40px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.7);
    display: flex;
    .top-btn {
      width: 50%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.7);
      border: none;
      color: white;
      &:hover {
        font-weight: bold;
        font-size: 17px;
      }
    }
  }

  .area-map-btn-container {
    margin-top: 40px;

    .area-map-btn {
      &:hover {
        opacity: 1;
      }

      .unlocked-area {
        background-size: auto 100%;
        background-repeat: repeat-x;
        outline: none;
        border: none;
        border-bottom: 1px solid black;
        width: 100%;
        height: 20vh;
        font-size: 16px;
        color: white;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        position: relative;
        transition: 0.4s;

        span {
          z-index: 2;
          position: absolute;
          padding: 10px;
          border-radius: 5px;
          font-weight: bold;
          background-color: rgba(0, 0, 0, 0.5);
        }

        .fight-boss-btn {
          position: absolute;
          left: 0;
          width: 25%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.25);
          background-size: 50%;
          background-position: center;
          background-repeat: no-repeat;
          span {
            font-size: 14px;
            text-align: center;
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            padding: 5px 0 5px 0;
            border-radius: 0;
            color: white;
            background-color: rgba(0, 0, 0, 0.5);
          }
        }
      }
      .locked-area {
        width: 100%;
        height: 20vh;
        border-top: 1px solid white;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
}
</style>
