<template>
  <div class="news-post-create">
    <StatusMessage
      v-if="showStatus"
      @hide="showStatus = false"
      :message="statusMessage"
      :messageType="statusMessageType"
      :showMessage="showStatus"
    />

    <div class="side-by-side-view">
      <NewsPostMarkdownEditor
        v-model:title="newsPost.title"
        v-model:date="newsPost.date"
        @change-tags="updateTags"
        @change-body="updateBody"
      />
      <MarkdownPreview
        :title="newsPost.title"
        :tags="newsPost.tags"
        :bodyAsHTML="newsPost.bodyAsHTML"
        :date="newsPost.date"
      />
    </div>

    <button @click="handleCreateNewsPost()" class="submit-btn">
      Save
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, onBeforeUnmount, reactive, ref } from 'vue';

import NewsPostMarkdownEditor from '@/components/admin/NewsPostMarkdownEditor.vue';
import MarkdownPreview from '@/components/admin/MarkdownPreview.vue';
import StatusMessage from './StatusMessage.vue';

import { createNewsPost } from './actions/createNewsPost';
import router from '../../router';
import { NewsPost } from '@/interfaces/NewsPost';
import { onBeforeRouteLeave, RouteLocationNormalized } from 'vue-router';

export default defineComponent({
  name: 'NewsPostCreate',

  components: {
    NewsPostMarkdownEditor,
    MarkdownPreview,
    StatusMessage
  },

  setup() {
    const newsPost = reactive<NewsPost>({
      id: 0,
      tags: [],
      title: '',
      bodyAsMarkdown: '',
      bodyAsHTML: '',
      date: new Date().toISOString().slice(0, 10)
    });

    const statusMessage = ref('');
    const statusMessageType = ref('');
    const showStatus = ref(false);
    const released = ref(false);

    function updateTags(tags: string[]) {
      newsPost.tags = tags;
    }

    function updateBody(markdown: string, html: string) {
      newsPost.bodyAsMarkdown = markdown;
      newsPost.bodyAsHTML = html;
    }

    async function handleCreateNewsPost() {
      try {
        await createNewsPost(newsPost);
        displayStatus(`Successfully created news post`, 'Success');
        released.value = true;
        setTimeout(() => {
          router.push('/news');
        }, 1000);
      } catch (error) {
        displayStatus(error.message, 'Error');
      }
    }

    function displayStatus(message: string, messageType: string) {
      statusMessage.value = message;
      statusMessageType.value = messageType;
      showStatus.value = true;
    }

    function preventNav(event: Event) {
      event.preventDefault();
      event.returnValue = false;
    }

    onBeforeRouteLeave((route: RouteLocationNormalized, redirect: RouteLocationNormalized, next: Function) => {
      if (!released.value && !window.confirm("Are you sure you want to leave? You haven't released this post yet!")) {
        return;
      }
      next();
    });

    onBeforeMount(() => window.addEventListener('beforeunload', preventNav));

    onBeforeUnmount(() => window.removeEventListener('beforeunload', preventNav));

    return {
      newsPost,
      statusMessage,
      statusMessageType,
      showStatus,
      released,
      updateTags,
      updateBody,
      handleCreateNewsPost
    };
  }
});
</script>

<style scoped lang="scss">
.news-post-create {
  padding-top: 66px;

  .side-by-side-view {
    width: 100%;
    display: flex;
  }

  .submit-btn {
    margin: 20px;
    height: 40px;
    min-width: 10%;
    width: auto;
    border-radius: var(--border-radius);
    background-color: var(--color-primary);
    color: white;
    transition: 0.2s;
    outline: none;
    border: none;
    overflow: hidden;
    box-sizing: border-box;
    font-size: 18px;
    font-weight: bold;
    position: relative;
    &:hover {
      opacity: 0.9;
      border-radius: 10px;
    }
  }
}
</style>
