<template>
  <div class="news-search">
    <label for="searchBar" class="search-icon-container">
      <i class="material-icons">search</i>
    </label>

    <input
      @input="handleFilterNews($event.target.value)"
      @keyup.enter="$event.target.blur()"
      :value="searchText"
      :placeholder="placeholderText"
      type="search"
      id="searchBar"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { NewsPost } from '@/interfaces/NewsPost';

export default defineComponent({
  name: 'NewsSearch',

  props: {
    newsPosts: Array as () => NewsPost[],
    isCaseSensitive: {
      type: Boolean,
      default: false
    },
    placeholderText: String
  },

  setup(props, { emit }) {
    const searchText = ref('');
    const filteredNewsPosts = ref<NewsPost[]>([]);

    function handleFilterNews(newSearchText: string) {
      searchText.value = newSearchText;
      filterNews();
      emit('filter-news', filteredNewsPosts.value);
    }

    function filterNews() {
      if (props.newsPosts) {
        if (searchText.value === '') {
          filteredNewsPosts.value = props.newsPosts;
          return;
        }
        filteredNewsPosts.value = props.newsPosts.filter((newsPost: NewsPost) =>
          props.isCaseSensitive
            ? newsPost.title.includes(searchText.value)
            : newsPost.title.toLowerCase().includes(searchText.value.toLowerCase())
        );
      }
    }

    return {
      searchText,
      handleFilterNews
    };
  }
});
</script>

<style lang="scss" scoped>
.news-search {
  width: 100%;
  padding: 13px;
  color: white;
  background-color: var(--color-secondary);
  border: 2px solid white;
  border-radius: 5px;
  display: flex;
  align-items: center;
  box-sizing: border-box;

  .search-icon-container {
    width: 35px;
    display: flex;
    justify-content: left;
    align-items: center;
    i {
      color: white;
      font-size: 20px;
    }
  }

  input#searchBar {
    width: 100%;
    color: white;
    background-color: transparent;
    border: none;
    font-size: 18px;
  }
}
</style>
