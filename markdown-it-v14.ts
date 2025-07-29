import markdownit from "markdown-it";
import { makeStream } from "./stream-faker";

const app = document.querySelector<HTMLDivElement>('#app')!;

const mdit = markdownit("commonmark");

const file = new URLSearchParams(window.location.search).get("file") || "lorem-lg.md";
const shouldStream = new URLSearchParams(window.location.search).get("stream") === "true";

const res = await fetch(file);
const md = await res.text();

const mdStream = makeStream(md);

const process = (md:string) => {
  const startProcess = performance.now();
  const htmlStr = mdit.render(md);
  const endProcess = performance.now();

  performance.measure('process-time', {
    start: startProcess,
    end: endProcess,
  });

  return {
    htmlStr
  };
}

const startTime = performance.now();

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

const endTime = performance.now();
performance.measure('all-time', {
    start: startTime, 
    end: endTime,
});
