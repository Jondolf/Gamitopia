<template>
  <div id="statusMessage" ref="statusMessage">
    <button v-on:click="hide()" class="hide-btn">
      <i class="material-icons">close</i>
    </button>
    <p class="message" ref="message">{{ message }}</p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  name: 'status-message',

  props: {
    message: String,
    messageType: String,
    showMessage: Boolean
  },

  methods: {
    show() {
      const statusMessageElement = this.$refs.statusMessage as HTMLElement;
      const messageElement = this.$refs.message as HTMLElement;
      this.messageType === 'Success'
        ? (messageElement.style.color = 'rgb(0, 255, 0)')
        : (messageElement.style.color = 'red');
      statusMessageElement.style.opacity = '1';
    },

    hide() {
      const statusMessageElement = this.$refs.statusMessage as HTMLElement;
      statusMessageElement.style.opacity = '0';
      setTimeout(() => {
        this.$emit('hide');
      }, 400);
    }
  },

  mounted() {
    this.show();
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '@/global.scss';
#statusMessage {
  background-color: var(--secondary-color);
  border-radius: 5px;
  box-shadow: 0px 0px 10px 2px rgba(0, 0, 0, 0.75);
  width: 25%;
  padding: 10px;
  transition: 0.4s;
  opacity: 1;
  z-index: 5;
  position: fixed;
  bottom: 10px;
  left: 10px;
  .hide-btn {
    position: absolute;
    top: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0);
    border: none;
    outline: none;
    i {
      color: white;
      font-size: 20px;
      transition: 0.4s;
    }
    i:hover {
      color: rgb(200, 200, 255);
    }
  }
}

.darkMode #statusMessage .hide-btn i:hover {
  color: red;
}
</style>
