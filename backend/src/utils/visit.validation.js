
export function validateVisit(data) {
  if (!data || typeof data !== 'object' || Array.isArray(data)) {
    return false;
  }

  const {
    visitDate,
    doctorName,
    specialization,
    diagnosis,
    recommendations
  } = data;

  return (
    typeof visitDate === 'string' &&
    visitDate.trim().length > 0 &&
    !Number.isNaN(Date.parse(visitDate)) &&

    typeof doctorName === 'string' &&
    doctorName.trim().length > 0 &&
    doctorName.trim().length <= 150 &&
    /^[\p{L}\s'’ʼ-]+$/u.test(doctorName.trim()) &&

    typeof specialization === 'string' &&
    specialization.trim().length > 0 &&
    specialization.trim().length <= 100 &&

    (diagnosis == null || typeof diagnosis === 'string') &&
    (recommendations == null || typeof recommendations === 'string')
  );
}
