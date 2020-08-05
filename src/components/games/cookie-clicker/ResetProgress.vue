<template>
  <div class="reset-progress">
    <h4>Are you sure you want to reset your progress?</h4>
    <ul>
      <button @click="$emit('reset')" id="resetGame">Confirm reset</button>
      <button @click="$emit('cancel')" id="cancelReset">Cancel</button>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  name: 'ResetProgress'
});
</script>

<style lang="scss" scoped>
.reset-progress {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 70%;
  background-color: rgb(26, 35, 126);
  color: white;
  z-index: 2;
  padding: 20px, 0, 0, 0;
  border-radius: 5px;
  overflow: hidden;
  border: 2px solid black;

  h4 {
    padding: 10px;
  }

  button {
    width: 50%;
    color: black;
    border: none;
    font-size: 20px;
    font-family: Nunito;
    background-color: rgba(255, 255, 255, 0);
    padding: 10px;
    transition: 0.4s;
  }

  button:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }

  ul {
    display: flex;
    justify-content: space-between;
    background-color: rgb(197, 202, 233);
  }
}

@media only screen and (max-width: 550px) {
  .reset-progress ul button {
    font-size: 16px;
  }
}

@media only screen and (max-width: 500px) {
  .reset-progress {
    font-size: 14px;
  }
}

@media only screen and (max-width: 460px) {
  .reset-progress ul button {
    font-size: 12px;
  }
}
</style>
