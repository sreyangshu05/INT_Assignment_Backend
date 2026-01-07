# AI Text Classifier API

## Overview
This is an industry-style Node.js backend (Express) with a single AI-powered endpoint to classify any human text as Complaint, Query, Feedback, or Other, and return a category + confidence, using OpenAI's API. It is extensible and clearly structured for maintainability.

## Tech Stack
- Node.js
- Express.js
- dotenv
- axios (for OpenAI API calls)

## Directory Structure
```
ai-text-classifier/
│
├── src/
│   ├── controllers/
│   │   └── classifyController.js
│   ├── routes/
│   │   └── classifyRoutes.js
│   ├── services/
│   │   └── aiClassifierService.js
│   ├── utils/
│   │   └── confidenceMapper.js
│   ├── app.js
│   └── server.js
│
├── .env
├── package.json
├── README.md
```

## Setup

1. Clone the repo
2. Install dependencies:
   ```
   npm install
   ```
3. Set up your `.env`:
   ```
   AI_API_KEY=your_openai_api_key
   PORT=3000
   ```
4. Start the dev server:
   ```
   npm run dev
   ```

## API Usage
**POST** `/api/classify`

**Request:**
```json
{
  "text": "I am unhappy with your customer support"
}
```
**Response:**
```json
{
  "category": "Complaint",
  "confidence": 0.87
}
```
**Errors:**
```json
{ "error": "Text is required" }
{ "error": "AI service unavailable" }
```

## How AI is Used
- **Prompt design:**
  > You are an AI text classification system. Classify the given text into exactly ONE of the following categories:\nComplaint\nQuery\nFeedback\nOther\nReturn ONLY a JSON object with:\n{\n  "category": "<one category>",\n  "confidence": "<number between 0 and 1>"\n}\nText: "{USER_TEXT}"
- **If AI omits confidence**, a simple mapping fills it in:
  - Complaint → 0.85
  - Query     → 0.75
  - Feedback  → 0.80
  - Other     → 0.60

## Extensibility / Future
- Easy to add explainability, length checks, Docker, or other models.

## Author
- Designed for clarity, maintainability, and industry standards.

