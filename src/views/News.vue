<template>
  <div id="news">
    <NewsFilter
      :news="news"
      @collapse-all-posts="areAllPostsCollapsed = true"
      @expand-all-posts="areAllPostsCollapsed = false"
      @filter-news="(filtered) => (filteredNews = filtered)"
    />
    <div class="content">
      <PageHeader :style="{ paddingTop: 0 }">News</PageHeader>
      <div class="news-posts-container">
        <NewsPostComponent
          v-for="newsPost in filteredNews"
          :key="newsPost.id"
          :newsPost="newsPost"
          :canCollapse="true"
          :areAllCollapsed="areAllPostsCollapsed"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';

import PageHeader from '@/components/PageHeader.vue';
import NewsFilter from '@/components/news/NewsFilter.vue';
import NewsPostComponent from '@/components/news/NewsPost.vue';

import { getNewsPosts } from './admin/actions/getNewsPosts';
import { NewsPost } from '@/interfaces/NewsPost';

export default defineComponent({
  name: 'News',

  components: {
    PageHeader,
    NewsFilter,
    NewsPostComponent
  },

  setup() {
    const news = ref<NewsPost[]>([]);
    const filteredNews = ref<NewsPost[]>([]);
    const areAllPostsCollapsed = ref(false);

    if (localStorage.getItem('areAllPostsCollapsed')) {
      areAllPostsCollapsed.value = JSON.parse(localStorage.getItem('areAllPostsCollapsed')!);
    }

    onMounted(async () => {
      news.value = await getNewsPosts();
      filteredNews.value = news.value;
    });

    return {
      news,
      filteredNews,
      areAllPostsCollapsed
    };
  }
});
</script>

<style lang="scss" scoped>
a {
  &:visited {
    color: white;
  }
  &:hover {
    color: rgb(200, 200, 255);
  }
}

#news {
  display: flex;
  flex-direction: row;
  justify-content: center;
  position: absolute;
  top: 68px;
  right: 0;
  bottom: 0;
  left: 0;

  .content {
    width: 85vw;
    margin: 15px;
    overflow: auto;

    .news-posts-container {
      display: flex;
      flex-direction: column-reverse;
    }
  }
}

@media only screen and (max-width: 1150px) {
  #news {
    flex-direction: column;
    position: static;
    padding-top: 68px;
    width: 90%;
    margin: auto;

    .content {
      width: 100%;
      margin: 15px auto;
    }
  }
}
</style>
