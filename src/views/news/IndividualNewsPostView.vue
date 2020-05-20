<template>
  <div class="individual-news-post-view">
    <NewsPost
      v-if="newsPostFound"
      :key="newsPost.id"
      :id="newsPost.id"
      :title="newsPost.title"
      :body="newsPost.body"
      :date="handleFormatDate(newsPost.date)"
    />

    <div v-if="!newsPostFound" class="not-found-container">
      <h1>Unfortunately this news post was not found.</h1>
      <router-link to="/news/">You can go view all news here.</router-link>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import NewsPost from '@/components/news/NewsPost.vue';
import { getNewsPost } from '../admin/actions/getNewsPost';
import { formatDate } from '../admin/actions/formatDate';
import { News } from '../../interfaces/News';
export default Vue.extend({
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
      const newsPostData = await getNewsPost(this.$route.params.id);
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
