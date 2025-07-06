// netlify/functions/chat.js
import { Configuration, OpenAIApi } from 'openai';

const openai = new OpenAIApi(new Configuration({ 
  apiKey: process.env.OPENAI_API_KEY 
}));

export default async (request, context) => {
  // Handle CORS
  if (request.method === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
      }
    };
  }

  if (request.method !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      }
    };
  }

  try {
    const { message } = JSON.parse(request.body || '{}');

    if (!message) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Message is required' }),
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json'
        }
      };
    }

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      stream: true,
      messages: [
        { 
          role: 'system', 
          content: `You are Kavya's AI portfolio assistant. Kavya is an AI Engineer with expertise in:
          - Machine Learning and Deep Learning
          - Natural Language Processing (NLP)
          - Data Science and Analytics
          - Python, PyTorch, TensorFlow
          - Sentiment Analysis and BERT models
          - Tableau and Data Visualization
          
          Education:
          - M.S., Computer Science from George Mason University (2023)
          - B.S., Computer Science from JNTUH, India (2019)
          
          Key Projects:
          - Deep NLP for Sentiment Analysis using BERT
          - Netflix Data Analysis with Tableau
          - Drug Activity Prediction with AdaBoost
          - COVID-19 Mobility Analysis
          - Digit Recognizer with K-Means clustering
          
          Be helpful, professional, and enthusiastic about AI and technology. Keep responses concise but informative. If asked about specific technical details, provide accurate information based on her background.`
        },
        { role: 'user', content: message }
      ],
      max_tokens: 500,
      temperature: 0.7
    });

    return new Response(completion.toReadableStream(), {
      headers: { 
        'Content-Type': 'text/event-stream',
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive'
      }
    });

  } catch (error) {
    console.error('Error in chat function:', error);
    
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        error: 'Internal server error',
        message: error.message 
      }),
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      }
    };
  }
}; 