import dayjs from "dayjs";
import { defineStore } from "pinia";
import { ref, computed } from "vue";

import { getVitals } from "../api";

interface Vital {
  timestamp: string;
  heartRate: number;
  temperature: number;
  oxygenSaturation: number;
}

export const useVitalsStore = defineStore("vitals", () => {
  const vitals = ref<Vital[]>([]);

  const getVitalsHistory = computed(() => vitals.value);

  const formatTime = (timestamp: string) => {
    const now = dayjs();
    const diffSeconds = now.diff(dayjs(timestamp), "second");

    if (diffSeconds < 3) return "Now";
    if (diffSeconds < 60) return `-${diffSeconds}s`;
    return `-${Math.floor(diffSeconds / 60)}m`;
  };

   const formatFullTime = (timestamp: string) => {
   return dayjs(timestamp).format("DD.MM.YYYY HH:mm");
  };

  const generateInitialVitals = () => {
    vitals.value = Array.from({ length: 7 }, (_, i) => ({
      timestamp: dayjs().subtract(6 - i, "minute").toISOString(),
      heartRate: 75 + Math.floor(Math.random() * 15),
      temperature: parseFloat((36.5 + Math.random()).toFixed(1)),
      oxygenSaturation: 95 + Math.floor(Math.random() * 5),
    }));
  };

  const chartTimestamps = computed(() =>
    vitals.value.map((vital) => formatTime(vital.timestamp)),
  );

   const chartFullTimestamps = computed(() =>
    vitals.value.map((vital) => formatFullTime(vital.timestamp)),
  );

  const chartTemperatures = computed(() =>
    vitals.value.map((vital) => vital.temperature),
  );

  const chartHeartRates = computed(() =>
    vitals.value.map((vital) => vital.heartRate),
  );

  const chartOxygenSaturations = computed(() => {
    const saturations = vitals.value.map((vital) => vital.oxygenSaturation);
    return saturations;
  });

  async function fetchVitals(id: string) {
    const newVitals = await getVitals(id);
    vitals.value.push(newVitals);
  }

  return {
    vitals,
    getVitalsHistory,
    fetchVitals,
    generateInitialVitals,
    chartTimestamps,
    chartFullTimestamps,
    chartTemperatures,
    chartHeartRates,
    chartOxygenSaturations,
  };
});
