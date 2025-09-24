

export const makeStream = (fullText: string, chunkSize: number = 100, delayMs: number = 10) => {
  let position = 0;

  return new ReadableStream({
    start(controller) {
      const push = () => {
        if (position >= fullText.length) {
          controller.close();
          return;
        }

        const chunk = fullText.slice(position, position + chunkSize);
        position += chunkSize;

        controller.enqueue(chunk);
        setTimeout(push, delayMs);
      };

      push();
    },
  });
}