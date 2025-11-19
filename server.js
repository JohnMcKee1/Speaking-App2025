import express from 'express';
import multer from 'multer';
import cors from 'cors';
import OpenAI from 'openai';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Set up CORS to allow specific origins or all origins in development
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*', // Allow all in development, restrict in production
}));

// Set up multer for handling incoming audio files with a file size limit (e.g., 10MB)
const upload = multer({
  limits: { fileSize: 10 * 1024 * 1024 }, // Limit file size to 10MB
}).single('audio'); // Expecting the field name to be 'audio'

// Set up OpenAI client using the API key from environment variable
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Use environment variable for API key
});

// Endpoint for analyzing the audio file
app.post('/analyze', (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ error: 'File too large or no file uploaded.' });
    }

    try {
      // Convert the uploaded file to base64
      const audioBase64 = req.file.buffer.toString('base64');

      // Send request to OpenAI API to analyze the audio content
      const response = await client.chat.completions.create({
        model: 'gpt-4',
        messages: [
          { role: 'system', content: 'You are an ESL speaking examiner.' },
          { 
            role: 'user', 
            content: 'Analyze the following student\'s speech, and provide structured feedback based on grammar, pronunciation, fluency, and task completion. Return the feedback in a clear, readable format.'
          },
          { role: 'user', content: audioBase64 }
        ],
      });

      // Extract the feedback text from the response
      const feedback = response.choices[0].message.content;

      // Send the feedback as the response
      res.json({ feedback });

    } catch (err) {
      console.error('Error analyzing audio:', err);
      res.status(500).json({ error: 'Error analyzing audio.' });
    }
  });
});

// Optional: Add a basic health check route for easier debugging
app.get('/', (req, res) => {
  res.send('Server is up and running!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

