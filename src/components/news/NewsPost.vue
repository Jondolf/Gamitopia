<template>
  <div class="news-post" v-if="!isDeleted">
    <p v-if="isAdmin" class="news-post-id">#{{ id }}</p>

    <div v-if="isAdmin" class="admin-tools">
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

    <h2 class="news-post-title">{{ title }}</h2>
    <div v-html="body" class="news-post-body" ref="newsPostBody">
      {{ body }}
    </div>
    <time :datetime="date" class="news-post-date">{{ date }}</time>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import axios from 'axios';
import hljs from 'highlight.js';

import { deleteNewsPost } from '@/views/admin/actions/deleteNewsPost';

import globalVariables from '@/global.variables';

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
      isAdmin: globalVariables.isAdmin,
      isDeleted: false,
      statusMessage: '',
      statusMessageType: '',
      showStatus: false
    };
  },

  methods: {
    async handleDeleteNewsPost() {
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
    body.querySelectorAll('pre code').forEach(block => {
      hljs.highlightBlock(block);
    });
  },

  mounted() {
    const body = this.$refs.newsPostBody as HTMLElement;
    body.querySelectorAll('pre code').forEach(block => {
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

  li p {
    display: inline;
  }

  .news-post-id {
    position: absolute;
    top: 5px;
    left: 5px;
    color: rgb(200, 200, 200);
  }
  .admin-tools {
    position: absolute;
    top: 5px;
    right: 5px;
    button,
    a {
      background-color: rgba(0, 0, 0, 0);
      outline: none;
      border: none;
      margin-left: 30px;
      i {
        color: white;
        font-size: 25px;
        transition: 0.4s;
      }
      i:hover {
        color: rgb(200, 200, 255);
      }
    }
  }

  h2 {
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

.darkMode .news-post ul li,
.darkMode .news-post ul li p,
.darkMode .news-post ol li,
.darkMode .news-post ol li p {
  color: white;
}

.darkMode .news-post a {
  font-weight: bolder;
  font-style: italic;

  color: red;
}

.darkMode .news-post .admin-tools button i:hover,
.darkMode .news-post .admin-tools a i:hover {
  color: red;
}

.darkMode .news-post .news-post-id {
  color: rgb(122, 122, 122);
}
</style>
