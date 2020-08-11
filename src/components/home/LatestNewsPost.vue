<template>
  <div class="latest-news-post">
    <h2>Latest News Post</h2>
    <NewsPost :id="newsPost.id" :title="newsPost.title" :body="newsPost.body" :date="handleFormatDate(date)" />
    <p>{{ errorMessage }}</p>

    <div class="news-post-gradient"></div>

    <router-link :to="'/news/' + newsPost.id" class="read-all">Read here</router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import NewsPost from '@/components/news/NewsPost.vue';

import { News } from '@/interfaces/News';
import { getLatestNewsPost } from '@/views/admin/actions/getNewsPostLatest';
import { formatDate } from '@/views/admin/actions/formatDate';

export default defineComponent({
  name: 'LatestNewsPost',

  components: {
    NewsPost
  },

  data() {
    return {
      errorMessage: '',
      newsPost: {} as News,
      date: '' // Date in data as well to avoid an error where date is not found due to it not being found from the database yet
    };
  },

  methods: {
    handleFormatDate: formatDate
  },

  async mounted() {
    try {
      this.newsPost = await getLatestNewsPost();
      this.date = this.newsPost.date;
      this.errorMessage = '';
    } catch (error) {
      this.errorMessage = error.message;
    }
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
  border-radius: 5px;
  h2 {
    margin: 10px auto 40px auto;
  }
  a {
    font-weight: normal;
    position: absolute;
    border-radius: 5px;
    bottom: 20px;
    padding: 5px 10px 5px 10px;
    font-weight: bold;
    left: 50%;
    transition: 0.4s;
    transform: translateX(-50%);
    background-color: white;
    color: black;
  }
  a:hover {
    border-radius: 10px;
  }
  .news-post-gradient {
    position: absolute;
    top: 50%;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    padding: 30px;
    width: 70%;
    border-radius: 5px;
    background: linear-gradient(180deg, rgba(250, 231, 231, 0) 70%, var(--color-primary) 100%);
  }
}
</style>
