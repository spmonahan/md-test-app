# JavaScript Markdown parser performance test app

This app tests the performance of different JS MD parsers.

## Setup

1. Clone repo
2. `yarn` to install deps
3. `yarn dev` to run in dev mode

### Production builds

1. `yarn build`
2. `yarn serve`

## Pages

### Dev

1. [Unified v11](http://localhost:5173/unified-v11.html)
2. [MarkdownIt v14](http://localhost:5173/markdown-it-v14.html)

### Production

1. [Unified v11](http://localhost:8080/unified-v11.html)
2. [MarkdownIt v14](http://localhost:8080/markdown-it-v14.html)

## Benchmarking

Benchmarks are run in browser with [Tachometer](https://github.com/google/tachometer).

To run benchmarks:

1. Make a production build: `yarn build`
2. Serve the production build: `yarn serve`
3. Run a benchmark, e.g., `yarn benchmark:stream-small`

### Benchmarks

The streaming benchmarks use a [ReadableStream](https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream) and timers to fake a streaming Copilot response. In these cases the Markdown response is built up over the course of the stream and repeatedly re-parsed.

The oneshot benchmarks parse the entire Markdown string once.

1. `stream-small`: A small response copied from actual Copilot output, with fake streaming.
2. `stream-large`: A large body of Markdown (the MD spec), with fake streaming.
3. `oneshot-small`: A small response parsed once.
4. `oneshot-large`: A large body of Markdown parsed once.