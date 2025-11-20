import express from 'express';
import multer from 'multer';
import cors from 'cors';
import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({
  origin: '*',
}));

// Configure multer for memory storage
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('audio/')) {
      cb(null, true);
    } else {
      cb(new Error('Only audio files are allowed!'), false);
    }
  }
}).single('audio');

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post('/analyze', (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      console.error('Upload error:', err);
      return res.status(400).json({ error: 'File upload failed: ' + err.message });
    }

    if (!req.file) {
      return res.status(400).json({ error: 'No audio file uploaded.' });
    }

    try {
      console.log('Received file:', {
        originalname: req.file.originalname,
        mimetype: req.file.mimetype,
        size: req.file.size
      });

      // 1. TRANSCRIBE AUDIO - Send as buffer with proper content type
      const transcript = await client.audio.transcriptions.create({
        file: {
          // Create a proper File-like object
          value: req.file.buffer,
          options: {
            filename: 'audio.webm', // or 'audio.wav' depending on what you're sending
            contentType: req.file.mimetype,
          }
        },
        model: 'whisper-1', // Use whisper-1 instead of gpt-4o-transcribe
        language: 'en', // Optional: specify language
        response_format: 'json',
      });

      console.log('Transcription successful:', transcript.text.substring(0, 100) + '...');

      // 2. ANALYZE THE TRANSCRIPT
      const feedbackResponse = await client.chat.completions.create({
        model: "gpt-4", // Fixed model name
        messages: [
          { 
            role: 'system', 
            content: 'You are an ESL speaking examiner. Provide clear, structured feedback on grammar, pronunciation, fluency, and task completion.' 
          },
          {
            role: 'user',
            content: `Please analyze this student's speech and provide constructive feedback:\n\n"${transcript.text}"`
          },
        ],
        max_tokens: 500,
      });

      res.json({ 
        transcript: transcript.text,
        feedback: feedbackResponse.choices[0].message.content 
      });

    } catch (error) {
      console.error('Analysis error:', error);
      res.status(500).json({ 
        error: 'Error analyzing audio: ' + (error.message || 'Unknown error'),
        details: error.response?.data || 'No additional details'
      });
    }
  });
});

app.get('/', (req, res) => {
  res.send('Server is up and running!');
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
