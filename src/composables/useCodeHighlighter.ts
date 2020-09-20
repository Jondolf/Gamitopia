// @ts-ignore
import hljs from 'highlight.js/lib/core';
// @ts-ignore
import javascript from 'highlight.js/lib/languages/javascript';
// @ts-ignore
import json from 'highlight.js/lib/languages/json';
// @ts-ignore
import markdown from 'highlight.js/lib/languages/markdown';
// @ts-ignore
import python from 'highlight.js/lib/languages/python';
// @ts-ignore
import scss from 'highlight.js/lib/languages/scss';
// @ts-ignore
import typescript from 'highlight.js/lib/languages/typescript';
// @ts-ignore
import xml from 'highlight.js/lib/languages/xml'; // Didn't find HTML so I use XML here

hljs.registerLanguage('xml', xml);
hljs.registerLanguage('scss', scss);
hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('typescript', typescript);
hljs.registerLanguage('json', json);
hljs.registerLanguage('markdown', markdown);
hljs.registerLanguage('python', python);

export function useCodeHighlighter() {
  const languageNames: { [x in string]: string } = {
    html: 'HTML',
    css: 'CSS',
    scss: 'SCSS',
    javascript: 'JavaScript',
    js: 'JavaScript',
    typescript: 'TypeScript',
    ts: 'TypeScript',
    json: 'JSON',
    markdown: 'Markdown',
    java: 'Java',
    kotlin: 'Kotlin',
    rust: 'Rust',
    csharp: 'C#',
    cs: 'C#',
    python: 'Python'
  }

  /**
   * Highlights all code elements on the page.
   */
  function highlightAll() {
    addLanguageLabelsToAllBlocks()
    const allCodeElements: NodeListOf<HTMLElement> = document.querySelectorAll('code');
    allCodeElements.forEach((code) => highlightElement(code, false))
  }

  /**
   * Highlights the given code element.
   */
  function highlightElement(element: HTMLElement, showLanguage?: boolean) {
    if (showLanguage) {
      addLanguageLabelToBlock(element);
    }
    hljs.highlightBlock(element);
  }

  /**
   * Highlights all code elements found inside the given element
   */
  function highlightAllInElement(element: HTMLElement) {
    const codeBlocks: NodeListOf<HTMLElement> = document.querySelectorAll('pre code');
    codeBlocks.forEach((block) => addLanguageLabelToBlock(block.parentElement!));

    const codeElements: NodeListOf<HTMLElement> = element.querySelectorAll('code');
    codeElements.forEach((code) => highlightElement(code, false))
  }

  function addLanguageLabelsToAllBlocks() {
    const codeBlocks: NodeListOf<HTMLElement> = document.querySelectorAll('pre code');
    codeBlocks.forEach((block) => addLanguageLabelToBlock(block.parentElement!));
  }

  function addLanguageLabelToBlock(element: HTMLElement) {
    const codeElementClass: string = element.getElementsByTagName('code')[0].className;
    const codeLanguage = codeElementClass.replace(/-/g, '').replace(/language/g, '').replace(/hljs/g, '').replace(/xml/g, '').trim();
    const oldLabelElement = element.getElementsByClassName('code-language-name')[0];
    if (oldLabelElement) {
      oldLabelElement.remove();
    }
    element.insertAdjacentHTML("afterbegin", `<label class="code-language-name">${languageNames[codeLanguage.toLowerCase()]}</label>`)
  }

  return {
    highlightAll,
    highlightElement,
    highlightAllInElement
  }
}