<template>
  <div class="news-post-writing-area" ref="newsPostBody">
    <button @click="isPreview = !isPreview" class="toggle-preview-button">Toggle preview</button>
    <input
      :value="title"
      type="text"
      name="news-post-name"
      class="news-post-name"
      spellcheck="false"
      placeholder="Write title here..."
      @input="$emit('update:title', $event.target.value)"
    />
    <input
      :value="tagsAsString"
      @input="
        tagsAsString = $event.target.value;
        $emit('change-tags', tagsAsString.replace(/ /g, '').split(','));
      "
      type="text"
      placeholder="e.g. GameUpdate, Feature"
      class="tags-input"
    />
    <textarea
      v-if="!isPreview"
      @input="
        markdownBody = $event.target.value;
        parseBody();
        $emit('change-body', markdownBody, parsedBody);
      "
      :value="markdownBody"
      class="editor"
    ></textarea>
    <div v-else v-html="parsedBody" class="editor"></div>
    <input :value="date" @input="$emit('update:date', $event.target.value)" type="date" name="date" class="date" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';

export default defineComponent({
  name: 'NewsPostWritingArea',

  props: {
    title: String,
    date: String,
    originalTags: Array,
    originalBodyAsMarkdown: String,
    originalBodyAsHTML: String
  },

  setup(props) {
    const md = require('markdown-it')({
      linkify: true,
      typographer: true
    });
    const markdownBody = ref('');
    const parsedBody = ref<string>(null!);
    const tagsAsString = ref('');
    const isPreview = ref(false);

    function parseBody() {
      parsedBody.value = md.render(markdownBody.value);
    }

    watch(
      () => props.originalTags,
      (newTags) => (tagsAsString.value = newTags?.join(', ')!)
    );
    watch(
      () => props.originalBodyAsMarkdown,
      (newMarkdown) => (markdownBody.value = newMarkdown!)
    );
    watch(
      () => props.originalBodyAsHTML,
      (newHTML) => (parsedBody.value = newHTML!)
    );

    return {
      parsedBody,
      markdownBody,
      tagsAsString,
      isPreview,
      parseBody
    };
  }
});
</script>

<style lang="scss">
.news-post-writing-area {
  width: 70%;
  background-color: var(--color-primary);
  margin: 20px auto;
  padding: 30px;
  text-align: left;
  border-radius: 5px;
  position: relative;
  white-space: pre-line;
  color: white;

  h1 {
    font-size: 26px;
    margin: 25px 0 20px 0;
  }

  h2 {
    font-size: 22px;
    margin: 20px 0 15px 0;
  }

  h3 {
    font-size: 18px;
    margin: 15px 0 10px 0;
  }

  img {
    width: 75%;
    max-width: 400px;
    margin: 10px auto;
    border-radius: 5px;
  }

  hr {
    margin: 15px auto;
  }

  blockquote {
    border-color: white;
  }

  li p {
    display: inline-block;
  }

  .date {
    border: none;
    outline: none;
    font-family: Nunito;
    background: transparent;
    color: white;
    font-size: 17px;
  }

  pre code {
    display: block;
    overflow-x: auto;
    color: #abb2bf;
    background: #323640;
    border-radius: 5px;
    width: 100%;
    padding: 15px;
    margin: 15px auto;
  }

  p,
  i {
    color: white;
  }

  blockquote {
    border-left: 3px solid;
    margin-left: 0;
    padding-left: 1.25rem;
  }

  li p {
    display: inline;
    line-height: 0;
  }

  .toggle-preview-button {
    background-color: transparent;
    border: none;
    outline: none;
    border-radius: 5px;
    padding: 5px;
    color: white;
    font-size: 17px;
    transition: 0.5s;

    &:hover {
      background-color: rgba(200, 200, 200, 0.5);
    }
  }

  .news-post-name {
    border: none;
    outline: none;
    font-size: 30px;
    border-bottom: 2px solid;
    margin-bottom: 25px;
    width: 100%;
    color: white;
    border-color: white;
    background: transparent;
    font-family: Nunito;
  }

  .tags-input {
    width: 100%;
    background-color: transparent;
    color: white;
    font-size: 17px;
    border: none;
    outline: none;
  }

  .editor {
    background-color: transparent;
    min-height: 150px;
    width: 100%;
    margin: 15px 0;
    color: white;
    font-size: 17px;
    font-family: 'Nunito Sans';
    border: none;
    resize: none;
    white-space: normal;

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

      li ul,
      li ol {
        margin: 0;
        padding: 0 0 0 15px;
      }
    }
  }
}

.dark.default-dark .news-post-writing-area ul li,
.dark.default-dark .news-post-writing-area ul li p,
.dark.default-dark .news-post-writing-area ol li,
.dark.default-dark .news-post-writing-area ol li p {
  color: white;
}
</style>
