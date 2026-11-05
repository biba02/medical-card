import { Router } from 'express';
import { requireAuth } from '../middleware/auth.middleware.js';

import {
  listVisits,
  visitDetails,
  addVisit,
  removeVisit
} from '../controllers/visits.controller.js';

const router = Router();

router.use(requireAuth);

router.get('/', listVisits);
router.get('/:id', visitDetails);
router.post('/', addVisit);
router.delete('/:id', removeVisit);

export default router;