<template>
  <div class="news-post" v-if="!isDeleted">
    <div class="top-container">
      <router-link
        v-if="isAdmin"
        :to="`/news/${id}/`"
        :title="`Go to news post #${id}`"
        class="news-post-id"
        >#{{ id }}</router-link
      >
      <div class="left-container">
        <button @click="copyLink" title="Copy link to clipboard">
          <i @click="copyLink" class="material-icons">link</i>
        </button>
        <h1 class="news-post-title">{{ title }}</h1>
      </div>

      <div class="right-container">
        <button
          v-if="canCollapse"
          @click="isCollapsed = !isCollapsed"
          class="toggle-collapse-button"
        >
          <i v-if="isCollapsed" class="material-icons" title="expand">
            expand_more
          </i>
          <i v-if="!isCollapsed" class="material-icons" title="collapse">
            expand_less
          </i>
        </button>
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
          <button @click="handleDeleteNewsPost(id)">
            <i class="material-icons">delete</i>
          </button>
        </div>
      </div>
    </div>

    <div
      v-html="body"
      :style="[!isCollapsed ? { height: computedBodyHeight } : {}]"
      class="news-post-body"
      ref="newsPostBody"
    >
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
    date: String,
    canCollapse: Boolean,
    areAllCollapsed: Boolean
  },

  data() {
    return {
      isAdmin: this.$store.state.isAdmin,
      isDeleted: false,
      statusMessage: '',
      statusMessageType: '',
      showStatus: false,
      computedBodyHeight: '0',
      isCollapsed: false
    };
  },

  methods: {
    initBodyHeight() {
      const body = this.$refs.newsPostBody as HTMLElement;
      body.style.height = 'auto';
      body.style.position = 'absolute';
      body.style.visibility = 'hidden';
      body.style.display = 'block';

      const height = getComputedStyle(body).height;
      this.computedBodyHeight = height;

      body.style.position = 'relative';
      body.style.visibility = 'visible';
      body.style.display = 'block';
      body.style.height = '0';
    },

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

  watch: {
    isCollapsed() {
      const body = this.$refs.newsPostBody as HTMLElement;
      if (!this.isCollapsed && body.style.height !== this.computedBodyHeight) {
        setTimeout(() => {
          const body = this.$refs.newsPostBody as HTMLElement;
          this.computedBodyHeight = body.scrollHeight + 'px';
        }, 1500);
      }
    },

    areAllCollapsed() {
      if (this.areAllCollapsed) {
        this.isCollapsed = true;
      } else {
        this.isCollapsed = false;
        setTimeout(() => {
          const body = this.$refs.newsPostBody as HTMLElement;
          this.computedBodyHeight = body.scrollHeight + 'px';
        }, 1500);
      }
    }
  },

  updated() {
    if (!this.isCollapsed) {
      const body = this.$refs.newsPostBody as HTMLElement;
      body.querySelectorAll('code').forEach((block) => {
        hljs.highlightBlock(block);
      });
    }
  },

  mounted() {
    this.initBodyHeight();
    if (this.areAllCollapsed) {
      this.isCollapsed = true;
    }
    if (!this.isCollapsed) {
      const body = this.$refs.newsPostBody as HTMLElement;
      body.querySelectorAll('code').forEach((block) => {
        hljs.highlightBlock(block);
      });
      setTimeout(() => {
        this.computedBodyHeight = body.scrollHeight + 'px';
      }, 1500);
    }
  }
});
</script>

<style lang="scss">
.news-post {
  width: 70%;
  background-color: var(--color-primary);
  color: white;
  margin: 20px auto;
  padding: 30px;
  text-align: left;
  border-radius: 5px;
  position: relative;
  white-space: pre-line;
  overflow: hidden;

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
    .news-post-id {
      position: absolute;
      left: 5px;
      top: 5px;
      background-color: transparent;
      outline: none;
      border: none;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-left: 25px;
      color: white;
      font-size: 20px;
      width: 40px;
      height: 40px;
      transition: 0.75s;
      border-radius: 25%;
      font-weight: 200;
      &:hover {
        color: rgb(200, 200, 255);
        background-color: rgba(255, 255, 255, 0.5);
        border-radius: 50%;
      }
    }

    .left-container,
    .right-container {
      display: flex;
      align-items: center;

      button,
      a {
        background-color: transparent;
        outline: none;
        border: none;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-left: 25px;
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
        a {
          height: 100%;
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
      margin-right: 30px;
    }
    .right-container {
      justify-content: flex-end;
      position: absolute;
      top: 30px;
      right: 20px;
      .admin-tools {
        display: flex;
        align-items: center;
        button,
        a:first-child {
          margin-left: 25px;
        }
      }
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
    height: 0;
    overflow: hidden;
    transition: 1.5s;
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
      background-color: var(--color-light);
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

.dark.default-dark .news-post a:hover {
  font-style: italic;
  color: red;
}

.dark.default-dark .news-post .top-container div button i:hover,
.dark.default-dark .news-post .top-container div a i:hover {
  color: red;
}
</style>
