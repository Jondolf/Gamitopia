<template>
  <div class="tic-tac-toe-victory-screen">
    <h2>{{ gameEndMessage }}</h2>
    <button @click="$emit('restart')">Restart</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'TicTacToeVictoryScreen',

  props: {
    gameEndMessage: String
  }
});
</script>

<style lang="scss" scoped>
.tic-tac-toe-victory-screen {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(34, 40, 49, 0.5);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h2 {
    color: white;
    margin: 0 auto 20px auto;
  }

  button {
    width: 20vw;
    padding: 10px;
    font-size: 16px;
    outline: none;
    border: none;
    background-color: white;
    color: black;
    font-family: Nunito;
    border-radius: 5px;
    &:hover {
      background-color: rgb(200, 200, 200);
    }
  }
}

@media only screen and (max-width: 650px) {
  .tic-tac-toe-victory-screen {
    h2 {
      font-size: 14px;
    }

    button {
      width: 25vw;
      padding: 7px;
      font-size: 12px;
    }
  }
}

@media only screen and (max-width: 600px) {
  .tic-tac-toe-victory-screen {
    h2 {
      font-size: 20px;
    }

    button {
      width: 20vw;
      padding: 9px;
      font-size: 16px;
    }
  }
}

@media only screen and (max-width: 400px) {
  .tic-tac-toe-victory-screen {
    h2 {
      font-size: 16px;
    }

    button {
      width: 30vw;
      padding: 8px;
      font-size: 14px;
    }
  }
}
</style>
