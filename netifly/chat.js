// netlify/functions/chat.js
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_KEY,
});

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export default async (request, context) => {
  // Handle CORS preflight
  if (request.method === 'OPTIONS') {
    console.log('OPTIONS preflight received');
    return new Response(null, {
      status: 200,
      headers: CORS_HEADERS,
    });
  }

  try {
    console.log('Received request:', request.method);
    const { message } = JSON.parse(request.body || '{}');
    console.log('Parsed message:', message);

    if (!message) {
      console.log('No message provided');
      return new Response(JSON.stringify({ error: 'Message is required' }), {
        status: 400,
        headers: {
          ...CORS_HEADERS,
          'Content-Type': 'application/json',
        },
      });
    }

    console.log('About to call OpenAI API');
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      stream: true,
      messages: [
        {
          role: 'system',
          content: `You are Kavya's AI portfolio assistant. You're friendly, helpful, and knowledgeable about Kavya's work, projects, and interests. You can help visitors learn about:\n\n- Kavya's background and experience\n- Her projects and technical skills\n- Her interests in AI, travel, food, and teaching math\n- How to contact her\n\nKeep responses conversational, engaging, and informative. If you don't know something specific about Kavya, you can ask the visitor to reach out to her directly.`
        },
        { role: 'user', content: message }
      ],
      max_tokens: 500,
      temperature: 0.7,
    });
    console.log('OpenAI API call succeeded');

    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of completion) {
            const content = chunk.choices[0]?.delta?.content;
            if (content) {
              controller.enqueue(`data: ${JSON.stringify({ content })}\n\n`);
            }
          }
          controller.enqueue('data: [DONE]\n\n');
          controller.close();
        } catch (error) {
          console.error('Streaming error:', error);
          controller.error(error);
        }
      },
    });

    return new Response(stream, {
      headers: {
        ...CORS_HEADERS,
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });
  } catch (error) {
    console.error('Function error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: {
        ...CORS_HEADERS,
        'Content-Type': 'application/json',
      },
    });
  }
};
