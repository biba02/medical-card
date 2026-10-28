import { Router } from 'express';
import { requireAuth } from '../middleware/auth.middleware.js';
import { prisma } from '../db.js';

const router = Router();

router.get('/me', requireAuth, async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: { id: true, email: true, role: true, createdAt: true }
    });
    if (!user) return res.status(404).json({ message: 'Користувача не знайдено.' });
    return res.json({ user });
  } catch (error) {
    next(error);
  }
});

export default router;
