<template>
  <div class="card-game">
    <h2>Card game</h2>
    <div class="game-container">
      <GameBoard :playerHand="playerHand" :enemyHand="enemyHand" />
    </div>

    <div class="description">
      <div class="mainDescription">
        <h3>Description</h3>
        <p>
          Press the button in the bottom to randomize. Click the menu button to
          open a small list of things to randomize. Click on a list item and
          press the randomizer button to randomize.
          <br />
          <br />Number Range: Get a random number from 0 to 10 (with default
          settings). You can move the slider below the randomizer button to
          change the range of numbers to randomize, for example 0 to 100 or 0 to
          255.
          <br />
          <br />Heads or Tails: Get either heads or tails. This could be useful
          if you have to decide between two things. For example, should I eat
          pizza or lasagna? Heads or tails?
          <br />
          <br />Roll Dice: Get a random number (shown on the dice) between 1 and
          6. This could be useful, for example, if you want to play board games
          but don't have a dice with you.
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
import { ICard } from '../../interfaces/ICard';

export default Vue.extend({
  name: 'CardGame',

  components: {
    GameBoard
  },

  data() {
    return {
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
          rarity: 'common',
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
      for (let enemy of this.enemyHand) {
        enemy.currentHealth -= amount;
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

  .game-container {
    width: 80%;
    max-width: 1500px;
    height: 600px;
    border: 2px solid;
    border-radius: 5px;
    margin: auto;
    overflow: hidden;
  }

  .description {
    width: 70%;
    display: flex;
    background-color: var(--secondary-color);
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
