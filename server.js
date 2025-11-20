import express from 'express';
import multer from 'multer';
import cors from 'cors';
import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Enhanced CORS configuration
app.use(cors({
  origin: '*',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

// Handle preflight requests
app.options('*', cors());

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    // Accept all audio files but prefer WAV
    if (file.mimetype.startsWith('audio/')) {
      cb(null, true);
    } else {
      cb(new Error('Only audio files are allowed'), false);
    }
  }
}).single('audio');

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post('/analyze', (req, res) => {
  console.log('Received analyze request');
  
  upload(req, res, async (err) => {
    if (err) {
      console.error('Upload error:', err);
      return res.status(400).json({ error: 'File upload failed: ' + err.message });
    }

    if (!req.file) {
      return res.status(400).json({ error: 'No audio file uploaded.' });
    }

    try {
      console.log('Processing file:', {
        mimetype: req.file.mimetype,
        size: req.file.size
      });

      // Verify the file is a supported format
      const supportedFormats = ['wav', 'mp3', 'm4a', 'webm', 'ogg'];
      const fileExtension = req.file.mimetype.split('/')[1];
      
      if (!supportedFormats.includes(fileExtension)) {
        return res.status(400).json({ 
          error: `Unsupported audio format: ${req.file.mimetype}. Please use WAV, MP3, or WebM format.` 
        });
      }

      // 1. TRANSCRIBE AUDIO
      console.log('Sending to Whisper...');
      const transcript = await client.audio.transcriptions.create({
        file: req.file.buffer,
        model: 'whisper-1',
        language: 'en',
        response_format: 'text',
      });

      console.log('Transcription successful, length:', transcript.length);

      // Check if transcription is meaningful
      if (!transcript || transcript.trim().length < 5) {
        return res.json({
          transcript: transcript || 'No speech detected',
          feedback: "No speech was detected in your recording. Please ensure you're speaking clearly and try again."
        });
      }

      // 2. ANALYZE THE TRANSCRIPT - Use GPT-3.5-turbo for speed
      console.log('Sending to GPT for analysis...');
      const feedbackResponse = await client.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          { 
            role: 'system', 
            content: `You are an ESL speaking examiner. Provide clear, structured feedback in this exact format:

GRAMMAR: [2-3 specific points about grammar]
PRONUNCIATION: [2-3 specific points about pronunciation]
FLUENCY: [2-3 specific points about fluency]
TASK COMPLETION: [Did they address the prompt?]
OVERALL: [Brief overall feedback and suggestions]

Keep it constructive and encouraging. Maximum 250 words.`
          },
          {
            role: 'user',
            content: `Please analyze this ESL student's speech and provide feedback. The prompt was about animals. Here's their transcript: "${transcript}"`
          },
        ],
        max_tokens: 350,
        temperature: 0.7,
      });

      console.log('Analysis complete');
      
      res.json({ 
        transcript: transcript,
        feedback: feedbackResponse.choices[0].message.content 
      });

    } catch (error) {
      console.error('Analysis error:', error);
      
      let errorMessage = 'Error analyzing audio';
      
      if (error.message.includes('multipart form')) {
        errorMessage = 'Audio format not supported. Please try recording again or use a different format.';
      } else if (error.response) {
        console.error('OpenAI API error:', error.response.data);
        errorMessage += `: ${error.response.data.error?.message || 'Unknown API error'}`;
      } else {
        errorMessage += `: ${error.message}`;
      }
      
      res.status(500).json({ 
        error: errorMessage
      });
    }
  });
});

// Simple health check
app.get('/', (req, res) => {
  res.json({ 
    status: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

// Test endpoint for basic file upload
app.post('/test-upload', (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    
    if (!req.file) {
      return res.status(400).json({ error: 'No file received' });
    }

    res.json({
      success: true,
      message: 'File received successfully',
      fileInfo: {
        mimetype: req.file.mimetype,
        size: req.file.size,
        supported: ['wav', 'mp3', 'm4a', 'webm', 'ogg'].includes(req.file.mimetype.split('/')[1])
      }
    });
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});