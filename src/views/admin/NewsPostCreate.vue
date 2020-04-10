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

    <NewsPostWritingArea
      :title.sync="title"
      :originalBody="originalBody"
      :date.sync="date"
      @bodyChanged="updateBody"
    />
    <button v-on:click="handleCreateNewsPost()" class="submit-btn">
      Save
    </button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import axios from 'axios';

import NewsPostForm from './NewsPostForm.vue';
import NewsPostFormPreview from './NewsPostFormPreview.vue';
import NewsPostWritingArea from '@/components/admin/NewsPostWritingArea.vue';
import StatusMessage from './StatusMessage.vue';

import { createNewsPost } from './actions/createNewsPost';

export default Vue.extend({
  name: 'NewsPostCreate',
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

    async handleCreateNewsPost() {
      try {
        const data = await createNewsPost(this.title, this.body, this.date);
        this.displayStatus(`Successfully created news post`, 'Success');
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
    }
  }
});
</script>

<style lang="scss">
@import '@/global.scss';

.news-post-create {
  padding-top: 66px;

  h2 {
    margin: 30px auto;
  }

  .create-container {
    display: flex;
    .form-container,
    .preview-container {
      width: 50%;
    }
  }

  .submit-btn {
    margin: 20px;
    height: 40px;
    min-width: 10%;
    width: auto;
    border-radius: 5px;
    background-color: var(--secondary-color);
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

@media only screen and (max-width: 800px) {
  .news-post-create .create-container {
    flex-direction: column;
    width: 100%;
    .form-container,
    .preview-container {
      width: 100%;
    }
  }
}
</style>
