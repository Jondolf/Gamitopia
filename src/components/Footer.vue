<template>
  <div id="footer"><i class="material-icons">copyright</i> Gamitopia 2020</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Footer'
});
</script>

<style lang="scss" scoped>
#footer {
  background-color: var(--color-primary);
  width: 100%;
  text-align: center;
  color: white;
  padding: 30px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 0;

  i {
    font-size: 20px;
    margin-right: 5px;
  }
}
</style>
