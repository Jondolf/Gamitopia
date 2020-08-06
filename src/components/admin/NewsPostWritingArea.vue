<template>
  <div class="news-post-writing-area" ref="newsPostBody">
    <input
      :value="title"
      type="text"
      name="news-post-name"
      class="news-post-name"
      spellcheck="false"
      placeholder="Write title here..."
      @input="$emit('update:title', $event.target.value)"
    />
    <div class="editor" spellcheck="false">
      <EditorMenuBubble
        class="menububble"
        :editor="editor"
        @hide="hideLinkMenu"
        v-slot="{ commands, isActive, getMarkAttrs, menu }"
      >
        <div
          class="menububble"
          :class="{ 'is-active': menu.isActive }"
          :style="`left: ${menu.left}px; bottom: ${menu.bottom}px;`"
        >
          <form
            class="menububble__form"
            v-if="linkMenuIsActive"
            @submit.prevent="setLinkUrl(commands.link, linkUrl)"
          >
            <input
              class="menububble__input"
              type="text"
              v-model="linkUrl"
              placeholder="https://"
              ref="linkInput"
              @keydown.esc="hideLinkMenu"
            />
            <button
              class="menububble__button"
              @click="setLinkUrl(commands.link, null)"
              type="button"
            >
              <i class="remove">Remove</i>
            </button>
          </form>

          <template v-else>
            <button
              class="menububble__button"
              @click="showLinkMenu(getMarkAttrs('link'))"
              :class="{ 'is-active': isActive.link() }"
            >
              <i class="material-icons">link</i>
            </button>
          </template>

          <button
            class="menububble__button"
            :class="{ 'is-active': isActive.bold() }"
            @click="commands.bold"
          >
            <i class="material-icons">format_bold</i>
          </button>

          <button
            class="menububble__button"
            :class="{ 'is-active': isActive.italic() }"
            @click="commands.italic"
          >
            <i class="material-icons">format_italic</i>
          </button>

          <button
            class="menububble__button"
            :class="{ 'is-active': isActive.strike() }"
            @click="commands.strike"
          >
            <i class="material-icons">strikethrough_s</i>
          </button>

          <button
            class="menububble__button"
            :class="{ 'is-active': isActive.underline() }"
            @click="commands.underline"
          >
            <i class="material-icons">format_underline</i>
          </button>

          <button
            class="menububble__button"
            :class="{ 'is-active': isActive.code() }"
            @click="commands.code"
          >
            <i class="material-icons">code</i>
          </button>
        </div>
      </EditorMenuBubble>

      <editor-menu-bar :editor="editor" v-slot="{ commands, isActive }">
        <div class="menubar">
          <button
            title="Bold"
            class="menubar__button"
            :class="{ 'is-active': isActive.bold() }"
            @click="commands.bold"
          >
            <i class="material-icons">format_bold</i>
          </button>

          <button
            title="Italic"
            class="menubar__button"
            :class="{ 'is-active': isActive.italic() }"
            @click="commands.italic"
          >
            <i class="material-icons">format_italic</i>
          </button>

          <button
            title="Strikethrough"
            class="menubar__button"
            :class="{ 'is-active': isActive.strike() }"
            @click="commands.strike"
          >
            <i class="material-icons">strikethrough_s</i>
          </button>

          <button
            title="Underline"
            class="menubar__button"
            :class="{ 'is-active': isActive.underline() }"
            @click="commands.underline"
          >
            <i class="material-icons">format_underline</i>
          </button>

          <button
            title="Paragraph"
            class="menubar__button"
            :class="{ 'is-active': isActive.paragraph() }"
            @click="commands.paragraph"
          >
            <span>P</span>
          </button>

          <button
            title="Header 1"
            class="menubar__button"
            :class="{ 'is-active': isActive.heading({ level: 1 }) }"
            @click="commands.heading({ level: 1 })"
          >
            <span>H1</span>
          </button>

          <button
            title="Header 2"
            class="menubar__button"
            :class="{ 'is-active': isActive.heading({ level: 2 }) }"
            @click="commands.heading({ level: 2 })"
          >
            <span>H2</span>
          </button>

          <button
            title="Header 3"
            class="menubar__button"
            :class="{ 'is-active': isActive.heading({ level: 3 }) }"
            @click="commands.heading({ level: 3 })"
          >
            <span>H3</span>
          </button>

          <button
            title="Bullet list"
            class="menubar__button"
            :class="{ 'is-active': isActive.bullet_list() }"
            @click="commands.bullet_list"
          >
            <i class="material-icons">format_list_bulleted</i>
          </button>

          <button
            title="Number list"
            class="menubar__button"
            :class="{ 'is-active': isActive.ordered_list() }"
            @click="commands.ordered_list"
          >
            <i class="material-icons">format_list_numbered</i>
          </button>

          <button
            title="Quote"
            class="menubar__button"
            :class="{ 'is-active': isActive.blockquote() }"
            @click="commands.blockquote"
          >
            <i class="material-icons">format_quote</i>
          </button>

          <button
            title="Todo"
            class="menubar__button"
            :class="{ 'is-active': isActive.todo_list() }"
            @click="commands.todo_list"
          >
            <i class="material-icons">list_alt</i>
          </button>

          <button
            title="Inline code"
            class="menubar__button"
            :class="{ 'is-active': isActive.code() }"
            @click="commands.code"
          >
            <i class="material-icons">code</i>
          </button>

          <button
            title="Code block"
            class="menubar__button"
            :class="{ 'is-active': isActive.code_block() }"
            @click="commands.code_block"
          >
            <i class="material-icons">code</i>
          </button>

          <button
            class="menubar__button"
            @click="showImagePrompt(commands.image)"
          >
            <i class="material-icons">image</i>
          </button>

          <button
            title="Horizontal line"
            class="menubar__button"
            @click="commands.horizontal_rule"
          >
            <i class="material-icons">remove</i>
          </button>

          <button title="Undo" class="menubar__button" @click="commands.undo">
            <i class="material-icons">undo</i>
          </button>

          <button title="Redo" class="menubar__button" @click="commands.redo">
            <i class="material-icons">redo</i>
          </button>
        </div>
      </editor-menu-bar>

      <editor-content
        v-model="editor.content"
        class="editor__content"
        :editor="editor"
      />
    </div>
    <input
      :value="date"
      @input="$emit('update:date', $event.target.value)"
      type="date"
      name="date"
      class="date"
    />
  </div>
</template>

<script>
import Vue from 'vue';
import xml from 'highlight.js/lib/languages/xml';
import javascript from 'highlight.js/lib/languages/javascript';
import css from 'highlight.js/lib/languages/css';
import { Editor, EditorContent, EditorMenuBar, EditorMenuBubble } from 'tiptap';

import {
  Blockquote,
  CodeBlock,
  HardBreak,
  Heading,
  HorizontalRule,
  OrderedList,
  BulletList,
  ListItem,
  TodoItem,
  TodoList,
  Bold,
  Code,
  Italic,
  Link,
  Strike,
  Underline,
  History,
  CodeBlockHighlight,
  Image,
  Placeholder
} from 'tiptap-extensions';

export default Vue.extend({
  components: {
    EditorContent,
    EditorMenuBar,
    EditorMenuBubble
  },

  props: {
    title: String,
    originalBody: String,
    date: String
  },

  data() {
    return {
      newsPostBody: '',
      editor: new Editor({
        extensions: [
          new Blockquote(),
          new BulletList(),
          new CodeBlock(),
          new HardBreak(),
          new Heading(),
          new HorizontalRule(),
          new ListItem(),
          new OrderedList(),
          new TodoItem(),
          new TodoList(),
          new Link(),
          new Bold(),
          new Code(),
          new Italic(),
          new Strike(),
          new Underline(),
          new History(),
          new Image(),
          new Placeholder({
            emptyEditorClass: 'is-editor-empty',
            emptyNodeClass: 'is-empty',
            emptyNodeText: 'Write content here…',
            showOnlyWhenEditable: true,
            showOnlyCurrent: true
          }),
          new CodeBlockHighlight({
            languages: {
              xml,
              javascript,
              css
            }
          })
        ],
        content: ``,
        onUpdate: ({ getJSON, getHTML }) => {
          this.json = getJSON();
          this.html = getHTML();
        }
      }),
      json: '',
      html: '',
      linkUrl: null,
      linkMenuIsActive: false
    };
  },

  methods: {
    showLinkMenu(attrs) {
      this.linkUrl = attrs.href;
      this.linkMenuIsActive = true;
      this.$nextTick(() => {
        this.$refs.linkInput.focus();
      });
    },
    hideLinkMenu() {
      this.linkUrl = null;
      this.linkMenuIsActive = false;
    },
    setLinkUrl(command, url) {
      command({ href: url });
      this.hideLinkMenu();
    },
    showImagePrompt(command) {
      const src = prompt('Enter the url of your image here');
      if (src !== null) {
        command({ src });
      }
    }
  },

  watch: {
    html() {
      this.$emit('body-changed', this.html);
    },

    originalTitle() {
      this.newsPostName = this.originalTitle;
    },

    originalBody() {
      this.editor.setContent(
        this.originalBody + '<pre id="codeBlockToRemove"><code></code></pre>',
        true
      );
      //? I create the code element and remove it right after because the code highlighting didn't work without editing the code content for some reason
      const codeBlocks = document.getElementsByTagName('pre');
      const codeBlockToRemove = codeBlocks[codeBlocks.length - 1];
      codeBlockToRemove.remove();
    },

    originalDate() {
      this.newsPostDate = this.originalDate;
    }
  },

  beforeDestroy() {
    this.editor.destroy();
  }
});
</script>

<style lang="scss">
@import '@/global.scss';
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

  .editor p.is-editor-empty:first-child::before {
    content: attr(data-empty-text);
    float: left;
    color: #aaa;
    pointer-events: none;
    height: 0;
    font-style: italic;
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
  i,
  .menubar span {
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

  .menububble {
    position: absolute;
    display: flex;
    z-index: 20;
    background: black;
    border-radius: 5px;
    padding: 0.3rem;
    margin-bottom: 0.5rem;
    transform: translateX(-50%);
    visibility: hidden;
    opacity: 0;
    transition: opacity 0.2s, visibility 0.2s;

    &.is-active {
      opacity: 1;
      visibility: visible;
    }

    &__button {
      display: inline-flex;
      background: transparent;
      border: 0;
      color: white;
      padding: 0.2rem 0.5rem;
      margin-right: 0.2rem;
      border-radius: 3px;
      cursor: pointer;

      &:last-child {
        margin-right: 0;
      }

      &:hover {
        background-color: rgba(white, 0.1);
      }

      &.is-active {
        background-color: rgba(white, 0.2);
      }
    }

    &__form {
      display: flex;
      align-items: center;
    }

    &__input {
      font: inherit;
      border: none;
      background: transparent;
      color: white;
    }
  }

  .editor {
    background-color: transparent;
    min-height: 150px;
    width: 100%;
    margin: 15px 0;

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
      li[data-type='todo_item'] {
        line-height: 0;
      }
      li ul,
      li ol {
        margin: 0;
        padding: 0 0 0 15px;
      }
    }

    .menubar {
      display: flex;
      align-items: center;

      button {
        background-color: rgba(0, 0, 0, 0);
        width: 32px;
        height: 32px;
        margin-left: 5px;
        border-radius: 5px;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .menubar-color-selection-button {
        background-color: rgba(0, 0, 0, 0);
        width: 50px;
        height: 32px;
        margin-left: 5px;
        border-radius: 5px;
        position: relative;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        .menubar_button {
          width: 32px;
          height: 32px;
        }
        .v-popover {
          display: flex;
          justify-content: center;
          align-items: center;
          .trigger {
            display: inline-flex !important;
            button.tooltip-target.b3 {
              width: 18px;
              height: 32px;
              background-color: rgba(white, 0.2);
            }
          }
        }

        i,
        span {
          color: white;
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        span {
          font-size: 22px;
        }
      }
      button:first-child {
        margin-left: 0;
      }
    }
  }
}

.news-post-writing-area .editor .menubar .is-active {
  border: 1px solid;
}

ul[data-type='todo_list'] li {
  list-style: none;
  div {
    display: inline-block;
  }
  span.todo-checkbox {
    display: inline-block;
    border: 2px solid;
    height: 0.9em;
    width: 0.9em;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    margin-right: 10px;
    margin-top: 0.3rem;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    -webkit-user-select: none;
    cursor: pointer;
    border-radius: 0.2em;
    background-color: transparent;
    -webkit-transition: background 0.4s;
    transition: background 0.4s;
  }
}

.news-post-writing-area .editor .menubar .is-active {
  border: 1.5px solid white;
}

.dark.default-dark .news-post-writing-area ul li,
.dark.default-dark .news-post-writing-area ul li p,
.dark.default-dark .news-post-writing-area ol li,
.dark.default-dark .news-post-writing-area ol li p {
  color: white;
}
</style>
