const express = require("express");
const OpenAI = require("openai");
const router = express.Router();
require("dotenv").config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // ✅ API key setup for OpenAI v4
});

router.post("/chat", async (req, res) => {
  const { message } = req.body;
  try {
    const response = await openai.chat.completions.create({
      model: 'text-davinci-003',
      promt: message,
      max_tokens: 150,
    });
    res.json({ reply: response.choices[0].message.content.trim() });
  } catch (error) {
    console.error("OpenAI API error:", error.response?.data || error.message);
    res.status(500).send("Error while communicating");
  }
});

module.exports = router;
