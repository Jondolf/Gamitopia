<template>
  <div class="news-post-markdown-editor">
    <div class="header-container">
      <input
        :value="title"
        type="text"
        name="title"
        class="title"
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
    </div>

    <pre class="markdown-editor-container">
      <code class="language-markdown">{{ markdownBody }}</code>
      <textarea
      v-model="markdownBody"
      @keyup="handleMarkdownEdit()"
      @keydown="tabIndent"
      cols="30"
      rows="10"
      ></textarea>
    </pre>
    <input :value="date" @input="$emit('update:date', $event.target.value)" type="date" name="date" class="date" />
  </div>
</template>

<script lang="ts">
import { useCodeHighlighter } from '@/composables/useCodeHighlighter';
import { defineComponent, onMounted, ref, watch } from 'vue';
import sanitizeHtml from 'sanitize-html';

export default defineComponent({
  name: 'NewsPostMarkdownEditor',

  props: {
    title: String,
    date: String,
    originalTags: Array,
    originalBodyAsMarkdown: String
  },

  setup(props, { emit }) {
    const md = require('markdown-it')({
      html: true,
      linkify: true,
      typographer: true
    });
    const markdownBody = ref('');
    const parsedBody = ref<string>(null!);
    const tagsAsString = ref('');
    const sanitizeHtmlConfig = {
      allowedTags: [
        'h1',
        'h2',
        'h3',
        'h4',
        'h5',
        'h6',
        'blockquote',
        'p',
        'span',
        'mark',
        'a',
        'ul',
        'ol',
        'li',
        'b',
        'i',
        'strong',
        'em',
        'strike',
        'abbr',
        'code',
        'hr',
        'br',
        'div',
        'img',
        'table',
        'thead',
        'caption',
        'tbody',
        'tr',
        'th',
        'td',
        'pre'
      ],
      allowedAttributes: {
        '*': ['style', 'class', 'href', 'alt'],
        img: ['src']
      },
      allowedStyles: {
        '*': {
          color: [/^#(0x)?[0-9a-f]+$/i, /^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/],
          'background-color': [/^#(0x)?[0-9a-f]+$/i, /^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/],
          'text-align': [/^left$/, /^right$/, /^center$/],
          'font-size': [/^\d+(?:px|em|%)$/],
          'font-family': [/^'Nunito'$/, /^'Nunito Sans'$/, /^'Fira Code'$/, /^'Merriweather'$/],
          'border-radius': [/^\d+(?:px|em|%)$/]
        }
      }
    };

    const { highlightAll } = useCodeHighlighter();

    function tabIndent(e: KeyboardEvent) {
      if (e.key === 'Tab') {
        e.preventDefault();
        document.execCommand('insertText', false, ' '.repeat(4));
        handleMarkdownEdit();
      }
    }

    function handleMarkdownEdit() {
      parseBody();
      emit('change-body', markdownBody, parsedBody);
      setTimeout(() => {
        highlightAll();
      }, 0);
    }

    function parseBody() {
      parsedBody.value = sanitizeHtml(md.render(markdownBody.value.toString()), sanitizeHtmlConfig);
    }

    watch(
      () => props.originalTags,
      (newTags) => (tagsAsString.value = newTags?.join(', ')!)
    );
    watch(
      () => props.originalBodyAsMarkdown,
      (newMarkdown) => {
        markdownBody.value = newMarkdown!;
      }
    );

    onMounted(() =>
      setTimeout(() => {
        highlightAll();
      }, 150)
    );

    return {
      parsedBody,
      markdownBody,
      tagsAsString,

      tabIndent,
      handleMarkdownEdit,
      parseBody
    };
  }
});
</script>

<style lang="scss">
.news-post-markdown-editor {
  width: 50%;
  min-height: 200px;
  padding: 20px 10px 20px 20px;
  text-align: left;
  position: relative;
  white-space: pre-line;
  color: var(--color-light-contrast);

  .header-container {
    height: 115px;

    .title {
      width: 100%;
      margin-bottom: 25px;
      color: var(--color-light-contrast);
      background: transparent;
      border: none;
      outline: none;
      border-bottom: 2px solid;
      border-color: var(--color-light-contrast);
      font-size: 30px;
      font-family: Nunito;
      font-weight: bold;
    }

    .tags-input {
      width: 100%;
      background-color: transparent;
      color: var(--color-light-contrast);
      font-size: 17px;
      border: none;
      outline: none;
    }
  }

  pre.markdown-editor-container {
    width: 100%;

    code {
      width: 100%;
      min-height: 250px;
      padding: 15px;
      margin: 0;
      box-sizing: border-box;
      font-family: 'Nunito Sans';
      font-size: 17px;
      line-height: 1.5rem;
      white-space: pre-wrap;

      span {
        font-family: 'Nunito Sans';
        font-size: 17px;
        line-height: 1.5rem;
        white-space: pre-wrap;
      }
    }

    textarea {
      position: absolute;
      width: 100%;
      height: 100%;
      padding: 15px;
      box-sizing: border-box;
      color: transparent;
      background-color: transparent;
      caret-color: var(--color-light-contrast);
      outline: none;
      border: none;
      border-radius: var(--border-radius);
      resize: none;
      font-family: 'Nunito Sans';
      font-size: 17px;
      line-height: 1.5rem;
      white-space: pre-wrap;
      overflow: hidden;
    }
  }

  .date {
    border: none;
    outline: none;
    font-family: Nunito;
    background: transparent;
    color: var(--color-light-contrast);
    font-size: 17px;
  }

  p,
  i {
    color: var(--color-light-contrast);
  }

  li p {
    display: inline;
    line-height: 0;
  }
}
</style>
