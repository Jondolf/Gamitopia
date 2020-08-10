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
      v-model:title="title"
      :originalBody="originalBody"
      v-model:date="date"
      @body-changed="updateBody"
    />
    <button @click="handleEditNewsPost()" class="submit-btn">
      Save
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

const NewsPostWritingArea = () =>
  import('@/components/admin/NewsPostWritingArea.vue');
import StatusMessage from './StatusMessage.vue';

import { getNewsPost } from './actions/getNewsPost';
import { editNewsPost } from './actions/editNewsPost';

export default defineComponent({
  name: 'NewsPostEdit',
  components: {
    NewsPostWritingArea,
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
      showStatus: false
    };
  },

  methods: {
    updateBody(body: string) {
      this.body = body;
    },

    async handleGetNewsPost() {
      try {
        const newsPost = await getNewsPost(this.id);
        this.title = newsPost.title;
        this.body = newsPost.body;
        this.date = newsPost.date.slice(0, 10);
        this.originalBody = this.body;
      } catch (error) {
        this.displayStatus(error.message, 'Error');
      }
    },

    async handleEditNewsPost() {
      try {
        const data = await editNewsPost(
          this.id,
          this.title,
          this.body,
          this.date
        );
        this.displayStatus(
          `Successfully edited #${this.id} news post`,
          'Success'
        );
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

  async mounted() {
    this.id = this.$route.params.id;
    await this.handleGetNewsPost();
  },

  beforeRouteLeave(to, from, next) {
    if (
      !window.confirm(
        'Are you sure you want to leave? Any unsaved data will be lost.'
      )
    ) {
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

<style lang="scss" scoped>
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
  }
  .submit-btn:hover {
    opacity: 0.9;
    border-radius: 10px;
  }
}
</style>
