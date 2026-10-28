
import { prisma } from '../db.js';

export async function getVisits(patientId) {
  return prisma.visit.findMany({
    where: { patientId },
    orderBy: { visitDate: 'desc' }
  });
}

export async function getVisitById(patientId, visitId) {
  return prisma.visit.findFirst({
    where: {
      id: visitId,
      patientId
    }
  });
}

export async function createVisit(patientId, data) {
  return prisma.visit.create({
    data: {
      patientId,
      visitDate: data.visitDate,
      doctorName: data.doctorName,
      specialization: data.specialization,
      diagnosis: data.diagnosis,
      recommendations: data.recommendations
    }
  });
}
