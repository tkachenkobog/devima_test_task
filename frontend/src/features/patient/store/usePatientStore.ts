import { defineStore } from "pinia";
import { ref, computed } from "vue";

import { getPatient } from "../api";

interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
}

export const usePatientStore = defineStore("patient", () => {
  const patient = ref<Patient | null>(null);

  const getPatientInfo = computed(() => patient.value);

  async function fetchPatient(id: string) {
    patient.value = await getPatient(id);
  }

  return { patient, getPatientInfo, fetchPatient };
});
