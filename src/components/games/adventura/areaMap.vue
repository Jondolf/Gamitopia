<template>
  <div class="area-map">
    <div class="top-btn-container">
      <button v-on:click="openStartMenu" class="top-btn">
        Back to main menu
      </button>
      <button v-on:click="openShop" class="top-btn">Shop</button>
    </div>
    <button v-on:click="goToArea(grasslands)" id="first-area">
      <img :src="grasslands.groundImgSrc" class="btn-background-img" />
      <p>The Grasslands</p>
      <button v-on:click="getBoss(grasslands)" class="fightBossBtn">
        <p>Fight Boss</p>
        <img :src="grasslands.areaBoss.imgSrc" />
      </button>
    </button>
    <button v-on:click="goToArea(desert)">
      <div
        class="unlocked-area"
        v-if="bossesDefeated.includes(desert.bossDefeatedToUnlock)"
      >
        <img :src="desert.groundImgSrc" class="btn-background-img" />
        <p>The Desert</p>
        <button v-on:click="getBoss(desert)" class="fightBossBtn">
          <p>Fight Boss</p>
          <img :src="desert.areaBoss.imgSrc" />
        </button>
      </div>
      <div
        class="locked-area"
        v-if="bossesDefeated.includes(desert.bossDefeatedToUnlock) !== true"
      >
        <h1>?</h1>
      </div>
    </button>
    <button v-on:click="goToArea(castle)">
      <div
        class="unlocked-area"
        v-if="bossesDefeated.includes(castle.bossDefeatedToUnlock)"
      >
        <img :src="castle.groundImgSrc" class="btn-background-img" />
        <p>The Castle</p>
        <button v-on:click="getBoss(castle)" class="fightBossBtn">
          <p>Fight Boss</p>
          <img :src="castle.areaBoss.imgSrc" />
        </button>
      </div>
      <div
        class="locked-area"
        v-if="bossesDefeated.includes(castle.bossDefeatedToUnlock) !== true"
      >
        <h1>?</h1>
      </div>
    </button>
    <button v-on:click="goToArea(snowlands)">
      <div
        class="unlocked-area"
        v-if="bossesDefeated.includes(snowlands.bossDefeatedToUnlock)"
      >
        <img :src="snowlands.groundImgSrc" class="btn-background-img" />
        <p>The Snowlands</p>
        <button v-on:click="getBoss(snowlands)" class="fightBossBtn">
          <p>Fight Boss</p>
          <img :src="snowlands.areaBoss.imgSrc" />
        </button>
      </div>
      <div
        class="locked-area"
        v-if="bossesDefeated.includes(snowlands.bossDefeatedToUnlock) !== true"
      >
        <h1>?</h1>
      </div>
    </button>
    <!--
    <button v-on:click="goToArea(blueAbyss)">
      <div
        class="unlocked-area"
        v-if="bossesDefeated.includes(blueAbyss.bossDefeatedToUnlock)"
      >
        <img :src="blueAbyss.groundImgSrc" class="btn-background-img" />
        <p>The Blue Abyss</p>
        <button v-on:click="getBoss(blueAbyss)" class="fightBossBtn">
          <p>Fight Boss</p>
          <img :src="blueAbyss.areaBoss.imgSrc" />
        </button>
      </div>
      <div
        class="locked-area"
        v-if="bossesDefeated.includes(blueAbyss.bossDefeatedToUnlock) !== true"
      >
        <h1>?</h1>
      </div>
    </button>
    <button v-on:click="goToArea(landOfTheDead)">
      <img :src="landOfTheDead.groundImgSrc" class="btn-background-img" />
      <p>The Land of The Dead</p>
      <button v-on:click="getBoss(landOfTheDead)" class="fightBossBtn">
        <p>Fight Boss</p>
        <img :src="landOfTheDead.areaBoss.imgSrc" />
      </button>
    </button>
    -->
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
    return {
      grasslands: new Grasslands(),
      desert: new Desert(),
      forest: new Forest(),
      castle: new Castle(),
      blueAbyss: new BlueAbyss(),
      snowlands: new SnowLands(),
      landOfTheDead: new LandOfTheDead(),
      currentArea: null
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
      if (area === this.grasslands) {
        this.$emit('newCurrentArea', area);
      }
      if (this.bossesDefeated.includes(area.bossDefeatedToUnlock)) {
        this.$emit('newCurrentArea', area);
      }
    },
    getBoss(area: any) {
      if (area === this.grasslands) {
        this.$emit('bossArea', area, area.areaBoss);
      }
      if (this.bossesDefeated.includes(area.bossDefeatedToUnlock)) {
        this.$emit('bossArea', area, area.areaBoss);
      }
    }
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '@/global.scss';
.area-map {
  background-color: rgb(0, 0, 0);
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
    }
    .top-btn:hover {
      font-weight: bold;
      font-size: 17px;
    }
  }
  #first-area {
    margin-top: 40px;
  }
  button,
  .unlocked-area {
    outline: none;
    border: none;
    border-bottom: 1px solid black;
    width: 100%;
    height: 150px;
    font-size: 16px;
    background-color: rgb(0, 0, 0);
    color: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    opacity: 0.9;
    position: relative;
    transition: 0.4s;
    .locked-area {
      width: 100%;
      height: 100%;
      position: absolute;
      border-top: 1px solid white;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .btn-background-img {
      height: 100%;
      width: 100%;
    }
    p {
      z-index: 2;
      position: absolute;
      padding: 10px;
      border-radius: 5px;
      font-weight: bold;
      background-color: rgba(0, 0, 0, 0.5);
    }
    .fightBossBtn {
      position: absolute;
      left: 0;
      width: 25%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.25);
      p {
        font-size: 14px;
        position: absolute;
        top: 0;
        width: 100%;
        padding: 5px 0 5px 0;
        border-radius: 0;
        background-color: rgba(0, 0, 0, 0.5);
      }
      img {
        width: 80%;
        max-height: 90%;
      }
    }
  }
  button:hover {
    opacity: 1;
  }
}
</style>
