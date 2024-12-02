import hljs from 'highlight.js';
import 'highlight.js/styles/github.css'; // ใช้ธีมจาก Highlight.js

export default {
  beforeMount(el) {
    const blocks = el.querySelectorAll('pre code');
    blocks.forEach((block) => {
      hljs.highlightElement(block);
    });
  },
  updated(el) {
    const blocks = el.querySelectorAll('pre code');
    blocks.forEach((block) => {
      hljs.highlightElement(block);
    });
  },
};
