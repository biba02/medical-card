import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { connectDb, prisma } from './db.js';
import apiRouter from './routes/index.js';

const app = express();
const port = Number(process.env.PORT || 5000);
const allowedOrigins = (process.env.FRONTEND_URL || 'http://localhost:3000').split(',').map((v) => v.trim());

app.use(cors({
  origin(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error('CORS: origin is not allowed'));
  },
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json({ limit: '20kb' }));
app.get('/', (_req, res) => res.json({ name: 'MedCard API', docs: '/api/v1/health' }));
app.use('/api/v1', apiRouter);

app.use((err, _req, res, _next) => {
  console.error(err.message);
  const status = Number(err.status) || (err.message?.includes('CORS') ? 403 : 500);
  res.status(status).json({ message: status === 500 ? 'Внутрішня помилка сервера.' : err.message });
});

async function start() {
  if (!process.env.DATABASE_URL || !process.env.JWT_SECRET) {
    throw new Error('Перевірте DATABASE_URL і JWT_SECRET у файлі .env');
  }
  await connectDb();
  app.listen(port, () => console.log(`MedCard API listening at http://localhost:${port}`));
}

start().catch(async (error) => {
  console.error('Server startup failed:', error.message);
  await prisma.$disconnect();
  process.exit(1);
});

process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit(0);
});
