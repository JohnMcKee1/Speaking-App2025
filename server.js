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
  origin: '*', // Allow all in development, restrict in production
}));

// Set up multer for handling incoming audio files with a file size limit (e.g., 10MB)
const upload = multer({
  limits: { fileSize: 10 * 1024 * 1024 }, // Limit file size to 10MB
}).single('audio'); // Expecting the field name to be 'audio'

// Set up OpenAI client using the API key from environment variable
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Use environment variable for API key
});

app.post('/analyze', (req, res) => {
  upload(req, res, async (err) => {
    if (err) return res.status(400).json({ error: 'File too large or no file uploaded.' });

    try {
      // 1. TRANSCRIBE AUDIO
      const transcript = await client.audio.transcriptions.create({
        file: {
          data: req.file.buffer,
          name: 'audio.wav'
        },
        model: 'gpt-4o-transcribe', // or whisper-1
      });

      // 2. ANALYZE THE TRANSCRIPT
      const feedbackResponse = await client.chat.completions.create({
        model: "gpt-4.1",
        messages: [
          { role: 'system', content: 'You are an ESL speaking examiner.' },
          {
            role: 'user',
            content: `Analyze the following student's speech based on grammar, pronunciation, fluency, and task completion. Return clear structured feedback.\n\nTranscript:\n${transcript.text}`
          },
        ],
      });

      res.json({ 
        transcript: transcript.text,
        feedback: feedbackResponse.choices[0].message.content 
      });

    } catch (error) {
      console.error(error);
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

