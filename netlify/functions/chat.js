const fetch = require('node-fetch');

exports.handler = async function(event, context) {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' }),
      headers: { 'Content-Type': 'application/json' }
    };
  }

  let body;
  try {
    body = JSON.parse(event.body);
  } catch (e) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Invalid JSON' }),
      headers: { 'Content-Type': 'application/json' }
    };
  }

  const userMessage = body.message || '';

  // System prompt with Kavya's details
  const systemPrompt = `You are a helpful AI assistant for Kavya’s personal portfolio website. Kavya is an engineer, explorer, foodie, and math enthusiast. She has traveled to 12+ countries, loves exploring food and cuisines, enjoys teaching math in creative ways, and builds smart things with AI. Her main skills include engineering, AI, mathematics, and exploration. Her projects include data analysis, smart AI tools, and more.`;

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userMessage }
        ],
        stream: false // Ensure streaming is disabled
      })
    });

    const data = await response.json();
    // Log the full response for debugging
    console.log('OpenAI raw response:', JSON.stringify(data));

    if (data.choices && data.choices[0] && data.choices[0].message) {
      console.log('Returning reply:', data.choices[0].message.content);
      return {
        statusCode: 200,
        body: JSON.stringify({ reply: data.choices[0].message.content }),
        headers: { 'Content-Type': 'application/json' }
      };
    } else {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'No response from AI', details: data }),
        headers: { 'Content-Type': 'application/json' }
      };
    }
  } catch (error) {
    console.error('OpenAI API error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
      headers: { 'Content-Type': 'application/json' }
    };
  }
}; 