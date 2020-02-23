<template>
  <form class="news-post-form">
    <input
      :value="title"
      @input="$emit('update:title', $event.target.value)"
      type="text"
      name="title"
      class="title"
    />
    <textarea
      :value="body"
      @input="$emit('update:body', $event.target.value)"
      name="body"
      rows="1"
      ref="textarea"
      class="body"
    ></textarea>
    <input
      :value="date"
      @input="$emit('update:date', $event.target.value)"
      type="date"
      name="date"
      class="date"
    />
  </form>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  name: 'news-post-form',

  props: {
    title: String,
    body: String,
    date: String
  },

  methods: {
    resizeTextarea() {
      const textareaElement = this.$refs.textarea as HTMLTextAreaElement;
      textareaElement.style.height = 'auto';
      textareaElement.style.height = textareaElement.scrollHeight + 'px';
    }
  },

  updated() {
    this.resizeTextarea();
  },

  mounted() {
    window.addEventListener('resize', this.resizeTextarea);
    this.resizeTextarea();
  }
});
</script>

<style lang="scss" scoped>
@import '@/global.scss';

.news-post-form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 80%;
  background-color: var(--secondary-color);
  margin: auto;
  padding: 30px 25px 30px 25px;
  border-radius: 5px;
  .title,
  .body,
  .date {
    font-family: Nunito;
    outline: none;
    border: none;
    border-bottom: 1px solid white;
    transition: 0.4s;
    background-color: rgba(255, 255, 255, 0);
    color: white;
  }
  .title {
    font-size: 23px;
    font-weight: bold;
  }
  .body {
    border: 1px solid white;
    font-size: 16px;
    margin: 15px 0px;
    padding: 5px;
    overflow-y: hidden;
    line-height: 1.5rem;
  }
  .date {
    font-size: 16px;
  }
}
</style>
