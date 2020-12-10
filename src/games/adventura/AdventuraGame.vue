<template>
  <div class="adventura-game">
    <audio
      loop="true"
      id="backgroundMusic"
      v-if="inBattle && musicOn"
      :src="currentArea.backgroundMusicSrc"
      type="audio/mp3"
      autoplay
    />
    <audio
      loop="true"
      id="backgroundMusic"
      v-if="
        (currentView === 'Shop' ||
          currentView === 'Map' ||
          currentView === 'Start menu' ||
          currentView === 'Settings' ||
          currentView === 'Instructions') &&
          musicOn
      "
      :src="require('@/assets/sound/adventura-shop.mp3')"
      type="audio/mp3"
      autoplay
    />
    <audio
      v-if="sfxOn"
      :src="require('@/assets/sound/games/adventura/click-sound.mp3')"
      ref="clickSound"
      type="audio/mp3"
    />

    <TopBar
      v-if="inBattle"
      :inBattle="inBattle"
      :currentArea="currentArea"
      :currentEnemy="currentEnemy"
      :enemyName="enemyName"
      :playerName="playerName"
      :getNewEnemy="getNewEnemy"
      :health="health"
      :enemyHealth="enemyHealth"
      :maxEnemyHealth="maxEnemyHealth"
      :mana="mana"
      :enemyMana="enemyMana"
      :enemyWeakness="enemyWeakness"
      :enemyStrength="enemyStrength"
      :coins="coins"
      :visibleCoinAmount="visibleCoinAmount"
      @open-map="
        currentView = 'Map';
        inBattle = false;
        bossToFight = false;
        playerDead = false;
      "
    />
    <BattleArea
      v-if="inBattle"
      :ironSword="ironSword"
      :fireScroll="fireScroll"
      :waterScroll="waterScroll"
      :iceScroll="iceScroll"
      :earthScroll="earthScroll"
      :airScroll="airScroll"
      :lightningScroll="lightningScroll"
      :healScroll="healScroll"
      :bossToFight="bossToFight"
      :bossesDefeated="bossesDefeated"
      :inBattle="inBattle"
      :resetTurn="resetTurn"
      :currentArea="currentArea"
      :health="health"
      :maxHealth="maxHealth"
      :mana="mana"
      :coinsLost="coinsLost"
      :getNewEnemy="getNewEnemy"
      :damageReceived="damageReceived"
      :damageInflicted="damageInflicted"
      :hasHealed="hasHealed"
      :enemyHealth="enemyHealth"
      :playerDead="playerDead"
      :unlockedMoves="unlockedMoves"
      :sfxOn="sfxOn"
      @open-map="
        currentView = 'Map';
        inBattle = false;
        bossToFight = false;
        playerDead = false;
      "
      @current-area="setCurrentArea"
      @new-enemy-gotten="getNewEnemy = false"
      @enemy="setEnemyName"
      @get-mana="getMana"
      @set-enemy-status="setEnemyStatus"
      @enemy-strike="enemyStrike"
      @strike-with-sword="strikeWithSword"
      @blast-fire="blastFire"
      @blast-water="blastWater"
      @blast-ice="blastIce"
      @blast-earth="blastEarth"
      @blast-air="blastAir"
      @blast-lightning="blastLightning"
      @heal="heal"
    />
    <StartMenu
      v-if="currentView === 'Start menu' || currentView === 'Settings' || currentView === 'Instructions'"
      :unlockedAreas="unlockedAreas"
      :currentView="currentView"
      :fullscreenOn="isFullscreen"
      :musicOn="musicOn"
      :sfxOn="sfxOn"
      @change-current-view="changeCurrentView"
      @toggle-fullscreen="$emit('toggle-fullscreen')"
      @toggle-music="musicOn = !musicOn"
      @toggle-sfx="sfxOn = !sfxOn"
    />
    <AreaMap
      v-if="currentView === 'Map'"
      :currentEnemy="currentEnemy"
      :bossesDefeated="bossesDefeated"
      @new-current-area="setCurrentArea"
      @open-shop="currentView = 'Shop'"
      @open-start-menu="currentView = 'Start menu'"
      @boss-area="setBossArea"
    />
    <Shop
      v-if="currentView === 'Shop'"
      :ironSword="ironSword"
      :fireScroll="fireScroll"
      :waterScroll="waterScroll"
      :iceScroll="iceScroll"
      :earthScroll="earthScroll"
      :airScroll="airScroll"
      :lightningScroll="lightningScroll"
      :healScroll="healScroll"
      :unlockedMoves="unlockedMoves"
      :coins="coins"
      :visibleCoinAmount="visibleCoinAmount"
      :maxHealth="maxHealth"
      :maxMana="maxMana"
      @item-bought="buyItem"
      @health-upgraded="maxHealth += 1"
      @mana-upgraded="maxMana += 1"
      @sword-upgraded="upgradeItem(ironSword, 'ironSword')"
      @fire-upgraded="upgradeItem(fireScroll, 'fire')"
      @water-upgraded="upgradeItem(waterScroll, 'water')"
      @ice-upgraded="upgradeItem(iceScroll, 'ice')"
      @earth-upgraded="upgradeItem(earthScroll, 'earth')"
      @air-upgraded="upgradeItem(airScroll, 'air')"
      @lightning-upgraded="upgradeItem(lightningScroll, 'lightning')"
      @heal-upgraded="upgradeItem(healScroll, 'heal')"
      @open-map="currentView = 'Map'"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import StartMenu from './StartMenu.vue';
import TopBar from './TopBar.vue';
import AreaMap from './areaMap.vue';
import BattleArea from './BattleArea.vue';
import Shop from './shop.vue';

//Weapons
import { Melee, IronSword } from './melee';
import {
  Magic,
  FireScroll,
  WaterScroll,
  IceScroll,
  EarthScroll,
  AirScroll,
  LightningScroll,
  HealScroll
} from './magic';

//Areas
import { Area, Grasslands, Desert, Forest, Castle, SnowLands, BlueAbyss, LandOfTheDead } from './area';

//Enemies
import { Enemy } from './enemy';

//Bosses
import { Boss } from './boss';

export default defineComponent({
  name: 'AdventuraGame',

  components: {
    TopBar,
    BattleArea,
    StartMenu,
    AreaMap,
    Shop
  },

  props: {
    isFullscreen: Boolean
  },

  data() {
    // Not themed
    const grasslands = new Grasslands();
    const desert = new Desert();
    const forest = new Forest();
    const castle = new Castle();
    const blueAbyss = new BlueAbyss();
    const snowlands = new SnowLands();

    // Themed
    const landOfTheDead = new LandOfTheDead();
    return {
      allAreas: [grasslands, desert, forest, castle, blueAbyss, snowlands], // Not themed ones

      //Weapons
      ironSword: new IronSword(),
      fireScroll: new FireScroll(),
      waterScroll: new WaterScroll(),
      iceScroll: new IceScroll(),
      earthScroll: new EarthScroll(),
      airScroll: new AirScroll(),
      lightningScroll: new LightningScroll(),
      healScroll: new HealScroll(5),

      //Stats
      maxHealth: 10,
      maxMana: 5,
      health: 10,
      mana: 5,
      maxEnemyHealth: 10,
      enemyHealth: 10,
      enemyMana: 0,
      enemyWeakness: [''],
      enemyStrength: [''],
      coins: 0,
      visibleCoinAmount: '0',
      coinsLost: 0,

      unlockedMoves: ['Iron sword', 'Fire scroll', 'Heal scroll'],
      unlockedAreas: [grasslands],

      playerName: 'Player',
      enemyName: '',

      damageInflicted: '0',
      damageReceived: '0',
      bossesDefeated: [''],
      hasHealed: false,
      playerDead: false,
      enemyDead: false,
      getNewEnemy: false,
      resetTurn: false,
      bossToFight: false,

      // Settings
      musicOn: true,
      sfxOn: true,

      // Component visibility
      currentView: 'Start menu',
      inBattle: false,

      currentArea: {} as Area,
      currentEnemy: {} as Enemy
    };
  },
  methods: {
    changeCurrentView(newView: string) {
      this.currentView = newView;
    },

    upgradeItem(item: any, itemName: string) {
      if (item === this.maxHealth) {
        this.maxHealth++;
        localStorage.setItem('adventura' + itemName, JSON.stringify(this.maxHealth));
      }
      if (item === this.maxMana) {
        this.maxMana++;
        localStorage.setItem('adventura' + itemName, JSON.stringify(this.maxMana));
      }
      if (item === this.healScroll) {
        this.healScroll.heal++;
        localStorage.setItem('adventura' + itemName + 'Amount', item.heal);
      }
      if (item !== this.healScroll) {
        item.minDamage++;
        item.maxDamage++;
        localStorage.setItem('adventura' + itemName + 'MinDamage', item.minDamage);
        localStorage.setItem('adventura' + itemName + 'MaxDamage', item.maxDamage);
      }
    },
    getMana(amount: number) {
      this.mana += amount;
      if (this.mana > this.maxMana) {
        this.mana = this.maxMana;
      }
    },
    buyItem(coinsUsed: number) {
      this.coins -= coinsUsed;
      localStorage.setItem('adventuracoins', JSON.stringify(this.coins));
      const clickSound = this.$refs.clickSound as HTMLAudioElement;
      clickSound.play();
    },
    setEnemyName(enemy: any, name: string) {
      this.enemyName = name;
      this.currentEnemy = enemy;
    },
    setEnemyStatus(enemyHealth: number, enemyMana: number, weakness: string[], strength: string[]) {
      this.enemyHealth = enemyHealth;
      this.enemyMana = enemyMana;
      this.enemyWeakness = weakness;
      this.enemyStrength = strength;
      this.maxEnemyHealth = enemyHealth;
    },
    setCurrentArea(area: Area) {
      this.currentArea = area;
      this.currentView = 'Battle';
      this.inBattle = true;
      this.health = this.maxHealth;
      this.mana = this.maxMana;
      this.setEnemyStatus(
        this.currentEnemy.health,
        this.currentEnemy.mana,
        this.currentEnemy.weakness,
        this.currentEnemy.strength
      );
    },
    setBossArea(area: Area, boss: Boss) {
      this.currentArea = area;
      this.currentView = 'Battle';
      this.inBattle = true;
      this.bossToFight = true;
      this.health = this.maxHealth;
      this.mana = this.maxMana;
      this.setEnemyStatus(boss.health, boss.mana, boss.weakness, boss.strength);
    },
    openMainMenu() {
      this.currentView = 'Battle';
      this.playerDead = false;
      this.inBattle = false;
      this.health = this.maxHealth;
      this.mana = 10;
      this.bossToFight = false;
    },
    saveUpgrades(itemName: string, item: any) {
      item += 1;
      localStorage.setItem('adventura' + itemName, item);
    },
    enemyStrike(amount: any) {
      if (this.enemyDead === false) {
        if (amount > 0) {
          this.health -= amount;
          this.damageReceived = amount.toString();
        } else {
          this.health -= 0;
          this.damageReceived = 'Miss';
        }
      }
    },
    checkWeaknessesAndStrengths(amount: number, manaToConsume: number, weaponElement: string) {
      this.mana -= manaToConsume;
      if (amount > 0) {
        let enemyWeakness = 1;
        let enemyStrength = 0;
        if (this.enemyWeakness.includes(weaponElement)) {
          enemyWeakness = 1.5;
        }
        if (this.enemyStrength.includes(weaponElement)) {
          enemyStrength = 0.5;
        }
        this.enemyHealth -= Math.ceil(amount * (enemyWeakness - enemyStrength));
        this.damageInflicted = Math.ceil(amount * (enemyWeakness - enemyStrength)).toString();
      }
      if (amount === 0) {
        this.enemyHealth -= 0;
        this.damageInflicted = 'Miss';
      }
    },
    strikeWithSword(amount: number) {
      this.checkWeaknessesAndStrengths(amount, 0, 'Melee');
    },
    blastFire(amount: number, manaToConsume: number) {
      if (this.mana - manaToConsume >= 0) {
        this.checkWeaknessesAndStrengths(amount, manaToConsume, 'Fire');
      }
    },
    blastWater(amount: number, manaToConsume: number) {
      if (this.mana - manaToConsume >= 0) {
        this.checkWeaknessesAndStrengths(amount, manaToConsume, 'Water');
      }
    },
    blastIce(amount: number, manaToConsume: number) {
      if (this.mana - manaToConsume >= 0) {
        this.checkWeaknessesAndStrengths(amount, manaToConsume, 'Ice');
      }
    },
    blastEarth(amount: number, manaToConsume: number) {
      if (this.mana - manaToConsume >= 0) {
        this.checkWeaknessesAndStrengths(amount, manaToConsume, 'Earth');
      }
    },
    blastAir(amount: number, manaToConsume: number) {
      if (this.mana - manaToConsume >= 0) {
        this.checkWeaknessesAndStrengths(amount, manaToConsume, 'Air');
      }
    },
    blastLightning(amount: number, manaToConsume: number) {
      if (this.mana - manaToConsume >= 0) {
        this.checkWeaknessesAndStrengths(amount, manaToConsume, 'Lightning');
      }
    },
    heal(amount: number, manaToConsume: number) {
      if (this.mana - manaToConsume >= 0) {
        if (this.health + amount > this.maxHealth) {
          this.health = this.maxHealth;
        }
        this.health += amount;
        this.mana -= manaToConsume;
        this.hasHealed = true;
        setTimeout(() => {
          this.hasHealed = false;
        }, 999);
      }
    }
  },
  watch: {
    coins: function() {
      this.visibleCoinAmount = this.coins.toString();
    },
    visibleCoinAmount: function() {
      if (+this.visibleCoinAmount >= 1000000 && +this.visibleCoinAmount < 1000000000) {
        this.visibleCoinAmount = (Math.round((this.coins / 1000000) * 100) / 100).toString() + ' Million';
      }
      if (+this.visibleCoinAmount >= 1000000000 && +this.visibleCoinAmount < 1000000000000) {
        this.visibleCoinAmount = (Math.round((this.coins / 1000000000) * 100) / 100).toString() + ' Billion';
      }
      if (+this.visibleCoinAmount >= 1000000000000) {
        this.visibleCoinAmount = (Math.round((this.coins / 1000000000000) * 100) / 100).toString() + ' Trillion';
      }
    },
    ironSword: function() {
      localStorage.setItem('adventuraswordMinDmg', JSON.stringify(this.ironSword.minDamage));
      localStorage.setItem('adventuraswordMaxDmg', JSON.stringify(this.ironSword.maxDamage));
    },
    maxHealth: function() {
      localStorage.setItem('adventuramaxHealth', JSON.stringify(this.maxHealth));
    },
    maxMana: function() {
      localStorage.setItem('adventuramaxMana', JSON.stringify(this.maxMana));
    },
    health: function() {
      if (this.health <= 0) {
        this.health = 0;
        this.coinsLost = Math.ceil(this.coins / 4);
        this.coins -= Math.ceil(this.coins / 4);
        localStorage.setItem('adventuracoins', JSON.stringify(this.coins));
        this.playerDead = true;
      }
    },
    mana: function() {
      if (this.mana <= 0) {
        this.mana = 0;
      }
    },
    enemyHealth: function() {
      if (this.enemyHealth <= 0) {
        this.enemyDead = true;
        if (this.bossToFight === false && this.enemyHealth === 0) {
          this.coins += Math.floor(this.currentArea.coinRange);
          localStorage.setItem('adventuracoins', JSON.stringify(this.coins));
        } else if (this.bossToFight && this.enemyHealth === 0) {
          this.coins += this.currentArea.areaBoss.coinsDropped;
          localStorage.setItem('adventuracoins', JSON.stringify(this.coins));
          setTimeout(() => {
            if (!this.bossesDefeated.includes(this.currentArea.areaBoss.name)) {
              this.bossesDefeated.push(this.currentArea.areaBoss.name);
            }
          }, 1);
          if (!this.unlockedMoves.includes(this.currentArea.areaBoss.itemDropped.name)) {
            setTimeout(() => {
              this.unlockedMoves.push(this.currentArea.areaBoss.itemDropped.name);
              localStorage.setItem('adventuraunlockedMoves', JSON.stringify(this.unlockedMoves));
            }, 1);
          }
        }
        this.enemyHealth = 0;
        if (this.enemyHealth === 0 && this.bossToFight === false)
          setTimeout(() => {
            this.getNewEnemy = true;
            this.resetTurn = !this.resetTurn;
          }, 1);
        this.enemyDead = false;
      }
    },
    enemyMana: function() {
      if (this.enemyMana <= 0) {
        this.enemyMana = 0;
      }
    },
    bossesDefeated: function() {
      localStorage.setItem('adventurabossesDefeated', JSON.stringify(this.bossesDefeated));
      for (const area of this.allAreas) {
        if (this.bossesDefeated.includes(area.bossDefeatedToUnlock) && !this.unlockedAreas.includes(area)) {
          this.unlockedAreas.push(area);
        }
      }
    },
    unlockedAreas: function() {
      localStorage.setItem('adventuraunlockedAreas', JSON.stringify(this.unlockedAreas));
    }
  },
  created() {
    if (localStorage.getItem('adventuraironSwordMinDamage')) {
      this.ironSword.minDamage = JSON.parse(localStorage.getItem('adventuraironSwordMinDamage')!);
      this.ironSword.maxDamage = JSON.parse(localStorage.getItem('adventuraironSwordMaxDamage')!);
    }
    if (localStorage.getItem('adventurafireMinDamage')) {
      this.fireScroll.minDamage = JSON.parse(localStorage.getItem('adventurafireMinDamage')!);
      this.fireScroll.maxDamage = JSON.parse(localStorage.getItem('adventurafireMaxDamage')!);
    }
    if (localStorage.getItem('adventurawaterMinDamage')) {
      this.waterScroll.minDamage = JSON.parse(localStorage.getItem('adventurawaterMinDamage')!);
      this.waterScroll.maxDamage = JSON.parse(localStorage.getItem('adventurawaterMaxDamage')!);
    }
    if (localStorage.getItem('adventuraiceMinDamage')) {
      this.iceScroll.minDamage = JSON.parse(localStorage.getItem('adventuraiceMinDamage')!);
      this.iceScroll.maxDamage = JSON.parse(localStorage.getItem('adventuraiceMaxDamage')!);
    }
    if (localStorage.getItem('adventuraearthMinDamage')) {
      this.earthScroll.minDamage = JSON.parse(localStorage.getItem('adventuraearthMinDamage')!);
      this.earthScroll.maxDamage = JSON.parse(localStorage.getItem('adventuraearthMaxDamage')!);
    }
    if (localStorage.getItem('adventuraairMinDamage')) {
      this.airScroll.minDamage = JSON.parse(localStorage.getItem('adventuraairMinDamage')!);
      this.airScroll.maxDamage = JSON.parse(localStorage.getItem('adventuraairMaxDamage')!);
    }
    if (localStorage.getItem('adventuralightningMinDamage')) {
      this.lightningScroll.minDamage = JSON.parse(localStorage.getItem('adventuralightningMinDamage')!);
      this.lightningScroll.maxDamage = JSON.parse(localStorage.getItem('adventuralightningMaxDamage')!);
    }
    if (localStorage.getItem('adventurahealAmount')) {
      this.healScroll.heal = JSON.parse(localStorage.getItem('adventurahealAmount')!);
    }
    if (localStorage.getItem('adventuracoins')) {
      this.coins = JSON.parse(localStorage.getItem('adventuracoins')!);
      this.visibleCoinAmount = this.coins.toString();
    }
    if (localStorage.getItem('adventuraunlockedMoves') !== null) {
      this.unlockedMoves = JSON.parse(localStorage.getItem('adventuraunlockedMoves')!);
    }
    if (localStorage.getItem('adventuraunlockedAreas')) {
      this.unlockedAreas = JSON.parse(localStorage.getItem('adventuraunlockedAreas')!);
    }
    if (localStorage.getItem('adventurabossesDefeated') !== null) {
      this.bossesDefeated = JSON.parse(localStorage.getItem('adventurabossesDefeated')!);
    }
    if (localStorage.getItem('adventuramaxHealth')) {
      this.maxHealth = JSON.parse(localStorage.getItem('adventuramaxHealth')!);
    }
    if (localStorage.getItem('adventuramaxMana')) {
      this.maxMana = JSON.parse(localStorage.getItem('adventuramaxMana')!);
    }
  }
});
</script>

<style lang="scss" scoped>
.adventura-game {
  width: 100%;
  height: 100%;
}
</style>
