<template>
  <div class="news-post" v-if="!isDeleted">
    <div class="top-container">
      <div class="left-container">
        <router-link
          v-if="isAdmin"
          :to="`/news/${id}`"
          :title="`Go to news post #${id}`"
          >#{{ id }}</router-link
        >
        <button @click="copyLink" title="Copy link to clipboard">
          <i @click="copyLink" class="material-icons">link</i>
        </button>
      </div>

      <div v-if="isAdmin" class="admin-tools right-container">
        <router-link
          :to="{
            path: '/admin/edit-news-post',
            name: 'edit-news-post',
            params: {
              id: id
            }
          }"
        >
          <i class="material-icons">edit</i>
        </router-link>
        <button v-on:click="handleDeleteNewsPost(id)">
          <i class="material-icons">delete</i>
        </button>
      </div>
    </div>

    <h1 class="news-post-title">{{ title }}</h1>
    <div v-html="body" class="news-post-body" ref="newsPostBody">
      {{ body }}
    </div>
    <time :datetime="date" class="news-post-date">{{ date }}</time>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
// @ts-ignore
import hljs from 'highlight.js/lib/core';
// @ts-ignore
import xml from 'highlight.js/lib/languages/xml'; // Didn't find HTML so I use XML here
// @ts-ignore
import scss from 'highlight.js/lib/languages/scss';
// @ts-ignore
import typescript from 'highlight.js/lib/languages/typescript';
hljs.registerLanguage('xml', xml);
hljs.registerLanguage('scss', scss);
hljs.registerLanguage('typescript', typescript);

import { deleteNewsPost } from '@/views/admin/actions/deleteNewsPost';

export default Vue.extend({
  name: 'news-post',

  props: {
    id: Number,
    title: String,
    body: String,
    date: String
  },

  data() {
    return {
      isAdmin: this.$store.state.isAdmin,
      isDeleted: false,
      statusMessage: '',
      statusMessageType: '',
      showStatus: false
    };
  },

  methods: {
    copyLink() {
      const dummy = document.createElement('input') as HTMLInputElement;
      document.body.appendChild(dummy);
      dummy.value =
        'https://gamitopia.herokuapp.com/news/' + this.id.toString();
      dummy.select();
      document.execCommand('copy');
      document.body.removeChild(dummy);
    },

    async handleDeleteNewsPost() {
      if (!window.confirm('Are you sure you want to delete this news post?')) {
        return;
      }
      try {
        await deleteNewsPost(this.id);
        this.displayStatus(
          `Successfully deleted #${this.id} news post`,
          'Success'
        );
        this.isDeleted = true;
      } catch (error) {
        this.displayStatus(error.message, 'Error');
      }
    },

    displayStatus(message: string, messageType: string) {
      this.statusMessage = message;
      this.statusMessageType = messageType;
      this.showStatus = true;
    }
  },

  updated() {
    const body = this.$refs.newsPostBody as HTMLElement;
    body.querySelectorAll('code').forEach((block) => {
      hljs.highlightBlock(block);
    });
  },

  mounted() {
    const body = this.$refs.newsPostBody as HTMLElement;
    body.querySelectorAll('code').forEach((block) => {
      hljs.highlightBlock(block);
    });
  }
});
</script>

<style lang="scss">
.news-post {
  width: 70%;
  background-color: var(--secondary-color);
  color: white;
  margin: 20px auto;
  padding: 30px;
  text-align: left;
  border-radius: 5px;
  position: relative;
  white-space: pre-line;

  h1 {
    font-size: 26px;
    margin: 12px 0 7px 0;
  }

  h2 {
    font-size: 22px;
    margin: 10px 0 5px 0;
  }

  h3 {
    font-size: 18px;
    margin: 8px 0 3px 0;
  }

  li p {
    display: inline;
  }

  hr {
    margin: 15px auto;
  }

  .top-container {
    display: flex;
    justify-content: space-between;

    .left-container,
    .right-container {
      display: flex;
      align-items: center;
      width: 50%;

      button,
      a {
        background-color: transparent;
        outline: none;
        border: none;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-left: 30px;
        color: white;
        font-size: 20px;
        width: 40px;
        height: 40px;
        transition: 0.75s;
        border-radius: 25%;
        font-weight: 200;
        &:hover {
          background-color: rgba(255, 255, 255, 0.5);
          border-radius: 50%;
        }
        &:first-child {
          margin-left: 0;
        }
        i {
          color: white;
          font-size: 25px;
          transition: 0.4s;
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          &:hover {
            color: rgb(200, 200, 255);
          }
        }
      }
    }
    .left-container {
      justify-content: flex-start;
    }
    .right-container {
      justify-content: flex-end;
    }
  }

  .news-post-title {
    font-size: 30px;
    margin: 0;
  }

  .news-post-body {
    margin-top: 15px;
    margin-bottom: 15px;
    line-height: 1.5rem;
    img {
      width: 75%;
      max-width: 400px;
      margin: 10px auto;
      border-radius: 5px;
    }

    a {
      font-weight: bolder;
      font-style: italic;
    }

    ul {
      list-style: inside square;
      li ul {
        list-style: inside circle;
      }
    }
    ol {
      list-style: inside decimal;
      li ol {
        list-style: inside lower-latin;
      }
    }

    ul,
    ol {
      padding: 10px;
      border-radius: 5px;
      background-color: var(--primary-color);
      margin: 15px auto;
      li,
      li p {
        color: black;
      }
      li[data-type='todo_item'] {
        line-height: 0;
      }
      li ul,
      li ol {
        margin: 0;
        padding: 0 0 0 15px;
      }
    }
  }
}

.dark.default-dark .news-post ul li,
.dark.default-dark .news-post ul li p,
.dark.default-dark .news-post ol li,
.dark.default-dark .news-post ol li p {
  color: white;
}

.dark.default-dark .news-post a {
  font-weight: bolder;
  font-style: italic;

  color: red;
}

.dark.default-dark .news-post .top-container div button i:hover,
.dark.default-dark .news-post .top-container div a i:hover {
  color: red;
}

.dark.default-dark .news-post .news-post-id {
  color: rgb(122, 122, 122);
}
</style>
