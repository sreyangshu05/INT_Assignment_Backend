const axios = require('axios');
const confidenceMapper = require('../utils/confidenceMapper');

const OPENAI_URL = 'https://api.openai.com/v1/chat/completions';

exports.classifyText = async (text) => {
  const prompt = `You are an AI text classification system. Classify the given text into exactly ONE of the following categories:\nComplaint\nQuery\nFeedback\nOther\nReturn ONLY a JSON object with:\n{\n\"category\": \"<one category>\",\n\"confidence\": \"<number between 0 and 1>\"\n}\nText:\n\"${text}\"`;
  try {
    const response = await axios.post(
      OPENAI_URL,
      {
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 50
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.AI_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const aiMessage = response.data.choices[0].message.content;
    let parsed;
    try {
      parsed = JSON.parse(aiMessage);
    } catch {
      parsed = null;
    }
    if (parsed && parsed.category) {
      const confidence = parsed.confidence ? parseFloat(parsed.confidence) : confidenceMapper(parsed.category);
      return { category: parsed.category, confidence };
    } else {
      throw new Error('AI returned invalid format');
    }
  } catch (error) {
    throw new Error('AI service unavailable');
  }
};

