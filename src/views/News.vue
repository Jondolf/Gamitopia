<template>
  <div id="news">
    <h1 class="page-title-header">News</h1>
    <router-link to="/admin/create-news-post/" v-if="isAdmin"
      ><button class="create-news-post-button">Create news post</button>
    </router-link>
    <button
      v-if="isAdmin"
      @click="copyNewsPostsAsJSONToClipboard()"
      class="copy-news-posts-as-json-button"
    >
      Copy news posts as JSON
    </button>

    <div class="options">
      <div class="top-container">
        <div class="collapse-expand-container">
          <button @click="collapseAll">Collapse all</button>
          <button @click="expandAll">Expand all</button>
        </div>

        <div class="year-selection-container">
          <div class="all-years-checkbox-container">
            <input
              type="checkbox"
              checked
              @click="
                allowedYears = ($event.target.checked
                  ? getAllYears()
                  : []
                ).sort();
                handleAllYearsCheckBoxCheck($event.target.checked);
                filterNewsPostsByYear();
              "
              name="allYears"
              id="allYears"
              ref="allYearsCheckbox"
            />
            <label for="allYears">All</label>
          </div>

          <div
            v-for="index in new Date().getFullYear() - 2019 + 1"
            :key="index"
            class="checkbox-container"
          >
            <input
              type="checkbox"
              checked
              @change="
                allowedYears = allowedYears.sort();
                allowedYears.includes(2019 + index - 1)
                  ? allowedYears.splice(
                      allowedYears.indexOf(2019 + index - 1),
                      1
                    )
                  : allowedYears.push(2019 + index - 1);
                allowedYears = allowedYears.sort();
                handleYearCheckBoxCheck();
                filterNewsPostsByYear();
              "
              :name="`year${2019 + index - 1}`"
              :id="`year${2019 + index - 1}`"
              class="year-checkbox"
            />
            <label :for="`year${2019 + index - 1}`">{{
              2019 + index - 1
            }}</label>
          </div>
        </div>
      </div>

      <NewsSearch
        @filter-news="
          (filteredNewsPosts) => {
            filteredNews = filteredNewsPosts;
            filterNewsPostsByYear();
          }
        "
        :newsPosts="news"
        :isCaseSensitive="false"
        placeholderText="Type in the name of the news post"
      />
    </div>

    <div class="news-posts-container">
      <NewsPost
        v-for="newsPost in filteredNews"
        :key="newsPost.id"
        :id="newsPost.id"
        :title="newsPost.title"
        :body="newsPost.body"
        :date="formatDate(newsPost.date)"
        :canCollapse="true"
        :areAllCollapsed="areAllPostsCollapsed"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useStore } from 'vuex';

import NewsSearch from '@/components/news/NewsSearch.vue';
import NewsPost from '@/components/news/NewsPost.vue';

import { getNewsPosts } from './admin/actions/getNewsPosts';
import { formatDate } from './admin/actions/formatDate';
import { News } from '../interfaces/News';

export default defineComponent({
  name: 'News',

  components: {
    NewsSearch,
    NewsPost
  },

  data() {
    return {
      news: [] as News[],
      filteredNews: [] as News[],
      allowedYears: [2020, 2019],
      areAllPostsCollapsed: false,
      isAdmin: useStore().state.isAdmin
    };
  },

  methods: {
    collapseAll() {
      this.areAllPostsCollapsed = true;
      localStorage.setItem('areAllPostsCollapsed', 'true');
    },

    expandAll() {
      this.areAllPostsCollapsed = false;
      localStorage.setItem('areAllPostsCollapsed', 'false');
    },

    getAllYears(): number[] {
      const currentYear = new Date().getFullYear();
      const years = [];
      for (let i = 2019; i <= currentYear; i++) {
        years.push(i);
      }
      return years;
    },

    handleYearCheckBoxCheck() {
      const amountOfCheckBoxes = document.getElementsByClassName(
        'year-checkbox'
      ).length;
      const allYearsCheckbox = this.$refs.allYearsCheckbox as HTMLInputElement;
      allYearsCheckbox.checked = this.allowedYears.length >= amountOfCheckBoxes;
      allYearsCheckbox.indeterminate =
        this.allowedYears.length > 0 &&
        this.allowedYears.length < amountOfCheckBoxes;
    },

    handleAllYearsCheckBoxCheck(isChecked: boolean) {
      const checkBoxes = document.getElementsByClassName(
        'year-checkbox'
      ) as HTMLCollectionOf<HTMLInputElement>;
      for (const checkbox of checkBoxes) {
        checkbox.checked = isChecked;
      }
    },

    filterNewsPostsByYear() {
      const newsPosts = document.getElementsByClassName(
        'news-post'
      ) as HTMLCollectionOf<HTMLElement>;
      for (const post of newsPosts) {
        const date = post.getElementsByTagName('time')[0] as HTMLTimeElement;
        const year = +date.innerText.split('.')[2];
        if (this.allowedYears.includes(year)) {
          post.style.display = 'block';
        } else {
          post.style.display = 'none';
        }
      }
    },

    copyNewsPostsAsJSONToClipboard() {
      const el = document.createElement('textarea');
      el.value = JSON.stringify(this.news);
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
    },

    formatDate
  },

  created() {
    if (localStorage.getItem('areAllPostsCollapsed')) {
      this.areAllPostsCollapsed = JSON.parse(
        localStorage.getItem('areAllPostsCollapsed')!
      );
    }
  },

  async mounted() {
    this.news = await getNewsPosts();
    this.filteredNews = this.news;
  }
});
</script>

<style lang="scss">
h1.page-title-header {
  color: var(--color-light-contrast);
  text-align: center;
  padding: 10px 0;
}

a {
  &:visited {
    color: white;
  }
  &:hover {
    color: rgb(200, 200, 255);
  }
}

#news {
  padding-top: 86px;

  .create-news-post-button,
  .copy-news-posts-as-json-button {
    padding: 10px;
    margin-bottom: 20px;
    border: none;
    border-radius: 5px;
    opacity: none;
    color: white;
    background-color: var(--color-primary);
    transition: 0.4s;
    &:hover {
      border-radius: 10px;
    }
  }

  .create-news-post-button {
    margin-right: 10px;
  }

  .options {
    width: 70%;
    padding: 30px;
    border-radius: 5px;
    text-align: left;
    background-color: var(--color-primary);
    margin: auto;

    .top-container {
      display: flex;
      padding-bottom: 15px;

      .collapse-expand-container {
        width: 50%;
        margin-right: 15px;
        display: flex;
        flex-direction: column;
        align-items: center;

        button {
          background-color: var(--color-light);
          color: var(--color-light-contrast);
          width: 100%;
          padding: 10px 0 10px 0;
          border: none;
          outline: none;
          margin-top: 10px;
          border-radius: 5px;
          transition: 0.4s;
          &:hover {
            padding: 15px;
          }
          &:first-child {
            margin: 0;
          }
        }
      }

      .year-selection-container {
        width: 50%;
        margin-left: 15px;
        display: flex;
        flex-direction: column;

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
  }

  .news-posts-container {
    display: flex;
    flex-direction: column-reverse;
  }
}
</style>
