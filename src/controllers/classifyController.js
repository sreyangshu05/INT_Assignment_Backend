const aiClassifierService = require('../services/aiClassifierService');

exports.classifyText = async (req, res) => {
  const { text } = req.body;
  if (!text) {
    return res.status(400).json({ error: 'Text is required' });
  }
  try {
    const result = await aiClassifierService.classifyText(text);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message || 'AI service unavailable' });
  }
};

