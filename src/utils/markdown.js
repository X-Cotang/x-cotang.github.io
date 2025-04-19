import MarkdownIt from 'markdown-it'
import katex from '@traptitech/markdown-it-katex'

const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
}).use(katex, {
  throwOnError: false,
  errorColor: ' #cc0000',
  strict: false,
})

export default md
