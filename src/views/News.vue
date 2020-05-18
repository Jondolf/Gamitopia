<template>
  <div class="news">
    <router-link to="/admin/create-news-post" v-if="isAdmin"
      ><button class="create-news-post-btn">Create new</button>
    </router-link>

    <div class="filter">
      <h2>Filter</h2>
      <div class="btn-container">
        <button v-on:click="filterByYear('Show all')">All</button>
        <button v-on:click="filterByYear('2020')">2020</button>
        <button v-on:click="filterByYear('2019')">2019</button>
      </div>
    </div>
    <div class="news-posts-container">
      <NewsPost
        v-for="newsPost in news"
        :key="newsPost.id"
        :id="newsPost.id"
        :title="newsPost.title"
        :body="newsPost.body"
        :date="handleFormatDate(newsPost.date)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

import NewsPost from '@/components/news/NewsPost.vue';

import { getNewsPosts } from './admin/actions/getNewsPosts';
import { formatDate } from './admin/actions/formatDate';
import { News } from '../interfaces/News';

export default Vue.extend({
  name: 'news',
  components: { NewsPost },
  data() {
    return {
      news: [] as News[],
      isAdmin: this.$store.state.isAdmin
    };
  },
  methods: {
    filterByYear(year: string) {
      const newsPosts = document.getElementsByClassName(
        'news-post'
      ) as HTMLCollectionOf<HTMLElement>;
      for (const post of newsPosts) {
        const date = post.getElementsByTagName('time')[0] as HTMLTimeElement;
        if (date.innerText.includes(year)) {
          post.style.display = 'block';
        } else if (year === 'Show all') {
          post.style.display = 'block';
        } else {
          post.style.display = 'none';
        }
      }
    },

    handleFormatDate: formatDate
  },

  async mounted() {
    this.news = await getNewsPosts();
  }
});
</script>

<style lang="scss">
@import '@/global.scss';
a:visited {
  color: white;
}
a:hover {
  color: rgb(200, 200, 255);
}
.dark.default-dark .filter button {
  color: white;
}

.news {
  padding-top: 86px;
  .create-news-post-btn {
    width: 10%;
    height: 35px;
    margin-bottom: 20px;
    border: none;
    border-radius: 5px;
    opacity: none;
    color: white;
    background-color: var(--secondary-color);
    transition: 0.4s;
  }
  .create-news-post-btn:hover {
    border-radius: 10px;
  }
  .filter {
    width: 50%;
    padding: 25px;
    border-radius: 5px;
    text-align: left;
    background-color: var(--secondary-color);
    margin: auto;
    h2 {
      color: white;
    }
    .btn-container {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-top: 15px;
    }
    button {
      background-color: var(--primary-color);
      color: black;
      width: 33%;
      padding: 15px 0 15px 0;
      border: none;
      outline: none;
      margin: 0 15px 0 0;
      border-radius: 5px;
      transition: 0.4s;
    }
    button:last-child {
      margin: 0;
    }
    button:hover {
      padding: 18px;
    }
  }
  .news-posts-container {
    display: flex;
    flex-direction: column-reverse;
  }
}
</style>
