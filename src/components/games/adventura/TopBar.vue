<template>
  <div class="top-bar">
    <div class="stats">
      <div class="player-stats">
        <p class="name">{{ playerName }}</p>
        <div id="health-bar" class="health-bar">
          <div id="health" ref="health"></div>
          <p>
            <img
              src="@/assets/images/adventura/heart-symbol.png"
              class="health-icon"
            />
            {{ health }}
          </p>
        </div>
        <div id="mana-bar" class="mana-bar">
          <div id="mana" ref="mana"></div>
          <p>
            <img
              src="@/assets/images/adventura/mana-symbol.png"
              class="mana-icon"
            />
            {{ mana }}
          </p>
        </div>
        <div class="coins">
          <p ref="coinText">
            {{ visibleCoinAmount
            }}<img
              src="@/assets/images/adventura/coin.png"
              ref="coin"
              id="coin"
            />
          </p>
        </div>
      </div>
      <div class="middle-container">
        <button @click="openMap">Back to map</button>
        <p>
          <strong>{{ currentArea.name }}</strong>
        </p>
      </div>
      <div class="enemy-stats">
        <p class="name">{{ enemyName }}</p>
        <div id="enemy-health-bar" class="health-bar">
          <div id="enemyHealth" ref="enemyHealth"></div>
          <p>
            <img
              src="@/assets/images/adventura/heart-symbol.png"
              class="health-icon"
            />
            {{ enemyHealth }}
          </p>
        </div>
        <div id="enemy-mana-bar" class="mana-bar">
          <div id="enemyMana" ref="enemyMana"></div>
          <p>
            <img
              src="@/assets/images/adventura/mana-symbol.png"
              class="mana-icon"
            />
            {{ enemyMana }}
          </p>
        </div>
        <div class="weaknesses-and-strengths">
          <div class="weaknesses">
            <p id="weakness">Weaknesses:</p>
            <p
              v-for="(weakness, i) in enemyWeakness"
              v-bind:key="'A' + i"
              class="weakness"
            >
              {{ weakness }}
            </p>
          </div>
          <div class="strengths">
            <p id="strength">Strengths:</p>
            <p
              v-for="(strength, i) in enemyStrength"
              v-bind:key="'B' + i"
              class="strength"
            >
              {{ strength }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Enemy } from './enemy';
import { Area } from './area';

export default defineComponent({
  name: 'TopBar',

  props: {
    playerName: String,
    enemyName: String,
    health: Number,
    enemyHealth: Number,
    maxEnemyHealth: Number,
    mana: Number,
    enemyMana: Number,
    enemyWeakness: Array,
    enemyStrength: Array,
    getNewEnemy: Boolean,
    coins: Number,
    visibleCoinAmount: String,
    currentArea: Object,
    inBattle: Boolean
  },

  data() {
    return {
      maxHealth: 0,
      maxMana: 0,
      maxEnemyMana: 0
    };
  },

  methods: {
    openMap() {
      this.$emit('open-map');
    }
  },

  created() {
    if (this.inBattle) {
      setTimeout(() => {
        this.maxHealth = this.health;
        this.maxMana = this.mana;
        this.maxEnemyMana = this.enemyMana;
        if (this.enemyMana === 0) {
          const enemyManaElement = this.$refs.enemyMana as HTMLElement;
          enemyManaElement.style.width = '0%';
        }
      }, 2);
    }
  },

  watch: {
    coins: function() {
      const coinElement = this.$refs.coin as HTMLElement;
      const coinTextElement = this.$refs.coinText as HTMLElement;
      coinElement.classList.add('coin-animation');
      coinTextElement.classList.add('coin-text-animation');
      setTimeout(() => {
        coinElement.classList.remove('coin-animation');
      }, 1000);
      setTimeout(() => {
        coinTextElement.classList.remove('coin-text-animation');
      }, 1000);
    },
    health: function() {
      const health = this.$refs.health as HTMLElement;
      health.style.width =
        Math.round((this.health / this.maxHealth) * 100).toString() + '%';
    },
    mana: function() {
      const mana = this.$refs.mana as HTMLElement;
      mana.style.width =
        Math.round((this.mana / this.maxMana) * 100).toString() + '%';
    },
    enemyHealth: function() {
      const enemyHealth = this.$refs.enemyHealth as HTMLElement;
      setTimeout(() => {
        enemyHealth.style.width =
          Math.round(
            (this.enemyHealth / this.maxEnemyHealth) * 100
          ).toString() + '%';
      }, 3);
    },
    enemyMana: function() {
      const enemyMana = this.$refs.enemyMana as HTMLElement;
      enemyMana.style.width =
        Math.round((this.enemyMana / this.maxEnemyMana) * 100).toString() + '%';
    },
    getNewEnemy: function() {
      setTimeout(() => {
        this.maxEnemyMana = this.enemyMana;
        if (this.enemyMana === 0) {
          const enemyManaElement = this.$refs.enemyMana as HTMLElement;
          enemyManaElement.style.width = '0%';
        }
      }, 1000);
    }
  }
});
</script>

<style lang="scss" scoped>
@keyframes GET-COIN {
  0% {
    width: 14px;
    height: 14px;
  }
  50% {
    width: 17px;
    height: 17px;
  }
  100% {
    width: 14px;
    height: 14px;
  }
}
@keyframes GET-COIN-TEXT {
  0% {
    font-size: 14px;
  }
  50% {
    font-size: 17px;
  }
  100% {
    font-size: 14px;
  }
}
.top-bar {
  border-bottom: 2px solid black;
  height: 20%;
  background-color: blanchedalmond;
  padding: 2px 10px;
  color: black;
  flex-direction: column;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  .coins p {
    color: black;
    font-size: 14px;
    text-align: left;
    display: flex;
    flex-direction: row;
    align-items: center;
    #coin {
      margin-left: 10px;
      width: 14px;
      height: 14px;
    }
  }
  .coin-animation {
    animation: GET-COIN 1s;
  }
  .coin-text-animation {
    animation: GET-COIN-TEXT 1s;
  }
  .middle-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    button {
      position: absolute;
      top: 0;
      border: none;
      background-color: rgba(222, 184, 135, 0.7);
      padding: 6px;
      border-bottom-left-radius: 5px;
      border-bottom-right-radius: 5px;
      transition: 0.4s;
    }
    button:hover {
      font-weight: bold;
      background-color: rgba(222, 184, 135, 1);
    }
  }
  .name {
    color: black;
    font-weight: bold;
  }
  .weaknesses-and-strengths {
    display: flex;
    flex-direction: column;
    color: black;
    .weaknesses,
    .strengths {
      display: flex;
      flex-direction: row;
      font-weight: bold;
      font-size: 10px;
    }
    #weakness,
    #strength {
      font-weight: bold;
      margin-right: 6px;
    }
    .weakness {
      color: purple;
      margin-right: 4px;
    }
    .strength {
      color: darkred;
      margin-right: 5px;
    }
  }
}

.stats {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.player-stats,
.enemy-stats {
  width: 30%;
  font-size: 12px;
  color: white;
}

.health-bar,
.mana-bar {
  height: 15px;
  margin: 3px;
  text-align: left;
  border: 1px solid black;
  border-radius: 10px;
  overflow: hidden;
  position: relative;
  background-color: black;
  .health-icon,
  .mana-icon {
    height: 100%;
    margin-right: 10px;
  }
  p {
    display: flex;
    align-items: center;
    height: 100%;
    position: absolute;
  }
  #health,
  #enemyHealth {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: red;
    transition: 1s;
  }

  #mana,
  #enemyMana {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgb(50, 50, 255);
    transition: 1s;
  }
}
</style>
