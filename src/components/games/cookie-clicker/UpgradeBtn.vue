<template>
  <div class="upgrade-btn">
    <button @click="$emit('btn-clicked')">
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
.upgrade-btn {
  width: 100%;
  border-bottom: 1px solid white;
  background-color: var(--upgrades);

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
    &:hover {
      background-color: rgba(255, 255, 255, 0.2);
    }
  }
}
</style>
