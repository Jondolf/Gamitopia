<template>
  <div class="upgrade-container" ref="upgradeContainer">
    <button @click="openUpgradesMenu()" class="open-upgrades-menu">
      <p>Open upgrades</p>
    </button>
    <div class="upgrade-btn-container">
      <UpgradeBtn
        :name="pointsPerClick.name"
        :level="pointsPerClick.level"
        :cost="pointsPerClick.cost"
        @btn-clicked="$emit('btn-clicked', pointsPerClick, 'Not unique')"
      />
      <UpgradeBtn
        :name="speedOfPointsByTime.name"
        :level="speedOfPointsByTime.level"
        :cost="speedOfPointsByTime.cost"
        @btn-clicked="$emit('btn-clicked', speedOfPointsByTime, 'Unique')"
      />
      <UpgradeBtn
        :name="amountOfPointsByTime.name"
        :level="amountOfPointsByTime.level"
        :cost="amountOfPointsByTime.cost"
        @btn-clicked="$emit('btn-clicked', amountOfPointsByTime, 'Unique')"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import UpgradeBtn from './UpgradeBtn.vue';
import { Upgrade } from './upgrade';

export default defineComponent({
  name: 'UpgradeContainer',

  components: {
    UpgradeBtn
  },

  props: {
    pointsPerClick: Object as () => Upgrade,
    speedOfPointsByTime: Object as () => Upgrade,
    amountOfPointsByTime: Object as () => Upgrade
  },

  data() {
    return {
      upgradesMenuOpen: false
    };
  },

  methods: {
    openUpgradesMenu() {
      const upgradeContainer = this.$refs.upgradeContainer as HTMLButtonElement;
      this.upgradesMenuOpen = !this.upgradesMenuOpen;
      this.upgradesMenuOpen
        ? (upgradeContainer.style.top = '0')
        : (upgradeContainer.style.top = '90%');
    }
  }
});
</script>

<style lang="scss" scoped>
.upgrade-container {
  width: 40%;
  text-align: left;
  -webkit-transition: 1s 0s ease-out;
  -moz-transition: 1s 0s ease-out;
  -o-transition: 1s 0s ease-out;
  transition: 1s 0s ease-out;

  .open-upgrades-menu {
    display: none;
  }

  .upgrade-btn-container {
    border-right: 1px solid var(--color-light-contrast);
    display: flex;
    flex-direction: column;
    flex-flow: wrap;
    height: 100%;
    width: 100%;
  }
}

@media only screen and (max-width: 800px) {
  .upgrade-container {
    position: absolute;
    top: 90%;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 2;
    background-color: var(--upgrades);

    .open-upgrades-menu {
      display: block;
      width: 100%;
      height: 10%;
      background-color: rgba(255, 255, 255, 0);
      border: none;
      color: white;
      font-size: 16px;
      font-family: Nunito, sans-serif;
      transition: 0.4s;
      &:hover {
        background-color: rgba(255, 255, 255, 0.2);
      }
    }

    .upgrade-btn-container {
      height: 90%;
      border: none;
      border-top: 2px solid white;
    }
  }
}
</style>
