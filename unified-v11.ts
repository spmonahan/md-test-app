import rehypeStringify from 'rehype-stringify';
// import remarkGfm from 'remark-gfm';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { unified } from 'unified';
import { VFile } from 'vfile';
import { makeStream } from "./stream-faker";

const app = document.querySelector<HTMLDivElement>('#app')!;

const processor = unified()
  .use(remarkParse)
  .use(remarkRehype)
  .use(rehypeStringify);

const file = new URLSearchParams(window.location.search).get("file") || "lorem-lg.md";
const shouldStream = new URLSearchParams(window.location.search).get("stream") === "true";

const res = await fetch(file);
const md = await res.text();

const mdStream = makeStream(md);

const process = (md: string) => {
  const vfile = new VFile(md);

  // const startParse = performance.now();
  const tree = processor.parse(md);
  // const endParse = performance.now();

  // const startTransform = performance.now();
  const hast = processor.runSync(tree, vfile);
  // const endTransform = performance.now();

  // const startStringify = performance.now();
  const htmlStr = processor.stringify(hast, vfile);
  // const endStringify = performance.now();

  // performance.measure('parse-time', {
  //   start: startParse, 
  //   end: endParse,
  // });

  // performance.measure('transform-time', {
  //   start: startTransform, 
  //   end: endTransform,
  // });

  // performance.measure('stringify-time', {
  //   start: startStringify, 
  //   end: endStringify,
  // });

  return {
    htmlStr,
  };
}

const startAll = performance.now();

if (shouldStream) {
  let streamStr = "";
  // @ts-ignore
  for await (const chunk of mdStream) {
  
    streamStr += chunk;
    const { htmlStr } = process(streamStr);
    app.innerHTML = htmlStr.toString();
  }
} else {
  const { htmlStr } = process(md);
  app.innerHTML = htmlStr.toString();
}

const endAll = performance.now();

// performance.measure('all-time', {
//   start: startAll, 
//   end: endAll,
// });

// @ts-ignore
window.tachometerResult = endAll - startAll;
