<template>
  <div class="news-post-edit">
    <StatusMessage
      v-if="showStatus"
      @hide="showStatus = false"
      :message="statusMessage"
      :messageType="statusMessageType"
      :showMessage="showStatus"
    />

    <div class="edit-container">
      <div class="form-container">
        <h2>Edit news post</h2>
        <NewsPostForm :title.sync="title" :body.sync="body" :date.sync="date" />
      </div>

      <div class="preview-container">
        <h2>Preview</h2>
        <NewsPostFormPreview
          :title="title"
          :body="body"
          :date="formatDate(date)"
        />
      </div>
    </div>
    <button v-on:click="handleEditNewsPost()" class="submit-btn">
      Save
    </button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import axios from 'axios';

import NewsPostForm from './NewsPostForm.vue';
import NewsPostFormPreview from './NewsPostFormPreview.vue';
import StatusMessage from './StatusMessage.vue';

import { getNewsPost } from './actions/getNewsPost';
import { editNewsPost } from './actions/editNewsPost';

import News from './interfaces/newsInterface';

export default Vue.extend({
  name: 'NewsPostEdit',
  components: {
    NewsPostForm,
    NewsPostFormPreview,
    StatusMessage
  },

  data() {
    return {
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
    async handleGetNewsPost() {
      try {
        const newsPost = await getNewsPost(this.id);
        this.title = newsPost.title;
        this.body = newsPost.body;
        this.date = newsPost.date.slice(0, 10);
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
    }
  },

  async mounted() {
    this.id = this.$route.params.id;
    await this.handleGetNewsPost();
  }
});
</script>

<style lang="scss" scoped>
@import '@/global.scss';

.news-post-edit {
  padding-top: 66px;

  h2 {
    margin: 30px auto;
  }

  .edit-container {
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
  .news-post-edit .edit-container {
    flex-direction: column;
    width: 100%;
    .form-container,
    .preview-container {
      width: 100%;
    }
  }
}
</style>