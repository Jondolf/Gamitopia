<template>
  <div class="individual-news-post-view">
    <NewsPost
      v-if="newsPostFound"
      :id="newsPost.id"
      :title="newsPost.title"
      :body="newsPost.body"
      :date="handleFormatDate(newsPost.date)"
      :canCollapse="true"
    />

    <div v-else class="not-found-container">
      <h1>Unfortunately this news post was not found.</h1>
      <router-link to="/news/">You can go view all news here.</router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRoute } from 'vue-router';
import NewsPost from '@/components/news/NewsPost.vue';
import { formatDate } from '../admin/actions/formatDate';
import { getNewsPost } from '../admin/actions/getNewsPost';
import { News } from '../../interfaces/News';

export default defineComponent({
  name: 'IndividualNewsPostView.vue',

  components: {
    NewsPost
  },

  data() {
    return {
      newsPost: {} as News,
      newsPostFound: true
    };
  },

  methods: {
    handleFormatDate: formatDate
  },

  async mounted() {
    try {
      const newsPostData = await getNewsPost(
        ((useRoute().params as unknown) as Record<string, string>).id
      );
      this.newsPost = newsPostData;
    } catch (error) {
      this.newsPostFound = false;
    }
  }
});
</script>

<style lang="scss">
.individual-news-post-view {
  padding-top: 66px;
  .not-found-container {
    text-align: center;
    padding: 35px 25px;
    color: black;
    a {
      color: black;
    }
  }
}

.dark.default-dark .individual-news-post-view .not-found-container {
  color: white;
  a {
    color: white;
  }
}
</style>
