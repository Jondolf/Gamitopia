<template>
  <div class="area-map">
    <div class="top-btn-container">
      <button @click="openStartMenu" class="top-btn">
        Back to main menu
      </button>
      <button @click="openShop" class="top-btn">Shop</button>
    </div>

    <div class="area-map-btn-container">
      <div v-for="(area, index) in areas" :key="index" @click="goToArea(area)" class="area-map-btn">
        <div
          v-if="bossesDefeated.includes(area.bossDefeatedToUnlock) || +index === 0"
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
        <div v-if="!bossesDefeated.includes(area.bossDefeatedToUnlock)" class="locked-area">
          <span>?</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Grasslands, Desert, LandOfTheDead, Castle, SnowLands, Forest, BlueAbyss, Area } from './area';
import { Enemy } from './enemy';

export default defineComponent({
  name: 'area-map',
  components: {},
  props: {
    currentEnemy: Object as () => Enemy,
    bossesDefeated: { type: Array, required: true }
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
      this.$emit('open-shop');
    },
    openStartMenu() {
      this.$emit('open-start-menu');
    },
    goToArea(area: Area) {
      if (area === this.areas.grasslands) {
        this.$emit('new-current-area', area);
      }
      if (this.bossesDefeated.includes(area.bossDefeatedToUnlock)) {
        this.$emit('new-current-area', area);
      }
    },
    getBoss(area: Area) {
      if (area === this.areas.grasslands) {
        this.$emit('boss-area', area, area.areaBoss);
      }
      if (this.bossesDefeated.includes(area.bossDefeatedToUnlock)) {
        this.$emit('boss-area', area, area.areaBoss);
      }
    }
  }
});
</script>

<style lang="scss" scoped>
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
          border-radius: var(--border-radius);
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
