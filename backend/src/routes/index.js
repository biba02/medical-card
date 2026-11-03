import { Router } from 'express';
import authRoutes from './auth.routes.js';
import userRoutes from './users.routes.js';

const router = Router();
router.get('/health', (_req, res) => res.json({ status: 'ok', service: 'MedCard API', version: 'v1' }));
router.use('/auth', authRoutes);
router.use('/users', userRoutes);
export default router;
