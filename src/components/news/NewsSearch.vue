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
import Vue from 'vue';
import { News } from '@/interfaces/News';

export default Vue.extend({
  name: 'NewsSearch',

  props: {
    newsPosts: Array as () => News[],
    isCaseSensitive: {
      type: Boolean,
      default: false
    },
    placeholderText: String
  },

  data() {
    return {
      searchText: '',
      filteredNewsPosts: [] as News[]
    };
  },

  methods: {
    handleFilterNews(newSearchText: string) {
      this.searchText = newSearchText;
      this.filterNews();
      this.$emit('filter-news', this.filteredNewsPosts);
    },

    filterNews() {
      if (this.newsPosts) {
        if (this.searchText === '') {
          this.filteredNewsPosts = this.newsPosts;
          return;
        }
        this.filteredNewsPosts = this.newsPosts.filter((newsPost: News) =>
          this.isCaseSensitive
            ? newsPost.title.includes(this.searchText)
            : newsPost.title
                .toLowerCase()
                .includes(this.searchText.toLowerCase())
        );
      }
    }
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
