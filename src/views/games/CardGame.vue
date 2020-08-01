<template>
  <div class="card-game">
    <h2>Card game</h2>
    <h2>!Not Officially Released, Isn't Finished!</h2>
    <div class="game-container" ref="gameContainer">
      <button
        @click="isFullscreen = !isFullscreen"
        class="toggle-fullscreen-btn"
      >
        <i class="material-icons">fullscreen</i>
      </button>
      <GameBoard :playerHand="playerHand" :enemyHand="enemyHand" />
    </div>

    <div class="description">
      <div class="mainDescription">
        <h3>Description</h3>
        <p>
          Card game is an ambituos indie game with over 30 cards to put into
          your deck and fight with. You can play against a computer.
        </p>
      </div>
      <div class="otherDescription">
        <div class="madeWith">
          <h3>Made with:</h3>
          <ul>
            <li>HTML</li>
            <li>SCSS</li>
            <li>TypeScript</li>
          </ul>
        </div>
        <div class="otherInfo">
          <h3>Other Info</h3>
          <p>Dark mode support: no</p>
          <br />
          <p>Fullscreen support: yes</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import GameBoard from '@/components/games/card-game/GameBoard.vue';

export default Vue.extend({
  name: 'CardGame',

  components: {
    GameBoard
  },

  data() {
    return {
      isFullscreen: false,

      playerHand: [
        {
          name: 'Wulfric',
          rarity: 'Rare',
          imgSrc: require('@/assets/images/card-game/evil_ping.png'),
          animatableImgSrc: require('@/assets/images/card-game/evil_ping_animatable.png'),
          maxHealth: 3,
          currentHealth: 3,
          power: 4,
          specialMove: {
            move: /* this.dealDmg(2)*/ 'Blah', //! DOESN'T WORK, FIND OUT WHY
            description: 'Deal 2 damage to any enemy'
          },
          description: 'The biggest baddest warrior in town'
        },
        {
          name: 'Awelad',
          rarity: 'Epic',
          imgSrc: require('@/assets/images/card-game/evil_ping.png'),
          animatableImgSrc: require('@/assets/images/card-game/evil_ping_animatable.png'),
          maxHealth: 2,
          currentHealth: 2,
          power: 6,
          specialMove: {
            move: /* this.dealDmg(2)*/ 'Blah', //! DOESN'T WORK, FIND OUT WHY
            description: 'Deal 2 damage to any enemy'
          },
          description: 'The biggest baddest warrior in town'
        },
        {
          name: 'Angry Boar',
          rarity: 'Common',
          imgSrc: require('@/assets/images/card-game/angry_boar.png'),
          animatableImgSrc: require('@/assets/images/card-game/angry_boar_animatable.png'),
          maxHealth: 4,
          currentHealth: 4,
          power: 2,
          specialMove: {
            move: /* this.dealDmg(2)*/ 'Blah', //! DOESN'T WORK, FIND OUT WHY
            description: 'Deal 2 damage to any enemy'
          },
          description: `Don't make this boar upset, because if you do, the hunt is on.`
        },
        {
          name: 'Evil Ping',
          rarity: 'Uncommon',
          imgSrc: require('@/assets/images/card-game/evil_ping.png'),
          animatableImgSrc: require('@/assets/images/card-game/evil_ping_animatable.png'),
          maxHealth: 3,
          currentHealth: 3,
          power: 3,
          specialMove: {
            move: /* this.dealDmg(2)*/ 'Blah', //! DOESN'T WORK, FIND OUT WHY
            description: 'Deal 2 damage to any enemy'
          },
          description: `Despite lovin' the cold, he hates ice cream.`
        },
        {
          name: 'Lord of Day and Night',
          rarity: 'Legendary',
          imgSrc: require('@/assets/images/card-game/lord_of_day_and_night.png'),
          animatableImgSrc: require('@/assets/images/card-game/lord_of_day_and_night_animatable.png'),
          maxHealth: 10,
          currentHealth: 10,
          power: 8,
          specialMove: {
            move: /* this.dealDmg(2)*/ 'Blah', //! DOESN'T WORK, FIND OUT WHY
            description: 'Deal 2 damage to any enemy'
          },
          description: 'How do you even kill a time of day?!'
        }
      ],
      enemyHand: [
        {
          name: 'Wulfric',
          rarity: 'Rare',
          imgSrc: require('@/assets/images/card-game/evil_ping.png'),
          animatableImgSrc: require('@/assets/images/card-game/evil_ping_animatable.png'),
          maxHealth: 3,
          currentHealth: 3,
          power: 4,
          specialMove: {
            move: /* this.dealDmg(2)*/ 'Blah', //! DOESN'T WORK, FIND OUT WHY
            description: 'Deal 2 damage to any enemy'
          },
          description: 'The biggest baddest warrior in town'
        },
        {
          name: 'Awelad',
          rarity: 'Epic',
          imgSrc: require('@/assets/images/card-game/evil_ping.png'),
          animatableImgSrc: require('@/assets/images/card-game/evil_ping_animatable.png'),
          maxHealth: 2,
          currentHealth: 2,
          power: 6,
          specialMove: {
            move: /* this.dealDmg(2)*/ 'Blah', //! DOESN'T WORK, FIND OUT WHY
            description: 'Deal 2 damage to any enemy'
          },
          description: 'The biggest baddest warrior in town'
        },
        {
          name: 'Angry Boar',
          rarity: 'Uncommon',
          imgSrc: require('@/assets/images/card-game/angry_boar.png'),
          animatableImgSrc: require('@/assets/images/card-game/angry_boar_animatable.png'),
          maxHealth: 4,
          currentHealth: 4,
          power: 2,
          specialMove: {
            move: /* this.dealDmg(2)*/ 'Blah', //! DOESN'T WORK, FIND OUT WHY
            description: 'Deal 2 damage to any enemy'
          },
          description: `Don't make this boar upset, because if you do, the hunt is on.`
        },
        {
          name: 'Evil Ping',
          rarity: 'Rare',
          imgSrc: require('@/assets/images/card-game/evil_ping.png'),
          animatableImgSrc: require('@/assets/images/card-game/evil_ping_animatable.png'),
          maxHealth: 3,
          currentHealth: 3,
          power: 3,
          specialMove: {
            move: /* this.dealDmg(2)*/ 'Blah', //! DOESN'T WORK, FIND OUT WHY
            description: 'Deal 2 damage to any enemy'
          },
          description: `Despite lovin' the cold, he hates ice cream.`
        },
        {
          name: 'Lord of the Dead',
          rarity: 'Legendary',
          imgSrc: require('@/assets/images/card-game/evil_ping.png'),
          animatableImgSrc: require('@/assets/images/card-game/evil_ping_animatable.png'),
          maxHealth: 7,
          currentHealth: 7,
          power: 9,
          specialMove: {
            move: /* this.dealDmg(2)*/ 'Blah', //! DOESN'T WORK, FIND OUT WHY
            description: 'Deal 2 damage to any enemy'
          },
          description: 'Who called him here?!'
        }
      ]
    };
  },

  methods: {
    dealDmg(amount: number): void {
      for (const enemy of this.enemyHand) {
        enemy.currentHealth -= amount;
      }
    }
  },

  watch: {
    isFullscreen() {
      const gameContainer = this.$refs.gameContainer as HTMLElement;
      if (this.isFullscreen === true) {
        gameContainer.classList.replace(
          'game-container',
          'fullscreen-game-container'
        );
        document.body.style.overflow === 'hidden';
      } else {
        gameContainer.classList.replace(
          'fullscreen-game-container',
          'game-container'
        );
        document.body.style.overflow === 'auto';
      }
    }
  }
});
</script>

<style lang="scss" scoped>
.card-game {
  padding-top: 86px;

  h2 {
    margin: 30px;
  }

  .toggle-fullscreen-btn {
    position: absolute;
    top: 10px;
    right: 10px;
    background-color: transparent;
    z-index: 25;
    outline: none;
    border: none;
    i {
      color: white;
      font-size: 30px;
    }
  }

  .game-container {
    position: relative;
    width: 80%;
    max-width: 1500px;
    height: 600px;
    border: 2px solid;
    border-radius: 5px;
    margin: auto;
    overflow: hidden;
  }

  .fullscreen-game-container {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
    overflow: hidden;
    z-index: 15;
  }

  .description {
    width: 70%;
    display: flex;
    background-color: var(--color-primary);
    border-radius: 5px;
    margin: 50px auto;
    color: white;
    text-align: left;
    position: relative;
  }

  .description h3 {
    margin-bottom: 15px;
  }

  .mainDescription,
  .otherDescription {
    padding: 20px;
    list-style: none;
    box-sizing: border-box;
  }

  .mainDescription {
    width: 60%;
    border-right: 1px solid;
  }

  .otherDescription {
    width: 40%;
    height: 100%;
  }

  .otherDescription li {
    list-style: none;
  }

  .madeWith {
    padding: 20px;
    height: 100%;
  }

  .otherInfo {
    padding: 20px;
    height: 100%;
  }

  @media only screen and (max-width: 620px) {
    .description {
      flex-direction: column;
      padding: 10px;
    }
    .mainDescription {
      width: 100%;
      border-right: none;
      border-bottom: 1px solid;
      padding: 20px;
    }
    .otherDescription {
      width: 100%;
      padding: 0;
    }
  }
}
</style>
