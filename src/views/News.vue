<template>
  <div id="news">
    <div class="options">
      <div v-if="isAdmin" class="admin-tools">
        <button @click="push('/admin/create-news-post')" class="create-news-post-button">Create news post</button>
        <button @click="copyNewsPostsAsJSONToClipboard()" class="copy-news-posts-as-json-button">
          Copy news posts as JSON
        </button>
      </div>

      <div class="collapse-expand-container">
        <button @click="collapseAll">Collapse all</button>
        <button @click="expandAll">Expand all</button>
      </div>

      <NewsSearch
        @filter-news="filterNewsPostsBySearch"
        :newsPosts="news"
        :isCaseSensitive="false"
        placeholderText="Search news"
      />

      <div class="year-selection-container">
        <div class="all-years-checkbox-container">
          <input
            type="checkbox"
            checked
            @click="
              allowedYears = ($event.target.checked ? getYearsFrom2019ToNow() : []).sort();
              handleAllYearsCheckBoxCheck($event.target.checked);
              filterNewsPostsByYear();
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
              filterNewsPostsByYear();
            "
            :name="`year${2019 + index - 1}`"
            :id="`year${2019 + index - 1}`"
            class="year-checkbox"
          />
          <label :for="`year${2019 + index - 1}`">{{ 2019 + index - 1 }}</label>
        </div>
      </div>
    </div>

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
import { useStore } from 'vuex';

import PageHeader from '@/components/PageHeader.vue';
import NewsSearch from '@/components/news/NewsSearch.vue';
import NewsPostComponent from '@/components/news/NewsPost.vue';

import { getNewsPosts } from './admin/actions/getNewsPosts';
import { NewsPost } from '@/interfaces/NewsPost';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'News',

  components: {
    PageHeader,
    NewsSearch,
    NewsPostComponent
  },

  setup() {
    const news = ref<NewsPost[]>([]);
    const filteredNews = ref<NewsPost[]>([]);
    const allowedYears = ref<number[]>(getYearsFrom2019ToNow().sort());
    const areAllPostsCollapsed = ref(false);
    const isAdmin: boolean = useStore().state.isAdmin;

    const allYearsCheckbox = ref<HTMLInputElement>(null!);

    const { push } = useRouter();

    function getYearsFrom2019ToNow(): number[] {
      const currentYear = new Date().getFullYear();
      const years: number[] = [];
      for (let year = 2019; year <= currentYear; year++) {
        years.push(year);
      }
      return years;
    }

    function collapseAll() {
      areAllPostsCollapsed.value = true;
      localStorage.setItem('areAllPostsCollapsed', 'true');
    }

    function expandAll() {
      areAllPostsCollapsed.value = false;
      localStorage.setItem('areAllPostsCollapsed', 'false');
    }

    function handleYearCheckBoxCheck() {
      const amountOfCheckBoxes = document.getElementsByClassName('year-checkbox').length;
      allYearsCheckbox.value.checked = allowedYears.value.length >= amountOfCheckBoxes;
      allYearsCheckbox.value.indeterminate =
        allowedYears.value.length > 0 && allowedYears.value.length < amountOfCheckBoxes;
    }

    function handleAllYearsCheckBoxCheck(isChecked: boolean) {
      const checkBoxes = document.getElementsByClassName('year-checkbox') as HTMLCollectionOf<HTMLInputElement>;
      for (const checkbox of checkBoxes) {
        checkbox.checked = isChecked;
      }
    }

    function filterNewsPostsBySearch(filteredNewsPosts: NewsPost[]) {
      filteredNews.value = filteredNewsPosts;
      filterNewsPostsByYear();
    }

    function filterNewsPostsByYear() {
      const newsPosts = document.getElementsByClassName('news-post') as HTMLCollectionOf<HTMLElement>;
      for (const post of newsPosts) {
        const date = post.getElementsByTagName('time')[0] as HTMLTimeElement;
        const year = +date.innerText.split('.')[2];
        if (allowedYears.value.includes(year)) {
          post.style.display = 'block';
        } else {
          post.style.display = 'none';
        }
      }
    }

    function copyNewsPostsAsJSONToClipboard() {
      const el = document.createElement('textarea');
      el.value = JSON.stringify(news);
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
    }

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
      allowedYears,
      isAdmin,
      allYearsCheckbox,
      areAllPostsCollapsed,
      getYearsFrom2019ToNow,
      collapseAll,
      expandAll,
      handleYearCheckBoxCheck,
      handleAllYearsCheckBoxCheck,
      filterNewsPostsBySearch,
      filterNewsPostsByYear,
      copyNewsPostsAsJSONToClipboard,
      push
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

  .options {
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

    .options {
      width: 80%;
      max-width: 50em;
      margin: 15px auto;
    }

    .content {
      width: 100%;
      margin: 15px auto;
    }
  }
}
</style>
