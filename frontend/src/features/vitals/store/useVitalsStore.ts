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

  async function fetchVitals(id: string) {
    const newVitals = await getVitals(id);
    vitals.value.push(newVitals);
  }

  return { vitals, getVitalsHistory, fetchVitals };
});
