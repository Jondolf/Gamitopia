<template>
  <div class="shop">
    <button @click="openMap" class="open-map">Area Map</button>
    <div class="shop-container">
      <div class="stats">
        <h2 class="header">Shop</h2>
        <p class="health">
          <img src="@/assets/images/adventura/heart-symbol.png" />Max health:
          {{ maxHealth }}
        </p>
        <p class="mana">
          <img src="@/assets/images/adventura/mana-symbol.png" /> Mana:
          {{ maxMana }}
        </p>
        <p class="coins">
          <img src="@/assets/images/adventura/coin.png" />Coins:
          {{ visibleCoinAmount }}
        </p>
      </div>
      <div class="buyItemBtnContainer">
        <button @click="buyItem('health')">
          <p>Max health +1</p>
          <p>Cost: {{ newHealthUpgradeCost }}</p>
          <p></p>
          <p>Lvl: {{ healthLevel }}</p>
        </button>
        <button @click="buyItem('mana')">
          <p>Max mana +1</p>
          <p>Cost: {{ newManaUpgradeCost }}</p>
          <p></p>
          <p>Lvl: {{ manaLevel }}</p>
        </button>
        <button @click="buyItem('sword')">
          <p>Iron sword +1</p>
          <p>Cost: {{ newSwordUpgradeCost }}</p>
          <p>Dmg: {{ ironSword.minDamage }}-{{ ironSword.maxDamage }}</p>
          <p>Lvl: {{ swordLevel }}</p>
        </button>
        <button @click="buyItem('heal')">
          <p>Heal +1</p>
          <p>Cost: {{ newHealUpgradeCost }}</p>
          <p>Heal: {{ healScroll.heal }}</p>
          <p>Lvl: {{ healLevel }}</p>
        </button>
        <button @click="buyItem('fire')">
          <p>Fire +1</p>
          <p>Cost: {{ newFireUpgradeCost }}</p>
          <p>Dmg: {{ fireScroll.minDamage }}-{{ fireScroll.maxDamage }}</p>
          <p>Lvl: {{ fireLevel }}</p>
        </button>
        <button
          v-if="unlockedMoves.includes('Water scroll')"
          @click="buyItem('water')"
        >
          <p>Water +1</p>
          <p>Cost: {{ newWaterUpgradeCost }}</p>
          <p>Dmg: {{ waterScroll.minDamage }}-{{ waterScroll.maxDamage }}</p>
          <p>Lvl: {{ waterLevel }}</p>
        </button>

        <button
          v-if="!unlockedMoves.includes('Water scroll')"
          class="locked-move"
        >
          <p>?</p>
        </button>
        <button
          v-if="unlockedMoves.includes('Ice scroll')"
          @click="buyItem('ice')"
        >
          <p>Ice +1</p>
          <p>Cost: {{ newIceUpgradeCost }}</p>
          <p>Dmg: {{ iceScroll.minDamage }}-{{ iceScroll.maxDamage }}</p>
          <p>Lvl: {{ iceLevel }}</p>
        </button>
        <button
          v-if="!unlockedMoves.includes('Ice scroll')"
          class="locked-move"
        >
          <p>?</p>
        </button>

        <button
          v-if="unlockedMoves.includes('Earth scroll')"
          @click="buyItem('earth')"
        >
          <p>Earth +1</p>
          <p>Cost: {{ newEarthUpgradeCost }}</p>
          <p>Dmg: {{ earthScroll.minDamage }}-{{ earthScroll.maxDamage }}</p>
          <p>Lvl: {{ earthLevel }}</p>
        </button>
        <button
          v-if="!unlockedMoves.includes('Earth scroll')"
          class="locked-move"
        >
          <p>?</p>
        </button>

        <button
          v-if="unlockedMoves.includes('Air scroll')"
          @click="buyItem('air')"
        >
          <p>Air +1</p>
          <p>Cost: {{ newAirUpgradeCost }}</p>
          <p>Dmg: {{ airScroll.minDamage }}-{{ airScroll.maxDamage }}</p>
          <p>Lvl: {{ airLevel }}</p>
        </button>
        <button
          v-if="!unlockedMoves.includes('Air scroll')"
          class="locked-move"
        >
          <p>?</p>
        </button>

        <button
          v-if="unlockedMoves.includes('Lightning scroll')"
          @click="buyItem('lightning')"
        >
          <p>Lightning +1</p>
          <p>Cost: {{ newLightningUpgradeCost }}</p>
          <p>
            Dmg: {{ lightningScroll.minDamage }}-{{ lightningScroll.maxDamage }}
          </p>
          <p>Lvl: {{ lightningLevel }}</p>
        </button>
        <button
          v-if="!unlockedMoves.includes('Lightning scroll')"
          class="locked-move"
        >
          <p>?</p>
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Melee } from './melee';
import { Magic } from './magic';

export default defineComponent({
  name: 'Shop',

  props: {
    //Weapons
    ironSword: Object as () => Melee,
    fireScroll: Object as () => Magic,
    waterScroll: Object as () => Magic,
    iceScroll: Object as () => Magic,
    earthScroll: Object as () => Magic,
    airScroll: Object as () => Magic,
    lightningScroll: Object as () => Magic,
    healScroll: Object as () => Magic,

    //Stats
    maxHealth: Number,
    maxMana: Number,
    coins: Number,
    visibleCoinAmount: String,
    unlockedMoves: Array
  },

  data() {
    return {
      healthLevel: 1,
      manaLevel: 1,
      swordLevel: 1,
      fireLevel: 1,
      waterLevel: 1,
      iceLevel: 1,
      earthLevel: 1,
      airLevel: 1,
      lightningLevel: 1,
      healLevel: 1,

      newHealthUpgradeCost: 10,
      newManaUpgradeCost: 50,
      newSwordUpgradeCost: 10,
      newFireUpgradeCost: 10,
      newWaterUpgradeCost: 10,
      newIceUpgradeCost: 10,
      newEarthUpgradeCost: 10,
      newAirUpgradeCost: 10,
      newLightningUpgradeCost: 10,
      newHealUpgradeCost: 30
    };
  },

  methods: {
    openMap() {
      this.$emit('open-map');
    },
    saveToLocalStorage(
      item: string,
      itemLevel: number,
      costName: string,
      cost: number
    ) {
      localStorage.setItem('adventura' + item, JSON.stringify(itemLevel));
      localStorage.setItem('adventura' + costName, JSON.stringify(cost));
    },
    getFromLocalStorage(itemName: string) {
      if (localStorage.getItem('adventura' + itemName)) {
        return JSON.parse(localStorage.getItem('adventura' + itemName)!);
      } else {
        return 1;
      }
    },
    getCostFromLocalStorage(itemName: string, defaultCost: number) {
      if (localStorage.getItem('adventura' + itemName)) {
        return JSON.parse(localStorage.getItem('adventura' + itemName)!);
      } else {
        return defaultCost;
      }
    },
    buyItem(item: string | object) {
      switch (item) {
        case 'health':
          if (this.coins >= this.newHealthUpgradeCost) {
            this.$emit('item-bought', this.newHealthUpgradeCost);
            this.$emit('health-upgraded');
            this.newHealthUpgradeCost = Math.round(
              this.newHealthUpgradeCost * Math.pow(1.05, this.healthLevel)
            );
            this.healthLevel++;
            this.saveToLocalStorage(
              'healthLevel',
              this.healthLevel,
              'healthUpgradeCost',
              this.newHealthUpgradeCost
            );
          }
          break;

        case 'mana':
          if (this.coins >= this.newManaUpgradeCost) {
            this.$emit('item-bought', this.newManaUpgradeCost);
            this.$emit('mana-upgraded');
            this.newManaUpgradeCost = Math.round(
              this.newManaUpgradeCost * Math.pow(1.05, this.manaLevel)
            );
            this.manaLevel++;
            this.saveToLocalStorage(
              'manaLevel',
              this.manaLevel,
              'manaUpgradeCost',
              this.newManaUpgradeCost
            );
          }
          break;
        case 'sword':
          if (this.coins >= this.newSwordUpgradeCost) {
            this.$emit('item-bought', this.newSwordUpgradeCost);
            this.$emit('sword-upgraded');
            this.newSwordUpgradeCost = Math.round(
              this.newSwordUpgradeCost * Math.pow(1.05, this.swordLevel)
            );
            this.swordLevel++;
            this.saveToLocalStorage(
              'swordLevel',
              this.swordLevel,
              'swordUpgradeCost',
              this.newSwordUpgradeCost
            );
          }
          break;
        case 'fire':
          if (this.coins >= this.newFireUpgradeCost) {
            this.$emit('item-bought', this.newFireUpgradeCost);
            this.$emit('fire-upgraded');
            this.newFireUpgradeCost = Math.round(
              this.newFireUpgradeCost * Math.pow(1.05, this.fireLevel)
            );
            this.fireLevel++;
            this.saveToLocalStorage(
              'fireLevel',
              this.fireLevel,
              'fireUpgradeCost',
              this.newFireUpgradeCost
            );
          }
          break;
        case 'water':
          if (this.coins >= this.newWaterUpgradeCost) {
            this.$emit('item-bought', this.newWaterUpgradeCost);
            this.$emit('water-upgraded');
            this.newWaterUpgradeCost = Math.round(
              this.newWaterUpgradeCost * Math.pow(1.05, this.waterLevel)
            );
            this.waterLevel++;
            this.saveToLocalStorage(
              'waterLevel',
              this.waterLevel,
              'waterUpgradeCost',
              this.newWaterUpgradeCost
            );
          }
          break;
        case 'ice':
          if (this.coins >= this.newIceUpgradeCost) {
            this.$emit('item-bought', this.newIceUpgradeCost);
            this.$emit('ice-upgraded');
            this.newIceUpgradeCost = Math.round(
              this.newIceUpgradeCost * Math.pow(1.05, this.iceLevel)
            );
            this.iceLevel++;
            this.saveToLocalStorage(
              'iceLevel',
              this.iceLevel,
              'iceUpgradeCost',
              this.newIceUpgradeCost
            );
          }
          break;
        case 'earth':
          if (this.coins >= this.newEarthUpgradeCost) {
            this.$emit('item-bought', this.newEarthUpgradeCost);
            this.$emit('earth-upgraded');
            this.newEarthUpgradeCost = Math.round(
              this.newEarthUpgradeCost * Math.pow(1.05, this.earthLevel)
            );
            this.earthLevel++;
            this.saveToLocalStorage(
              'earthLevel',
              this.earthLevel,
              'earthUpgradeCost',
              this.newEarthUpgradeCost
            );
          }
          break;
        case 'air':
          if (this.coins >= this.newAirUpgradeCost) {
            this.$emit('item-bought', this.newAirUpgradeCost);
            this.$emit('air-upgraded');
            this.newAirUpgradeCost = Math.round(
              this.newAirUpgradeCost * Math.pow(1.05, this.airLevel)
            );
            this.airLevel++;
            this.saveToLocalStorage(
              'airLevel',
              this.airLevel,
              'airUpgradeCost',
              this.newAirUpgradeCost
            );
          }
          break;
        case 'lightning':
          if (this.coins >= this.newLightningUpgradeCost) {
            this.$emit('item-bought', this.newLightningUpgradeCost);
            this.$emit('lightning-upgraded');
            this.newLightningUpgradeCost = Math.round(
              this.newLightningUpgradeCost * Math.pow(1.05, this.lightningLevel)
            );
            this.lightningLevel++;
            this.saveToLocalStorage(
              'lightningLevel',
              this.lightningLevel,
              'lightningUpgradeCost',
              this.newLightningUpgradeCost
            );
          }
          break;
        case 'heal':
          if (this.coins >= this.newHealUpgradeCost) {
            this.$emit('item-bought', this.newHealUpgradeCost);
            this.$emit('heal-upgraded');
            this.newHealUpgradeCost = Math.round(
              this.newHealUpgradeCost * Math.pow(1.05, this.healLevel)
            );
            this.healLevel++;
            this.saveToLocalStorage(
              'healLevel',
              this.healLevel,
              'healUpgradeCost',
              this.newHealUpgradeCost
            );
          }
          break;
        default:
          break;
      }
    }
  },
  created() {
    this.healthLevel = this.getFromLocalStorage('healthLevel');
    this.manaLevel = this.getFromLocalStorage('manaLevel');
    this.swordLevel = this.getFromLocalStorage('swordLevel');
    this.fireLevel = this.getFromLocalStorage('fireLevel');
    this.waterLevel = this.getFromLocalStorage('waterLevel');
    this.iceLevel = this.getFromLocalStorage('iceLevel');
    this.earthLevel = this.getFromLocalStorage('earthLevel');
    this.airLevel = this.getFromLocalStorage('airLevel');
    this.lightningLevel = this.getFromLocalStorage('lightningLevel');
    this.healLevel = this.getFromLocalStorage('healLevel');

    this.newHealthUpgradeCost = this.getCostFromLocalStorage(
      'healthUpgradeCost',
      this.newHealthUpgradeCost
    );
    this.newManaUpgradeCost = this.getCostFromLocalStorage(
      'manaUpgradeCost',
      this.newManaUpgradeCost
    );
    this.newSwordUpgradeCost = this.getCostFromLocalStorage(
      'swordUpgradeCost',
      this.newSwordUpgradeCost
    );
    this.newFireUpgradeCost = this.getCostFromLocalStorage(
      'fireUpgradeCost',
      this.newFireUpgradeCost
    );
    this.newWaterUpgradeCost = this.getCostFromLocalStorage(
      'waterUpgradeCost',
      this.newWaterUpgradeCost
    );
    this.newIceUpgradeCost = this.getCostFromLocalStorage(
      'iceUpgradeCost',
      this.newIceUpgradeCost
    );
    this.newEarthUpgradeCost = this.getCostFromLocalStorage(
      'earthUpgradeCost',
      this.newEarthUpgradeCost
    );
    this.newAirUpgradeCost = this.getCostFromLocalStorage(
      'airUpgradeCost',
      this.newAirUpgradeCost
    );
    this.newLightningUpgradeCost = this.getCostFromLocalStorage(
      'lightningUpgradeCost',
      this.newLightningUpgradeCost
    );
    this.newHealUpgradeCost = this.getCostFromLocalStorage(
      'healUpgradeCost',
      this.newHealUpgradeCost
    );
  }
});
</script>

<style lang="scss" scoped>
.shop {
  background-color: rgb(0, 0, 0);
  height: 100%;
  overflow: auto;
  .shop-container {
    display: flex;
    position: absolute;
    width: 100%;
    top: 0;
    bottom: 0;
    margin-top: 40px;
  }
  .open-map {
    height: 40px;
    background-color: rgba(0, 0, 0, 0.6);
    border: none;
    color: white;
    border-bottom: 1px solid rgba(255, 255, 255, 0.6);
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    transition: 0.4s;
    font-size: 16px;
  }
  .open-map:hover {
    font-weight: bold;
    font-size: 17px;
  }
  .header {
    text-align: left;
  }
  .stats {
    width: 40%;
    font-size: 30px;
    text-align: left;
    color: white;
    .health,
    .mana,
    .coins {
      display: flex;
      align-items: center;
      margin: 10px;
      img {
        width: 30px;
        height: 30px;
        margin-right: 5px;
      }
    }
  }
  .buyItemBtnContainer {
    width: 60%;
    height: 100%;
    border-left: 1px solid white;
    margin: auto;
    position: relative;
    button {
      width: 100%;
      height: 10%;
      padding: 12px;
      border: none;
      border-bottom: 1px solid white;
      background-color: rgba(0, 0, 0, 0.6);
      display: flex;
      align-items: center;
      color: white;
      transition: 0.4s;
      p {
        display: flex;
        flex: 1 1 0;
        text-align: left;
        font-size: 12px;
      }
    }
    button:hover {
      font-size: 14px;
      background-color: rgba(255, 255, 255, 0.2);
    }
    .locked-move {
      width: 100%;
      height: 10%;
      padding: 12px;
      border: none;
      border-bottom: 1px solid white;
      background-color: rgba(0, 0, 0, 0.8);
      display: flex;
      justify-content: space-between;
      color: white;
      p {
        display: flex;
        text-align: left;
      }
    }
  }
  @media only screen and (max-width: 950px) {
    .shop-container {
      flex-direction: column;
      overflow: auto;
    }
    .buyItemBtnContainer {
      width: 100%;
      border: none;
      border-top: 1px solid white;
    }
    .stats {
      width: 100%;
    }
  }
}
</style>
