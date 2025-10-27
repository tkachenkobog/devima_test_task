import dayjs from "dayjs";

export interface Vital {
  timestamp: string;
  heartRate: number;
  temperature: number;
  oxygenSaturation: number;
}

let currentData = {
  heartRate: 100,
  temperature: 38.2,
  oxygenSaturation: 95,
};

function randomShift(value: number, range: number, min: number, max: number): number {
  const shift = (Math.random() - 0.5) * range;
  return Math.min(Math.max(value + shift, min), max);
}

export function generateVital(): Vital {
  currentData = {
    heartRate: randomShift(currentData.heartRate, 6, 70, 130),
    temperature: randomShift(currentData.temperature, 0.3, 37, 40),
    oxygenSaturation: randomShift(currentData.oxygenSaturation, 2, 75, 99),
  };

  return {
    timestamp: dayjs().toISOString(),
    heartRate: Math.round(currentData.heartRate),
    temperature: +currentData.temperature.toFixed(1),
    oxygenSaturation: Math.round(currentData.oxygenSaturation),
  };
}

export const patientData = {
  id: "1234",
  name: "House M.D.",
  age: 42,
  gender: "male",
};