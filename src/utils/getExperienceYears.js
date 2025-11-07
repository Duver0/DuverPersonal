export const getExperienceYears = (startYear) => {
  if (!startYear) return 0;
  const currentYear = new Date().getFullYear();
  const raw = currentYear - startYear + 1;
  return raw < 1 ? 1 : raw;
};
