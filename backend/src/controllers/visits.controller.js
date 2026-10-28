
import {
  getVisits,
  getVisitById,
  createVisit
} from '../services/visits.service.js';

function isValidUuid(value) {
  return typeof value === 'string' &&
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(value);
}

export async function listVisits(req, res, next) {
  try {
    const visits = await getVisits(req.user.id);
    return res.json({ visits });
  } catch (error) {
    next(error);
  }
}

export async function visitDetails(req, res, next) {
  try {
    if (!isValidUuid(req.params.id)) {
      return res.status(400).json({
        message: 'Некоректний ідентифікатор візиту.'
      });
    }

    const visit = await getVisitById(req.user.id, req.params.id);

    if (!visit) {
      return res.status(404).json({
        message: 'Візит не знайдено.'
      });
    }

    return res.json({ visit });
  } catch (error) {
    next(error);
  }
}

export async function addVisit(req, res, next) {
  try {
    const {
      visitDate,
      doctorName,
      specialization,
      diagnosis,
      recommendations
    } = req.body ?? {};

    if (
      typeof visitDate !== 'string' ||
      !visitDate.trim() ||
      Number.isNaN(Date.parse(visitDate)) ||
      typeof doctorName !== 'string' ||
      !doctorName.trim() ||
      doctorName.trim().length > 150 ||
      typeof specialization !== 'string' ||
      !specialization.trim() ||
      specialization.trim().length > 100 ||
      (diagnosis != null && typeof diagnosis !== 'string') ||
      (recommendations != null && typeof recommendations !== 'string')
    ) {
      return res.status(400).json({
        message: 'Перевірте дату, ім’я лікаря та спеціалізацію.'
      });
    }

    const visit = await createVisit(req.user.id, {
      visitDate: new Date(visitDate),
      doctorName: doctorName.trim(),
      specialization: specialization.trim(),
      diagnosis: diagnosis ?? null,
      recommendations: recommendations ?? null
    });

    return res.status(201).json({
      message: 'Візит успішно збережено.',
      visit
    });
  } catch (error) {
    next(error);
  }
}
