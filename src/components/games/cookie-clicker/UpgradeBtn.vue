<template>
  <div class="upgrade-btn">
    <button v-on:click="$emit('btnClicked')">
      <h4>{{ name }}</h4>
      <p>Level: {{ level }}</p>
      <p>Cost: {{ cost }}</p>
    </button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  name: 'UpgradeBtn',
  props: {
    name: String,
    level: Number,
    cost: Number
  }
});
</script>

<style lang="scss" scoped>
@import '@/global.scss';
.upgrade-btn {
  width: 100%;
  border-bottom: 1px solid white;
  background-color: rgb(55, 76, 194);
  button {
    color: white;
    width: 100%;
    height: 100%;
    border: none;
    text-align: left;
    line-height: 25px;
    font-size: 16px;
    padding: 0 10px 0 10px;
    background-color: rgba(255, 255, 255, 0);
    transition: 0.3s;
  }
  button:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
}

#upgrade:last-child {
  border: none;
}

.dark.default-dark .upgrade-btn {
  background-color: #17223b;
}
</style>
