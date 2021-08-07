<script>
  import MarkdownIt from 'markdown-it';
  import hljs from 'highlight.js';
  import 'highlight.js/styles/base16/tomorrow-night.css';

  export let markdown = '';

  const md = new MarkdownIt({
      highlight: function (str, lang) {
      if (lang && hljs.getLanguage(lang)) {
        try {
          return hljs.highlight(str, {language: lang}).value
        } catch (e) {
          console.error('Failed to highlight string')
        }
      }
      return '';
    },
  });

  const rendered = md.render(markdown);
</script>

<div>
  {@html rendered}
</div>