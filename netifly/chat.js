// netlify/functions/chat.js
import { Configuration, OpenAIApi } from 'openai';
const openai = new OpenAIApi(new Configuration({ apiKey: process.env.OPENAI_KEY }));

export default async (request, context) => {
  const { message } = JSON.parse(request.body || '{}');

  const completion = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    stream: true,
    messages: [
      { role: 'system', content: 'You are Kavya’s AI portfolio assistant.' },
      { role: 'user', content: message }
    ],
  });

  return new Response(completion.toReadableStream(), {
    headers: { 'Content-Type': 'text/event-stream' }
  });
};
