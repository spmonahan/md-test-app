import markdownit from "markdown-it";

const app = document.querySelector<HTMLDivElement>('#app')!;

const file = new URLSearchParams(window.location.search).get("file") || "lorem-lg.md";

const mdit = markdownit("commonmark");

fetch(file).then((res) => res.text()).then((md) => {
    const startTime = performance.now();

    const mdStr = mdit.render(md);

    const endTime = performance.now();
    performance.measure('markdown-it', {
        start: startTime, 
        end: endTime,
    });

    app.innerHTML = mdStr;

// window.tachometerResult = endTime - startTime;
});