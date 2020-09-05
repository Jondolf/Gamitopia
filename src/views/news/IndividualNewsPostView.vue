<template>
  <div id="individualNewsPostView">
    <NewsPost v-if="newsPostFound" :newsPost="newsPost" :canCollapse="true" />

    <div v-else class="not-found-container">
      <h1>Unfortunately this news post was not found.</h1>
      <router-link to="/news">You can go view all news here.</router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import NewsPost from '@/components/news/NewsPost.vue';
import { formatDate } from '../admin/actions/formatDate';
import { getNewsPost } from '../admin/actions/getNewsPost';

export default defineComponent({
  name: 'IndividualNewsPostView.vue',

  components: {
    NewsPost
  },

  setup() {
    const newsPost = ref<NewsPost>({ id: NaN, tags: [], title: '', bodyAsMarkdown: '', bodyAsHTML: '', date: '' });
    const newsPostFound = ref(true);

    async function handleGetNewsPost() {
      try {
        const newsPostData = await getNewsPost(((useRoute().params as unknown) as Record<string, string>).id);
        newsPost.value = newsPostData;
      } catch (error) {
        newsPostFound.value = false;
      }
    }

    onMounted(async () => await handleGetNewsPost());

    return {
      newsPost,
      newsPostFound,
      formatDate
    };
  }
});
</script>

<style lang="scss">
#individualNewsPostView {
  padding-top: 66px;

  .not-found-container {
    text-align: center;
    padding: 35px 25px;
    color: var(--color-light-contrast);

    a {
      color: var(--color-light-contrast);
    }
  }
}
</style>
