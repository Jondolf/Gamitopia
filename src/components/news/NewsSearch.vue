<template>
  <div class="news-search">
    <label for="searchBar" class="search-icon-container">
      <i class="material-icons">search</i>
    </label>

    <input
      @input="handleFilterNews($event.target.value)"
      @keyup.enter="$event.target.blur()"
      :value="searchTerm"
      :placeholder="placeholderText"
      type="search"
      id="searchBar"
    />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { NewsPost } from '@/interfaces/NewsPost';
import { useSearch } from '@/composables/useSearch';

export default defineComponent({
  name: 'NewsSearch',

  props: {
    newsPosts: {
      type: Array as () => NewsPost[],
      required: true
    },
    isCaseSensitive: {
      type: Boolean,
      default: false
    },
    placeholderText: String
  },

  setup(props, { emit }) {
    const postTitles = computed<string[]>(() => props.newsPosts.map((post) => post.title));
    const { searchTerm, availableItems } = useSearch(postTitles);

    const filteredNewsPosts = computed<NewsPost[]>(() =>
      props.newsPosts.filter((post) => availableItems.value.includes(post.title))
    );

    function handleFilterNews(newSearchText: string) {
      searchTerm.value = newSearchText;
      emit('filter-news', filteredNewsPosts.value);
    }

    return {
      searchTerm,
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
  border-radius: var(--border-radius);
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
    &::placeholder {
      color: white;
      opacity: 0.8;
    }
  }
}
</style>
