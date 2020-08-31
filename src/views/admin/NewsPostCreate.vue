<template>
  <div class="news-post-create">
    <StatusMessage
      v-if="showStatus"
      @hide="showStatus = false"
      :message="statusMessage"
      :messageType="statusMessageType"
      :showMessage="showStatus"
    />

    <h2>Create news post</h2>

    <NewsPostWritingAreaMarkdown
      v-model:title="title"
      :originalBody="originalBody"
      v-model:date="date"
      @body-changed="updateBody"
    />
    <button @click="handleCreateNewsPost()" class="submit-btn">
      Save
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import NewsPostWritingAreaMarkdown from '@/components/admin/NewsPostWritingAreaMarkdown.vue';
import StatusMessage from './StatusMessage.vue';

import { createNewsPost } from './actions/createNewsPost';
import router from '../../router';

export default defineComponent({
  name: 'NewsPostCreate',
  components: {
    NewsPostWritingAreaMarkdown,
    StatusMessage
  },

  data() {
    return {
      originalBody: '',
      id: '',
      title: '',
      body: '',
      date: new Date().toISOString().slice(0, 10),
      statusMessage: '',
      statusMessageType: '',
      showStatus: false,
      released: false
    };
  },

  methods: {
    updateBody(body: string) {
      this.body = body;
    },

    async handleCreateNewsPost() {
      try {
        const data = await createNewsPost(this.title, this.body, this.date);
        this.displayStatus(`Successfully created news post`, 'Success');
        this.released = true;
        setTimeout(() => {
          router.push('/news');
        }, 1000);
      } catch (error) {
        this.displayStatus(error.message, 'Error');
      }
    },

    displayStatus(message: string, messageType: string) {
      this.statusMessage = message;
      this.statusMessageType = messageType;
      this.showStatus = true;
    },

    formatDate(date: string) {
      return date
        .slice(0, 10)
        .split('-')
        .reverse()
        .join('.');
    },

    preventNav(event: any) {
      event.preventDefault();
      event.returnValue = '';
    }
  },

  beforeRouteLeave(route: any, redirect: any, next: any) {
    if (!this.released && !window.confirm("Are you sure you want to leave? You haven't released this post yet!")) {
      return;
    }
    next();
  },

  beforeMount() {
    window.addEventListener('beforeunload', this.preventNav);
  },

  beforeUnmount() {
    window.removeEventListener('beforeunload', this.preventNav);
  }
});
</script>

<style lang="scss">
.news-post-create {
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
  }
  .submit-btn:hover {
    opacity: 0.9;
    border-radius: 10px;
  }
}
</style>
