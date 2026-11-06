
import { describe, it, expect } from 'vitest';
import { validateVisit } from '../src/utils/visit.validation.js';

const validVisit = {
  visitDate: '2026-11-06T12:00:00.000Z',
  doctorName: 'Олена Коваль',
  specialization: 'Терапевт',
  diagnosis: 'Профілактичний огляд',
  recommendations: 'Пити більше води'
};

describe('MedCard — перевірка даних медичного візиту', () => {
  it('Приймає коректні дані візиту', () => {
    expect(validateVisit(validVisit)).toBe(true);
  });

  it('Відхиляє порожнє ім’я лікаря', () => {
    expect(validateVisit({
      ...validVisit,
      doctorName: ''
    })).toBe(false);
  });

  it('Відхиляє некоректну дату', () => {
    expect(validateVisit({
      ...validVisit,
      visitDate: 'invalid-date'
    })).toBe(false);
  });

  it('Відхиляє ім’я лікаря довше 150 символів', () => {
    expect(validateVisit({
      ...validVisit,
      doctorName: 'А'.repeat(151)
    })).toBe(false);
  });

  it('Відхиляє порожню спеціалізацію', () => {
    expect(validateVisit({
      ...validVisit,
      specialization: ''
    })).toBe(false);
  });
it('Відхиляє числове ПІБ лікаря (MED-46)', () => {
  const visit = {
    visitDate: '2026-11-07T16:00:00.000Z',
    doctorName: '1234567',
    specialization: 'Терапевт',
    diagnosis: 'ГРВ',
    recommendations: 'Пити більше води'
  };

  expect(validateVisit(visit)).toBe(false);
});
});
