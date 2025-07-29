import rehypeStringify from 'rehype-stringify';
// import remarkGfm from 'remark-gfm';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { unified } from 'unified';
import { VFile } from 'vfile';

const app = document.querySelector<HTMLDivElement>('#app')!;

const processor = unified()
  .use(remarkParse)
  .use(remarkRehype)
  .use(rehypeStringify);

const file = new URLSearchParams(window.location.search).get("file") || "lorem-lg.md";

fetch(file).then((res) => res.text()).then((md) => {
  const startAll = performance.now();

  const vfile = new VFile(md);

  const startMd = performance.now();
  const mdast = processor.parse(md);
  const endMd = performance.now();

  const startHtml = performance.now();
  const hast = processor.runSync(mdast, vfile);
  const endHtml = performance.now();

  const startStringify = performance.now();
  const htmlStr = processor.stringify(hast, vfile);
  const endStringify = performance.now();

  const endAll = performance.now();

  performance.measure('all-time', {
    start: startAll, 
    end: endAll,
  });

  performance.measure('md-time', {
    start: startMd, 
    end: endMd,
  });

  performance.measure('html-time', {
    start: startHtml, 
    end: endHtml,
  });

  performance.measure('stringify-time', {
    start: startStringify, 
    end: endStringify,
  });

  app.innerHTML = htmlStr.toString();

  // window.tachometerResult = endTime - startTime;
})