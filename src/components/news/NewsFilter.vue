<template>
  <div class="news-filter">
    <div v-if="isAdmin" class="admin-tools">
      <button @click="router.push('/admin/create-news-post')" class="create-news-post-button">Create news post</button>
      <button @click="copyToClipboard(JSON.stringify(news))" class="copy-news-posts-as-json-button">
        Copy news posts as JSON
      </button>
    </div>

    <div class="collapse-expand-container">
      <button @click="collapseAll()">Collapse all</button>
      <button @click="expandAll()">Expand all</button>
    </div>

    <div class="news-search">
      <label for="searchBar" class="search-icon-container">
        <i class="material-icons">search</i>
      </label>

      <input
        v-model="searchTerm"
        @keyup.enter="$event.target.blur()"
        autocomplete="off"
        placeholder="Search news"
        type="search"
        id="searchBar"
      />
    </div>

    <div class="year-selection-container">
      <div class="all-years-checkbox-container">
        <input
          type="checkbox"
          checked
          @click="
            allowedYears = ($event.target.checked ? getYearsFrom2019ToNow() : []).sort();
            handleAllYearsCheckBoxCheck($event.target.checked);
          "
          name="allYears"
          id="allYears"
          ref="allYearsCheckbox"
        />
        <label for="allYears">All</label>
      </div>

      <div v-for="index in new Date().getFullYear() - 2019 + 1" :key="index" class="checkbox-container">
        <input
          type="checkbox"
          checked
          @change="
            allowedYears = allowedYears.sort();
            allowedYears.includes(2019 + index - 1)
              ? allowedYears.splice(allowedYears.indexOf(2019 + index - 1), 1)
              : allowedYears.push(2019 + index - 1);
            allowedYears = allowedYears.sort();
            handleYearCheckBoxCheck();
          "
          :name="`year${2019 + index - 1}`"
          :id="`year${2019 + index - 1}`"
          class="year-checkbox"
        />
        <label :for="`year${2019 + index - 1}`">{{ 2019 + index - 1 }}</label>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { NewsPost } from '@/interfaces/NewsPost';
import { computed, defineComponent, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { copyToClipboard } from '@/utils/copyToClipboard';
import { useSearch } from '@/composables/useSearch';

export default defineComponent({
  name: 'NewsFilter',

  props: {
    news: {
      type: Array as () => NewsPost[],
      required: true
    }
  },

  setup(props, { emit }) {
    const router = useRouter();
    const isAdmin: boolean = useStore().state.isAdmin;
    const postTitles = computed<string[]>(() => props.news.map((post) => post.title));
    const { searchTerm, availableItems } = useSearch(postTitles);
    const allowedYears = getYearsFrom2019ToNow().sort();
    const allYearsCheckbox = ref<HTMLInputElement>(null!);

    const filteredNews = computed<NewsPost[]>(() =>
      props.news.filter(
        (post) => availableItems.value.includes(post.title) && allowedYears.includes(+post.date.split('-')[0])
      )
    );

    function collapseAll() {
      emit('collapse-all-posts');
      localStorage.setItem('areAllPostsCollapsed', 'true');
    }

    function expandAll() {
      emit('expand-all-posts');
      localStorage.setItem('areAllPostsCollapsed', 'false');
    }

    function getYearsFrom2019ToNow(): number[] {
      const currentYear = new Date().getFullYear();
      const years: number[] = [];
      for (let year = 2019; year <= currentYear; year++) {
        years.push(year);
      }
      return years;
    }

    function handleAllYearsCheckBoxCheck(isChecked: boolean) {
      const checkBoxes = document.getElementsByClassName('year-checkbox') as HTMLCollectionOf<HTMLInputElement>;
      for (const checkbox of checkBoxes) {
        checkbox.checked = isChecked;
      }
    }

    function handleYearCheckBoxCheck() {
      const amountOfCheckBoxes = document.getElementsByClassName('year-checkbox').length;
      allYearsCheckbox.value.checked = allowedYears.length >= amountOfCheckBoxes;
      allYearsCheckbox.value.indeterminate = allowedYears.length > 0 && allowedYears.length < amountOfCheckBoxes;
    }

    watch(filteredNews, () => emit('filter-news', filteredNews.value));

    return {
      router,
      isAdmin,
      searchTerm,
      allowedYears,
      allYearsCheckbox,
      filteredNews,
      collapseAll,
      expandAll,
      getYearsFrom2019ToNow,
      handleAllYearsCheckBoxCheck,
      handleYearCheckBoxCheck,
      copyToClipboard
    };
  }
});
</script>

<style scoped lang="scss">
.news-filter {
  width: 15vw;
  padding: 30px;
  margin: 15px;
  border-radius: var(--border-radius);
  text-align: left;
  background-color: var(--color-primary-tint);
  z-index: 1;

  .admin-tools,
  .collapse-expand-container {
    width: 100%;
    display: flex;
    margin-bottom: 15px;

    button {
      background-color: var(--color-light);
      color: var(--color-light-contrast);
      width: 100%;
      padding: 10px;
      border: 3px solid var(--color-light);
      outline: none;
      border-radius: var(--border-radius);
      transition: 0.4s;
      &:hover {
        border: 3px solid var(--color-light-contrast);
      }
      &:first-child {
        margin-right: 15px;
      }
    }
  }

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

  .year-selection-container {
    width: 50%;
    display: flex;
    flex-direction: column;
    margin-top: 15px;

    div {
      display: flex;
      align-items: center;
      margin-bottom: 10px;
      &:last-child {
        margin-bottom: 0;
      }
    }

    input {
      margin-right: 10px;
    }

    label {
      display: inline;
    }

    .checkbox-container {
      padding-left: 15px;
    }
  }
}

@media only screen and (max-width: 1150px) {
  .news-filter {
    width: 80%;
    max-width: 50em;
    margin: 15px auto;
  }
}
</style>
