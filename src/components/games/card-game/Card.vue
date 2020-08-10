<template>
  <div :class="card.rarity.toLowerCase() + ' card'">
    <div class="name-and-img-container">
      <h2 class="name">{{ card.name }}</h2>
      <div
        class="animatable-background-img"
        ref="animatableBackgroundImg"
      ></div>
      <img :src="card.imgSrc" alt="Card" />
    </div>

    <p :class="card.rarity.toLowerCase()">{{ card.rarity }}</p>

    <div class="stats">
      <p class="health">{{ card.currentHealth }}</p>
      <p class="power">{{ card.power }}</p>
    </div>

    <p class="description">{{ card.specialMove.description }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ICard from '@/interfaces/Card';

export default defineComponent({
  name: 'Card',

  props: {
    card: Object as () => ICard
  },

  data() {
    return {
      health: 0
    };
  },

  mounted() {
    const animatableBackgroundElement = this.$refs
      .animatableBackgroundImg as HTMLElement;
    animatableBackgroundElement.style.backgroundImage = `url(${this.card.animatableImgSrc})`;
  }
});
</script>

<style lang="scss" scoped>
@keyframes BACKGROUND-MOVE {
  0% {
    background-position-x: 0;
  }
  100% {
    background-position-x: 10000000px;
  }
}

.card {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: bisque;

  .name-and-img-container {
    position: relative;

    .name {
      position: absolute;
      bottom: 0;
      width: 100%;
      font-weight: bold;
      color: white;
      background-color: rgba(0, 0, 0, 0.5);
      -webkit-text-stroke: 0.25px black;
      z-index: 3;
    }

    img {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: 2;
    }

    .animatable-background-img {
      width: 100%;
      height: 100%;
      background-size: auto 100%;
      background-position-y: bottom;
      background-repeat: repeat;
      animation: BACKGROUND-MOVE 1000000s linear infinite;
    }
  }

  .stats {
    width: 100%;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    .health,
    .power {
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .health {
      background-color: red;
    }

    .power {
      background-color: palevioletred;
    }
  }

  .description {
    background-color: rgba(0, 0, 0, 0.25);
  }
}

.card.medium {
  width: 100px;
  height: 160px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: bisque;
  border: 2px solid black;
  border-radius: 4px;

  .name-and-img-container {
    height: 100px;
    width: 100%;
    position: relative;
    border: 1px solid black;

    .name {
      position: absolute;
      bottom: 0;
      width: 100%;
      font-size: 14px;
      font-weight: bold;
      color: white;
      background-color: rgba(0, 0, 0, 0.5);
    }

    img {
      width: 100%;
      height: 100%;
    }
  }

  .stats {
    width: 100%;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    .health,
    .power {
      border-radius: 50%;
      width: 25px;
      height: 25px;
    }

    .health {
      background-color: red;
    }

    .power {
      background-color: palevioletred;
    }
  }

  .description {
    width: 90%;
    height: 25%;
    padding: 5px;
    border: 1px solid black;
    background-color: rgba(0, 0, 0, 0.25);
    font-size: 10px;
    line-height: 0.75rem;
  }
}

.card.large {
  width: 200px;
  height: 325px;
  border: 2px solid black;
  border-radius: 5px;

  .name-and-img-container {
    height: 200px;
    width: 100%;
    border: 1px solid black;

    .name {
      font-size: 22px;
      -webkit-text-stroke: 1px black;
    }

    img {
      width: 100%;
      height: 100%;
    }
  }

  .stats {
    width: 100%;
    .health,
    .power {
      width: 50px;
      height: 50px;
    }
  }

  .description {
    width: 90%;
    height: 25%;
    padding: 5px;
    border: 1px solid black;
    background-color: rgba(0, 0, 0, 0.25);
    font-size: 16px;
    line-height: 1rem;
  }
}

.common.card {
  background-color: cadetblue;
}

.uncommon.card {
  background: rgb(0, 139, 139);
  box-shadow: 0 0 10px 2px rgba(0, 139, 139, 0.25);
}

.rare.card {
  background-color: rgb(110, 178, 244);
  box-shadow: 0 0 12px 2px rgba(110, 178, 244, 0.35);
}

.epic.card {
  background-color: rgb(174, 123, 240);
  box-shadow: 0 0 14px 3px rgba(174, 123, 240, 0.45);
}

.legendary.card {
  background-color: gold;
  box-shadow: 0 0 15px 5px rgba(255, 215, 0, 0.55);
}
</style>
