import express from "express";
import path from "path";
import fs from "fs";
import multer from "multer";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, ThinkingLevel, GenerateContentResponse } from "@google/genai";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Ensure upload directory exists
  const uploadDir = path.join(process.cwd(), 'public', 'uploads');
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, uploadDir)
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  });
  const upload = multer({ storage: storage });

  // API route for file upload
  app.post("/api/upload", upload.single('file'), (req, res) => {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    // Return the public URL for the uploaded file
    res.json({ url: `/uploads/${encodeURIComponent(req.file.filename)}` });
  });

  // Serve uploads directory
  app.use('/uploads', express.static(uploadDir));

  // Initialize Gemini Client
  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });

  // API route for chat
  app.post("/api/chat", async (req, res) => {
    try {
      const { messages, useThinking } = req.body;
      
      if (!messages || !Array.isArray(messages)) {
        return res.status(400).json({ error: "Messages array is required" });
      }

      const model = useThinking ? "gemini-3.1-pro-preview" : "gemini-3.5-flash";
      const config: any = {
        systemInstruction: "Eres Tyti, un asistente virtual experto y amigable de 'Grupo Insamco S.A.S.', una empresa colombiana que comercializa e importa materias primas e insumos industriales (dióxido de titanio, resinas, cargas minerales, aditivos) para sectores de plásticos, pinturas y recubrimientos. Responde preguntas sobre nuestros productos, servicios, asesoría técnica y logística. Mantén un tono profesional, confiable e industrial, pero conversacional.",
      };

      if (useThinking) {
        config.thinkingConfig = { thinkingLevel: ThinkingLevel.HIGH };
      }

      const chat = ai.chats.create({
        model,
        config
      });

      // Send previous messages to build history, except the last one which is the new prompt
      // We need to pass history if possible, but `@google/genai` `ai.chats.create` handles history via `history` config or we just send the message.
      // Actually, `@google/genai` accepts history during creation.
      const formattedHistory = messages.slice(0, -1).map(msg => ({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.content }]
      }));
      
      const chatWithHistory = ai.chats.create({
        model,
        history: formattedHistory,
        config
      });

      const lastMessage = messages[messages.length - 1];

      // Streaming the response
      const streamResponse = await chatWithHistory.sendMessageStream({ message: lastMessage.content });

      res.setHeader('Content-Type', 'text/event-stream');
      res.setHeader('Cache-Control', 'no-cache');
      res.setHeader('Connection', 'keep-alive');

      for await (const chunk of streamResponse) {
        const c = chunk as GenerateContentResponse;
        if (c.text) {
          res.write(`data: ${JSON.stringify({ text: c.text })}\n\n`);
        }
      }

      res.write('data: [DONE]\n\n');
      res.end();

    } catch (error: any) {
      console.error("Error in chat endpoint:", error);
      res.status(500).json({ error: error.message || "Internal server error" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
