import { createParser, ParsedEvent, ReconnectInterval } from 'eventsource-parser';

export async function abacusaiStream(
  messages: any[],
  {
    model,
    temperature,
    apiKey,
  }: {
    model: string;
    temperature: number;
    apiKey: string;
  },
) {
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();

  const res = await fetch('https://api.abacus.ai/v1/chat/completions', {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    method: 'POST',
    body: JSON.stringify({
      model,
      messages,
      temperature,
      stream: true,
    }),
  });

  if (!res.ok) {
    throw new Error(`Abacus AI API error: ${res.status} ${res.statusText}`);
  }

  const stream = new ReadableStream({
    async start(controller) {
      const onParse = (event: ParsedEvent | ReconnectInterval) => {
        if (event.type === 'event') {
          const data = event.data;
          if (data === '[DONE]') {
            controller.close();
            return;
          }
          try {
            const json = JSON.parse(data);
            const text = json.choices[0]?.delta?.content || '';
            const queue = encoder.encode(text);
            controller.enqueue(queue);
          } catch (e) {
            controller.error(e);
          }
        }
      };

      const parser = createParser(onParse);
      for await (const chunk of res.body as any) {
        parser.feed(decoder.decode(chunk));
      }
    },
  });

  return stream;
}
