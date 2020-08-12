<template>
  <h1 class="page-header">
    <slot></slot>
  </h1>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'PageHeader'
});
</script>

<style lang="scss">
.page-header {
  color: var(--color-light-contrast);
  text-align: center;
  padding: 76px 0 10px 0;
}
</style>
