<template>
  <div class="latest-news-post">
    <h2>Latest News Post</h2>
    <NewsPostComponent :newsPost="newsPost" :canCollapse="false" />
    <p>{{ errorMessage }}</p>

    <router-link :to="'/news/' + newsPost.id" class="read-all">Read here</router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';

import NewsPostComponent from '@/components/news/NewsPost.vue';

import { NewsPost } from '@/interfaces/NewsPost';
import { getLatestNewsPost } from '@/views/admin/actions/getNewsPostLatest';

export default defineComponent({
  name: 'LatestNewsPost',

  components: {
    NewsPostComponent
  },

  setup() {
    const newsPost = ref<NewsPost>({ id: NaN, tags: [], title: '', bodyAsMarkdown: '', bodyAsHTML: '', date: '' });
    const errorMessage = ref('');

    async function handleGetLatestNewsPost() {
      try {
        newsPost.value = await getLatestNewsPost();
        errorMessage.value = '';
      } catch (error) {
        errorMessage.value = error.message;
      }
    }

    onMounted(handleGetLatestNewsPost);

    return {
      newsPost,
      errorMessage
    };
  }
});
</script>

<style lang="scss" scoped>
.light .latest-news-post h2 {
  color: black;
}
.dark .latest-news-post h2 {
  color: white;
}

.latest-news-post {
  position: relative;
  overflow: hidden;
  max-height: 400px;
  margin-bottom: 20px;
  border-radius: var(--border-radius);
  h2 {
    margin: 10px auto 40px auto;
  }
  a {
    font-weight: normal;
    position: absolute;
    border-radius: var(--border-radius);
    bottom: 20px;
    padding: 5px 10px 5px 10px;
    font-weight: bold;
    left: 50%;
    transition: 0.4s;
    transform: translateX(-50%);
    background-color: white;
    color: black;
    &:hover {
      border-radius: 10px;
    }
  }
}
</style>
