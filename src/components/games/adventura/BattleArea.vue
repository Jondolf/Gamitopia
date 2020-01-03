<template>
  <div class="battle-area">
    <audio :src="soundToPlay" ref="soundEffect"></audio>
    <audio
      :src="require('@/assets/sound/games/adventura/thud.mp3')"
      ref="enemySoundEffect"
    ></audio>
    <ChooseMove
      v-if="getItem === false && playerDead === false"
      :ironSword="ironSword"
      :fireScroll="fireScroll"
      :waterScroll="waterScroll"
      :iceScroll="iceScroll"
      :earthScroll="earthScroll"
      :airScroll="airScroll"
      :lightningScroll="lightningScroll"
      :healScroll="healScroll"
      :unlockedMoves="unlockedMoves"
      @strikeWithSword="strikeWithSword"
      @blastFire="blastFire"
      @blastWater="blastWater"
      @blastIce="blastIce"
      @blastEarth="blastEarth"
      @blastAir="blastAir"
      @blastLightning="blastLightning"
      @heal="heal"
    />
    <GetItem
      v-if="
        getItem && unlockedMoves.includes(currentArea.areaBoss.itemDropped.name)
      "
      :currentArea="currentArea"
      :getItem="getItem"
      :itemToUnlock="itemToUnlock"
      @openMap="openMap"
    />
    <DeathScreen v-if="playerDead" :coinsLost="coinsLost" @openMap="openMap" />
    <div ref="animatableBackground" id="animatable-background">
      <div ref="background" id="background"></div>
    </div>
    <div ref="ground" id="ground"></div>
    <div class="player-and-enemy">
      <div class="player">
        <p ref="damageHasBeenReceived" id="damage-received">
          {{ damageReceived }}
        </p>
        <img
          src="@/assets/images/adventura/player-character.png"
          draggable="false"
          alt="Player character"
          id="player-character"
        />
      </div>
      <div class="enemy">
        <div class="damage-container">
          <p ref="damageHasBeenInflicted" id="damage-inflicted">
            {{ damageInflicted }}
          </p>
        </div>
        <img
          :src="enemy.imgSrc"
          ref="enemy"
          draggable="false"
          alt="Enemy"
          id="enemy"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import ChooseMove from '@/components/games/adventura/ChooseMove.vue';
import GetItem from '@/components/games/adventura/getItem.vue';
import DeathScreen from '@/components/games/adventura/deathScreen.vue';
import { Melee } from '@/components/games/adventura/melee';
import { Magic } from '@/components/games/adventura/magic';
import { Grasslands, Desert, Area } from '@/components/games/adventura/area';
import getItemVue from './getItem.vue';
export default Vue.extend({
  name: 'BattleArea',
  components: {
    ChooseMove,
    GetItem,
    DeathScreen
  },
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

    health: Number,
    maxHealth: Number,
    mana: Number,
    unlockedMoves: Array,
    coinsLost: Number,
    playerDead: Boolean,
    getNewEnemy: Boolean,
    resetTurn: Boolean,
    damageReceived: [Number, String],
    damageInflicted: [Number, String],
    hasHealed: Boolean,
    currentArea: Object as () => any,
    inBattle: Boolean,
    bossToFight: Boolean,
    bossesDefeated: Array,
    enemyHealth: Number,
    sfxOn: Boolean
  },
  data() {
    return {
      playerTurn: true,
      enemyTurn: false,
      chanceToMiss: 0.2,
      enemyChanceToMiss: 0.2,
      itemToUnlock: '',
      soundToPlay: require('@/assets/sound/games/adventura/sword.mp3'),
      getItem: false,
      damageHasBeenReceived: false,
      damageHasBeenInflicted: false,
      groundBackgroundImgSrc: this.currentArea.groundImgSrc,
      enemy: this.currentArea.enemiesInArea[
        Math.floor(Math.random() * this.currentArea.enemiesInArea.length)
      ]
    };
  },
  methods: {
    openMap() {
      this.$emit('openMap');
    },
    playSound(sound: string) {
      if (this.sfxOn && sound !== 'enemy') {
        this.soundToPlay = require('@/assets/sound/games/adventura/' +
          sound +
          '.mp3');
        const soundEffectElement = this.$refs.soundEffect as HTMLAudioElement;
        setTimeout(() => {
          soundEffectElement.play();
        }, 1);
      } else if (this.sfxOn && sound === 'enemy') {
        const enemySoundEffect = this.$refs
          .enemySoundEffect as HTMLAudioElement;
        setTimeout(() => {
          enemySoundEffect.play();
        }, 1);
      }
    },
    missAttack(param: string) {
      const random = Math.random();
      if (param === 'player') {
        if (random < this.chanceToMiss) {
          return true;
        }
        return false;
      }
      if (param === 'enemy') {
        if (random < this.enemyChanceToMiss) {
          return true;
        }
        return false;
      }
    },
    changeTurn() {
      setTimeout(() => {
        if (this.playerTurn) {
          this.playerTurn = false;
          this.enemyTurn = true;
        } else if (this.enemyTurn) {
          this.enemyTurn = false;
          this.playerTurn = true;
        }
      }, 1);
    },
    strikeWithSword(amount: number) {
      if (this.playerTurn) {
        if (!this.missAttack('player')) {
          this.$emit('strikeWithSword', amount);
          this.playSound('sword');
        } else {
          this.$emit('strikeWithSword', 0);
        }
        this.changeTurn();
      }
    },
    blastFire(amount: number, manaToConsume: number) {
      if (this.playerTurn && this.mana - manaToConsume >= 0) {
        if (!this.missAttack('player')) {
          this.$emit('blastFire', amount, manaToConsume);
          this.playSound('fire');
        } else {
          this.$emit('blastFire', 0, manaToConsume);
        }
        this.changeTurn();
      }
    },
    blastWater(amount: number, manaToConsume: number) {
      if (this.playerTurn && this.mana - manaToConsume >= 0) {
        if (!this.missAttack('player')) {
          this.$emit('blastWater', amount, manaToConsume);
          this.playSound('water');
        } else {
          this.$emit('blastWater', 0, manaToConsume);
        }
        this.changeTurn();
      }
    },
    blastIce(amount: number, manaToConsume: number) {
      if (this.playerTurn && this.mana - manaToConsume >= 0) {
        if (!this.missAttack('player')) {
          this.$emit('blastIce', amount, manaToConsume);
          this.playSound('ice');
        } else {
          this.$emit('blastIce', 0, manaToConsume);
        }
        this.changeTurn();
      }
    },
    blastEarth(amount: number, manaToConsume: number) {
      if (this.playerTurn && this.mana - manaToConsume >= 0) {
        if (!this.missAttack('player')) {
          this.$emit('blastEarth', amount, manaToConsume);
          this.playSound('earth');
        } else {
          this.$emit('blastEarth', 0, manaToConsume);
        }
        this.changeTurn();
      }
    },
    blastAir(amount: number, manaToConsume: number) {
      if (this.playerTurn && this.mana - manaToConsume >= 0) {
        if (!this.missAttack('player')) {
          this.$emit('blastAir', amount, manaToConsume);
          this.playSound('air');
        } else {
          this.$emit('blastAir', 0, manaToConsume);
        }
        this.changeTurn();
      }
    },
    blastLightning(amount: number, manaToConsume: number) {
      if (this.playerTurn && this.mana - manaToConsume >= 0) {
        if (!this.missAttack('player')) {
          this.$emit('blastLightning', amount, manaToConsume);
          this.playSound('lightning');
        } else {
          this.$emit('blastLightning', 0, manaToConsume);
        }
        this.changeTurn();
      }
    },
    heal(amount: number, manaToConsume: number) {
      if (
        this.playerTurn &&
        this.mana - manaToConsume >= 0 &&
        this.health !== this.maxHealth
      ) {
        this.$emit('heal', amount, manaToConsume);
        this.changeTurn();
        this.playSound('heal');
      }
    },
    enemyStrike(amount: number) {
      setTimeout(() => {
        if (this.enemyTurn && !this.getNewEnemy && !this.getItem) {
          this.changeTurn();
          if (!this.missAttack('enemy')) {
            this.$emit('enemyStrike', amount);
            this.playSound('enemy');
          } else {
            this.$emit('enemyStrike', 0);
          }
        }
      }, 1);
    },
    emitEnemyStatus() {
      this.$emit(
        'setEnemyStatus',
        this.enemy.health,
        this.enemy.mana,
        this.enemy.weakness,
        this.enemy.strength
      );
      this.$emit('enemy', this.enemy, this.enemy.name);
    },
    getEnemy(enemyType: string) {
      const enemyElement = this.$refs.enemy as HTMLElement;
      enemyElement.style.opacity = '0';
      setTimeout(() => {
        this.playerTurn = true;
        this.enemyTurn = false;
        if (enemyType === 'Boss') {
          this.enemy = this.currentArea.areaBoss;
        } else if (enemyType === 'Enemy') {
          this.enemy = this.currentArea.enemiesInArea[
            Math.floor(Math.random() * this.currentArea.enemiesInArea.length)
          ];
        }
        enemyElement.style.opacity = '1';
      }, 1000);
      setTimeout(() => {
        this.emitEnemyStatus();
      }, 1002);
    },
    setBackgroundAndGround() {
      let background = this.$refs.background as HTMLElement;
      let animatableBackground = this.$refs.animatableBackground as HTMLElement;
      let ground = this.$refs.ground as HTMLElement;
      if (this.currentArea.backgroundImgSrc !== null) {
        background.style.backgroundImage =
          'url(' + this.currentArea.backgroundImgSrc + ')';
      }
      if (this.currentArea.animatableBackgroundImgSrc !== null) {
        animatableBackground.style.backgroundImage =
          'url(' + this.currentArea.animatableBackgroundImgSrc + ')';
      }
      ground.style.backgroundImage = 'url(' + this.groundBackgroundImgSrc + ')';

      this.$emit('currentArea', this.currentArea);
    }
  },
  watch: {
    enemy: function() {
      this.$emit('enemy', this.enemy.name);
    },
    enemyHealth: function() {
      if (this.enemyHealth === 0 && this.bossToFight === true) {
        const enemyElement = this.$refs.enemy as HTMLElement;
        enemyElement.style.opacity = '0';
        if (
          !this.unlockedMoves.includes(
            this.currentArea.areaBoss.itemDropped.name
          )
        ) {
          this.getItem = true;
        } else {
          this.getItem = false;
          this.getEnemy('Boss');
        }
        this.itemToUnlock = this.currentArea.areaBoss.itemDropped.name;
      }
    },
    enemyTurn: function() {
      setTimeout(() => {
        if (this.enemyTurn && !this.getNewEnemy) {
          setTimeout(() => this.enemyStrike(this.enemy.damage), 1000);
        }
      }, 1);
    },
    playerTurn: function() {
      if (
        this.playerTurn &&
        this.getNewEnemy === false &&
        this.hasHealed === false
      ) {
        this.$emit('getMana', 1);
        const damageHasBeenReceived = this.$refs
          .damageHasBeenReceived as HTMLElement;
        if (this.enemyHealth !== 0) {
          damageHasBeenReceived.style.opacity = '1';
        }
        setTimeout(() => {
          damageHasBeenReceived.style.opacity = '0';
        }, 999);
      } else if (this.enemyTurn && this.hasHealed === false) {
        const damageHasBeenInflicted = this.$refs
          .damageHasBeenInflicted as HTMLElement;
        damageHasBeenInflicted.style.opacity = '1';
        setTimeout(() => {
          damageHasBeenInflicted.style.opacity = '0';
        }, 999);
      }
    },
    resetTurn: function() {
      setTimeout(() => {
        this.playerTurn = true;
        this.enemyTurn = false;
      }, 1002);
    },
    getNewEnemy: function() {
      if (this.getNewEnemy === true && this.bossToFight === false) {
        this.getEnemy('Enemy');
        this.$emit('newEnemyGotten');
      }
    },
    groundBackgroundImgSrc: function() {
      this.setBackgroundAndGround();
    },
    inBattle: function() {
      setTimeout(() => {
        this.emitEnemyStatus();
      }, 3);
    },
    bossToFight: function() {
      this.enemy = this.currentArea.areaBoss;
      this.playerTurn = true;
      this.enemyTurn = false;
    }
  },
  created() {
    setTimeout(() => {
      this.emitEnemyStatus();
      this.$emit('enemyName', this.enemy.name);
    }, 1);
  },
  mounted() {
    this.setBackgroundAndGround();
    if (this.bossToFight) {
      this.enemy = this.currentArea.areaBoss;
    }
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '@/global.scss';
@keyframes BACKGROUND-MOVE {
  0% {
    background-position-x: 0;
  }
  100% {
    background-position-x: 10000000px;
  }
}
@keyframes CHARACTER-IDLE {
  0% {
    height: 80%;
  }
  50% {
    height: 80.5%;
  }
  100% {
    height: 80%;
  }
}
.battle-area {
  height: 80%;
  display: flex;
  justify-content: center;
  color: black;
  position: relative;
  #background {
    width: 100%;
    height: 100%;
    background-size: auto 150%;
    background-position-y: bottom;
    background-repeat: repeat;
  }
  #animatable-background {
    height: 60%;
    width: 100%;
    background-size: auto 150%;
    background-position-y: bottom;
    background-repeat: repeat;
    animation: BACKGROUND-MOVE 1000000s linear infinite;
  }
  .player-and-enemy {
    animation: CHARACTER-IDLE 4s infinite;
    position: absolute;
    top: 25%;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: space-between;
    padding: 0 25px 0 25px;
    p {
      color: white;
      padding: 5px;
      width: 100px;
      background-color: rgba(0, 0, 0, 0.5);
      margin-bottom: 8px;
      border-radius: 5px;
    }
    .player,
    .enemy {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
    }
    .player {
      max-width: 15%;
      display: flex;
      align-items: center;
    }
    .enemy {
      display: flex;
      align-items: center;
      max-width: 60%;
      position: relative;
      width: 25%;
      min-width: 200px;
      .damage-container {
        max-width: 350px;
        width: auto;
        z-index: 2;
      }
    }
    #player-character {
      display: block;
      max-height: 50%;
      width: auto;
      height: auto;
    }
    #enemy {
      display: block;
      position: absolute;
      right: 0;
      bottom: 40%;
      width: auto;
      max-width: 100%;
      max-height: 60%;
      transition: 0.5s;
    }
    #damage-received,
    #damage-inflicted {
      transition: 0.4s;
      opacity: 0;
    }
  }
  #ground {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 40%;
    background-color: darkolivegreen;
    background-size: auto 100%;
    background-repeat: repeat-x;
  }
}
</style>
