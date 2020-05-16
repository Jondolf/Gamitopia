<template>
  <div class="news-post-form-preview">
    <h2 class="news-post-title">{{ title }}</h2>
    <div v-html="body" class="news-post-body" ref="newsPostBody">
      {{ body }}
    </div>
    <time :datetime="date" class="news-post-date">{{ date }}</time>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import axios from 'axios';
import hljs from 'highlight.js';

export default Vue.extend({
  name: 'news-post-form-preview',

  props: {
    title: String,
    body: String,
    date: String
  },

  updated() {
    const body = this.$refs.newsPostBody as HTMLElement;
    body.querySelectorAll('pre code').forEach(block => {
      hljs.highlightBlock(block);
    });
  }
});
</script>

<style lang="scss" scoped>
.news-post-form-preview {
  width: 80%;
  background-color: var(--secondary-color);
  color: white;
  padding: 30px;
  margin: auto;
  text-align: left;
  border-radius: 5px;
  position: relative;
  white-space: pre-line;
  .news-post-id {
    position: absolute;
    top: 5px;
    left: 5px;
    color: rgb(200, 200, 200);
  }

  h2 {
    margin: 0;
  }

  .news-post-body {
    margin-top: 15px;
    margin-bottom: 15px;
    line-height: 1.5rem;
    img {
      width: 75%;
      max-width: 400px;
      margin: 10px auto;
      border-radius: 5px;
    }

    a {
      font-weight: bolder;
      font-style: italic;
    }

    ul {
      list-style: inside square;
      padding: 10px;
      border-radius: 5px;
      background-color: var(--primary-color);
      color: black;
    }
  }
}

.dark.default-dark .news-post-form-preview ul li {
  color: white;
}

.news-post-form-preview .dark.default-dark a {
  font-weight: bolder;
  font-style: italic;

  color: red;
}
</style>
