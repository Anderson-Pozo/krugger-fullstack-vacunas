
export const VACCINATION_STATUS = {
  VACUNADO: "VACUNADO",
  NO_VACUNADO: "NO_VACUNADO",
};


export const statusOptions = Object.entries(VACCINATION_STATUS).map(([key, value]) => ({
  name: key,
  code: value,
}));

export const vaccineTypeOptions = [
  { name: "SPUTNIK", code: "SPUTNIK" },
  { name: "ASTRAZENECA", code: "ASTRAZENECA" },
  { name: "PFIZER", code: "PFIZER" },
  { name: "JOHNSON & JOHNSON", code: "JOHNSON & JOHNSON" },
  { name: "MODERNA", code: "MODERNA" },
  { name: "SINOVAC", code: "SINOVAC" },
  { name: "OTRO", code: "OTRO" },
];