import rehypeStringify from 'rehype-stringify-v9';
import remarkParse from 'remark-parse-v10';
import remarkRehype from 'remark-rehype';
import { unified } from 'unified-v10';

const app = document.querySelector<HTMLDivElement>('#app')!;

const processor = unified()
  .use(remarkParse)
  .use(remarkRehype)
  .use(rehypeStringify);

const file = new URLSearchParams(window.location.search).get("file") || "lorem-lg.md";

fetch(file).then((res) => res.text()).then((md) => {
  const startTime = performance.now();
  
  const mdStr = processor.processSync(md).toString();
  
  const endTime = performance.now();
  performance.measure('markdown-unified-v10', {
    start: startTime, 
    end: endTime,
  });

  app.innerHTML = mdStr;

  // window.tachometerResult = endTime - startTime;
})