<template>
  <div id="footer"><i class="material-icons">copyright</i> Gamitopia 2020</div>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  name: 'Footer'
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '@/global.scss';
#footer {
  background-color: var(--secondary-color);
  width: 100%;
  text-align: center;
  color: white;
  padding: 30px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  i {
    font-size: 20px;
    margin-right: 5px;
  }
}
</style>
