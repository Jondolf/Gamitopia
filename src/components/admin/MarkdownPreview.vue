<template>
  <div class="markdown-preview">
    <div class="header-container">
      <h1 class="title">{{ title ? title : 'Title' }}</h1>
      <div v-if="tags" class="tags">
        <span
          v-for="(tag, index) in tags"
          :key="index"
          :style="{ backgroundColor: getTagByName(tag).backgroundColor, color: getTagByName(tag).textColor }"
          class="tag"
          >{{ tag }}</span
        >
      </div>
    </div>
    <div v-html="bodyAsHTML" class="body"></div>
    <time v-if="date" :datetime="date" class="date">{{ formatDate(date) }}</time>
  </div>
</template>

<script lang="ts">
import { useNewsPostTags } from '@/composables/news/useNewsPostTags';
import { formatDate } from '@/views/admin/actions/formatDate';
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    title: String,
    tags: Array as () => string[],
    bodyAsHTML: String,
    date: String
  },

  setup() {
    const { getTagByName } = useNewsPostTags();

    formatDate;

    return { formatDate, getTagByName };
  }
});
</script>

<style lang="scss">
.markdown-preview {
  width: 50%;
  min-height: 200px;
  padding: 20px 20px 20px 10px;
  color: var(--color-light-contrast);
  text-align: left;
  overflow: hidden;

  li p {
    display: inline;
  }

  hr {
    margin: 15px auto;
  }

  .header-container {
    height: 115px;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    margin-right: 30px;

    .title {
      font-size: 30px;
      margin: 0 0 15px 0;
      color: var(--color-light-contrast);
    }

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

  .body {
    min-height: 250px;
    padding: 15px;
    line-height: 1.5rem;
    overflow: hidden;
    transition: 1.5s;
    box-sizing: border-box;
    color: var(--color-light-contrast);
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
      border-left: 3px var(--color-light-contrast) solid;
      margin-left: 0;
      padding-left: 1.25rem;
    }

    a,
    a:visited {
      font-weight: bolder;
      font-style: italic;
      color: var(--color-light-contrast);
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
      margin: auto;
      border-radius: var(--border-radius);
      background-color: var(--color-light);

      li {
        color: var(--color-light-contrast);
      }

      li ul,
      li ol {
        margin: 0;
        padding: 0 0 0 15px;
      }
    }
  }
}
</style>
