
import { Router } from 'express';
import { requireAuth } from '../middleware/auth.middleware.js';

import {
  listVisits,
  visitDetails,
  addVisit
} from '../controllers/visits.controller.js';

const router = Router();

router.use(requireAuth);

router.get('/', listVisits);
router.get('/:id', visitDetails);
router.post('/', addVisit);

export default router;
