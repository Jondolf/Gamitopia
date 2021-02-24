<template>
  <div class="view start-menu">
    <h2>Home Menu</h2>
    <button @click="$emit('start-game', false)" class="menu-button">
      Play local multiplayer
    </button>
    <button @click="$emit('start-game', true)" class="menu-button">
      Play against AI
    </button>
    <button @click="$emit('open-instructions')" class="menu-button">Instructions</button>
    <button @click="$emit('open-settings')" class="menu-button">Settings</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'StartMenu'
});
</script>
