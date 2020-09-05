<template>
  <div class="news-post-edit">
    <StatusMessage
      v-if="showStatus"
      @hide="showStatus = false"
      :message="statusMessage"
      :messageType="statusMessageType"
      :showMessage="showStatus"
    />

    <h2>Edit news post</h2>

    <NewsPostWritingArea
      v-model:title="newsPost.title"
      v-model:date="newsPost.date"
      :originalTags="originalTags"
      :originalBodyAsMarkdown="originalBodyAsMarkdown"
      :originalBodyAsHTML="originalBodyAsHTML"
      @change-tags="updateTags"
      @change-body="updateBody"
    />

    <button @click="handleEditNewsPost()" class="submit-btn">
      Save
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, onBeforeUnmount, onMounted, reactive, ref } from 'vue';

import NewsPostWritingArea from '@/components/admin/NewsPostWritingArea.vue';
import StatusMessage from './StatusMessage.vue';

import { getNewsPost } from './actions/getNewsPost';
import { editNewsPost } from './actions/editNewsPost';

import { NewsPost } from '@/interfaces/NewsPost';
import { onBeforeRouteLeave, RouteLocationNormalized, useRoute } from 'vue-router';

export default defineComponent({
  name: 'NewsPostEdit',

  components: {
    NewsPostWritingArea,
    StatusMessage
  },

  setup() {
    const newsPost = reactive<NewsPost>({
      id: '0',
      tags: [],
      title: '',
      bodyAsMarkdown: '',
      bodyAsHTML: '',
      date: new Date().toISOString().slice(0, 10)
    });
    const originalTags = ref<string[]>([]);
    const originalBodyAsMarkdown = ref('');
    const originalBodyAsHTML = ref('');

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

    async function handleGetNewsPost() {
      try {
        const data = await getNewsPost(newsPost.id?.toString()!);
        newsPost.id = data.id;
        newsPost.tags = data.tags;
        newsPost.title = data.title;
        newsPost.bodyAsMarkdown = data.bodyAsMarkdown;
        newsPost.bodyAsHTML = data.bodyAsHTML;
        newsPost.date = new Date(data.date).toISOString().slice(0, 10);
        originalTags.value = data.tags;
        originalBodyAsMarkdown.value = data.bodyAsMarkdown;
        originalBodyAsHTML.value = data.bodyAsHTML;
      } catch (error) {
        displayStatus(error.message, 'Error');
      }
    }

    async function handleEditNewsPost() {
      try {
        await editNewsPost(newsPost);
        displayStatus(`Successfully edited #${newsPost.id} news post`, 'Success');
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
      if (!released.value && !window.confirm('Are you sure you want to leave? All unsaved data will be lost.')) {
        return;
      }
      next();
    });

    onBeforeMount(() => window.addEventListener('beforeunload', preventNav));

    onMounted(async () => {
      if (newsPost.id) {
        newsPost.id = useRoute().params.id.toString();
        await handleGetNewsPost();
      }
    });

    onBeforeUnmount(() => window.removeEventListener('beforeunload', preventNav));

    return {
      newsPost,
      originalTags,
      originalBodyAsMarkdown,
      originalBodyAsHTML,
      statusMessage,
      statusMessageType,
      showStatus,
      released,
      updateTags,
      updateBody,
      handleEditNewsPost
    };
  }
});
</script>

<style scoped lang="scss">
.news-post-edit {
  padding-top: 66px;

  h2 {
    margin: 30px auto;
    color: var(--color-light-contrast);
  }

  .submit-btn {
    margin: 20px;
    height: 40px;
    min-width: 10%;
    width: auto;
    border-radius: 5px;
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
