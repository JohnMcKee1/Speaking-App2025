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

// Configure multer with explicit boundary
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 },
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

      // Create a custom boundary for the OpenAI request
      const boundary = 'WebAppBoundary12345';
      
      // Manually create the multipart form data
      const formData = `--${boundary}\r\nContent-Disposition: form-data; name="file"; filename="audio.webm"\r\nContent-Type: ${req.file.mimetype}\r\n\r\n${req.file.buffer.toString('binary')}\r\n--${boundary}\r\nContent-Disposition: form-data; name="model"\r\n\r\nwhisper-1\r\n--${boundary}--`;

      // 1. TRANSCRIBE AUDIO - Send with custom boundary
      const transcript = await client.audio.transcriptions.create({
        file: req.file.buffer,
        model: 'whisper-1',
        language: 'en',
        response_format: 'text',
      }, {
        // Override the default boundary
        headers: {
          'Content-Type': `multipart/form-data; boundary=${boundary}`
        }
      });

      console.log('Transcription successful. Text length:', transcript.length);

      // ANALYZE THE TRANSCRIPT WITH GPT
      const feedbackResponse = await client.chat.completions.create({
        model: "gpt-4",
        messages: [
          { 
            role: 'system', 
            content: `You are an ESL speaking examiner. Provide clear, structured feedback in the following format:
            
Grammar: [feedback on grammar]
Pronunciation: [feedback on pronunciation] 
Fluency: [feedback on fluency]
Task Completion: [feedback on task completion]
Overall: [overall feedback and suggestions]

Keep it constructive and encouraging. Focus on specific improvements the student can make.`
          },
          {
            role: 'user',
            content: `Please analyze this student's speech transcript and provide feedback:\n\n"${transcript}"`
          },
        ],
        max_tokens: 500,
        temperature: 0.7,
      });

      res.json({ 
        transcript: transcript,
        feedback: feedbackResponse.choices[0].message.content 
      });

    } catch (error) {
      console.error('Analysis error:', error);
      
      // More detailed error logging
      if (error.response) {
        console.error('OpenAI API response error:', error.response.data);
        console.error('OpenAI API status:', error.response.status);
      }
      
      res.status(500).json({ 
        error: 'Error analyzing audio: ' + (error.message || 'Unknown error'),
        details: error.response?.data || 'No additional details'
      });
    }
  });
});

// Alternative endpoint that uses a different approach
app.post('/analyze-direct', async (req, res) => {
  // This endpoint will receive the audio as base64 and handle the multipart form manually
  let body = '';
  
  req.on('data', chunk => {
    body += chunk.toString();
  });
  
  req.on('end', async () => {
    try {
      const { audio, mimeType = 'audio/webm' } = JSON.parse(body);
      
      if (!audio) {
        return res.status(400).json({ error: 'No audio data provided' });
      }

      // Convert base64 to buffer
      const audioBuffer = Buffer.from(audio, 'base64');
      
      // Create form data with custom boundary for OpenAI
      const boundary = 'WebAppBoundary';
      const formData = [
        `--${boundary}`,
        'Content-Disposition: form-data; name="file"; filename="audio.webm"',
        `Content-Type: ${mimeType}`,
        '',
        audioBuffer.toString('binary'),
        `--${boundary}`,
        'Content-Disposition: form-data; name="model"',
        '',
        'whisper-1',
        `--${boundary}--`
      ].join('\r\n');

      // Use fetch to send to OpenAI with custom boundary
      const openaiResponse = await fetch('https://api.openai.com/v1/audio/transcriptions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': `multipart/form-data; boundary=${boundary}`,
        },
        body: formData,
      });

      if (!openaiResponse.ok) {
        const errorText = await openaiResponse.text();
        throw new Error(`OpenAI API error: ${openaiResponse.status} - ${errorText}`);
      }

      const transcription = await openaiResponse.json();
      
      // Continue with GPT analysis as before
      const feedbackResponse = await client.chat.completions.create({
        model: "gpt-4",
        messages: [
          { 
            role: 'system', 
            content: `You are an ESL speaking examiner. Provide clear, structured feedback.`
          },
          {
            role: 'user',
            content: `Please analyze this student's speech transcript and provide feedback:\n\n"${transcription.text}"`
          },
        ],
        max_tokens: 500,
      });

      res.json({ 
        transcript: transcription.text,
        feedback: feedbackResponse.choices[0].message.content 
      });

    } catch (error) {
      console.error('Direct analysis error:', error);
      res.status(500).json({ 
        error: 'Error analyzing audio: ' + (error.message || 'Unknown error')
      });
    }
  });
});

// Health check endpoint
app.get('/', (req, res) => {
  res.send('Server is up and running!');
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
