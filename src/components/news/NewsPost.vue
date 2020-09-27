<template>
  <div class="news-post" v-if="!isDeleted">
    <div class="top-container">
      <router-link
        v-if="isAdmin"
        :to="`/news/${newsPost.id}`"
        :title="`Go to news post #${newsPost.id}`"
        class="news-post-id"
        >#{{ newsPost.id }}</router-link
      >
      <div class="header-container">
        <h1 class="news-post-title">{{ newsPost.title }}</h1>
        <div class="tags">
          <span
            v-for="(tag, index) in newsPost.tags"
            :key="index"
            :style="{ backgroundColor: getTagByName(tag).backgroundColor, color: getTagByName(tag).textColor }"
            class="tag"
            >{{ tag }}</span
          >
        </div>
      </div>

      <div class="toolbar">
        <button @click="copyLink" title="Copy link to clipboard">
          <i @click="copyLink" class="material-icons">link</i>
        </button>
        <button v-if="canCollapse" @click="isCollapsed = !isCollapsed" class="toggle-collapse-button">
          <i v-if="isCollapsed" class="material-icons" title="expand">
            expand_more
          </i>
          <i v-if="!isCollapsed" class="material-icons" title="collapse">
            expand_less
          </i>
        </button>
        <div v-if="isAdmin" class="admin-tools">
          <router-link
            v-if="newsPost.id"
            :to="{
              path: '/admin/edit-news-post',
              name: 'EditNewsPost',
              params: {
                id: newsPost.id
              }
            }"
          >
            <i class="material-icons">edit</i>
          </router-link>
          <button @click="handleDeleteNewsPost()">
            <i class="material-icons">delete</i>
          </button>
        </div>
      </div>
    </div>

    <div
      v-html="newsPost.bodyAsHTML"
      :style="[!isCollapsed ? { height: computedBodyHeight } : {}]"
      class="news-post-body"
      ref="newsPostBodyContainer"
    ></div>
    <time :datetime="newsPost.date" class="news-post-date">{{ formatDate(newsPost.date) }}</time>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, onMounted } from 'vue';
import { useStore } from 'vuex';

import { useNewsPostTags } from '@/composables/news/useNewsPostTags';
import { deleteNewsPost } from '@/views/admin/actions/deleteNewsPost';
import { NewsPost } from '@/interfaces/NewsPost';
import { formatDate } from '@/views/admin/actions/formatDate';
import { useCodeHighlighter } from '@/composables/useCodeHighlighter';

export default defineComponent({
  name: 'NewsPost',

  props: {
    newsPost: {
      type: Object as () => NewsPost,
      required: true
    },
    canCollapse: Boolean,
    areAllCollapsed: Boolean
  },

  setup(props) {
    const isAdmin: boolean = useStore().state.isAdmin;
    const isCollapsed = ref(false);
    const showStatus = ref(false);
    const isDeleted = ref(false);
    const statusMessage = ref('');
    const statusMessageType = ref('');
    const newsPostBodyContainer = ref<HTMLDivElement>(null!);
    const computedBodyHeight = ref('0');

    const { getTagByName } = useNewsPostTags();
    const { highlightAllInElement } = useCodeHighlighter();

    function initBodyHeight() {
      newsPostBodyContainer.value.style.height = 'auto';
      newsPostBodyContainer.value.style.position = 'absolute';
      newsPostBodyContainer.value.style.visibility = 'hidden';
      newsPostBodyContainer.value.style.display = 'block';

      const height = getComputedStyle(newsPostBodyContainer.value).height;
      computedBodyHeight.value = height;

      newsPostBodyContainer.value.style.position = 'relative';
      newsPostBodyContainer.value.style.visibility = 'visible';
      newsPostBodyContainer.value.style.display = 'block';
      newsPostBodyContainer.value.style.height = '0';
    }

    function copyLink() {
      const dummy = document.createElement('input') as HTMLInputElement;
      document.body.appendChild(dummy);
      dummy.value = 'https://gamitopia.herokuapp.com/news/' + props.newsPost.id?.toString();
      dummy.select();
      document.execCommand('copy');
      document.body.removeChild(dummy);
    }

    async function handleDeleteNewsPost() {
      if (!window.confirm('Are you sure you want to delete this news post?')) {
        return;
      }
      try {
        if (props.newsPost.id) {
          await deleteNewsPost(+props.newsPost.id);
          displayStatus(`Successfully deleted #${props.newsPost.id} news post`, 'Success');
          isDeleted.value = true;
        }
      } catch (error) {
        displayStatus(error.message, 'Error');
      }
    }

    function displayStatus(message: string, messageType: string) {
      statusMessage.value = message;
      statusMessageType.value = messageType;
      showStatus.value = true;
    }

    watch(isCollapsed, (newIsCollapsed) => {
      if (!newIsCollapsed && newsPostBodyContainer.value.style.height !== computedBodyHeight.value) {
        highlightAllInElement(newsPostBodyContainer.value);
        setTimeout(() => {
          computedBodyHeight.value = newsPostBodyContainer.value.scrollHeight + 'px';
        }, 1500);
      }
    });

    watch(
      () => props.areAllCollapsed,
      (newAreAllCollapsed) => {
        if (newAreAllCollapsed !== undefined) {
          isCollapsed.value = newAreAllCollapsed;
        }
      }
    );

    watch(
      () => props.newsPost.bodyAsHTML,
      () => {
        setTimeout(() => {
          if (!isCollapsed.value && newsPostBodyContainer.value) {
            highlightAllInElement(newsPostBodyContainer.value);
          }
        }, 0);
      }
    );

    onMounted(() => {
      initBodyHeight();
      if (props.areAllCollapsed) {
        isCollapsed.value = true;
      }
      if (!isCollapsed.value) {
        highlightAllInElement(newsPostBodyContainer.value);
        setTimeout(() => {
          if (newsPostBodyContainer.value !== null) {
            computedBodyHeight.value = newsPostBodyContainer.value.scrollHeight + 'px';
          }
        }, 1500);
      }
    });

    return {
      isAdmin,
      isDeleted,
      isCollapsed,
      computedBodyHeight,
      newsPostBodyContainer,
      copyLink,
      handleDeleteNewsPost,
      formatDate,
      getTagByName
    };
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
  border-radius: var(--border-radius);
  position: relative;
  white-space: pre-line;
  overflow: hidden;

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

    .header-container,
    .toolbar {
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

    .header-container {
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
      margin-right: 30px;

      .tags {
        .tag {
          display: inline-block;
          padding: 5px;
          margin-right: 5px;
          margin-top: 5px;
          border-radius: var(--border-radius);
        }
      }
    }

    .toolbar {
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
    white-space: pre-wrap;

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      margin: 0;
    }

    img {
      width: 75%;
      max-width: 400px;
      margin: 10px auto;
      border-radius: var(--border-radius);
    }

    blockquote {
      border-left: 3px white solid;
      margin-left: 0;
      padding-left: 1.25rem;
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
      padding: 0 10px;
      border-radius: var(--border-radius);
      background-color: var(--color-light);
      margin: auto;

      li,
      li p {
        color: black;
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
