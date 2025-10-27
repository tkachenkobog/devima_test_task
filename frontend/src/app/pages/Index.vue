<script setup lang="ts">
import { onMounted, onUnmounted } from "vue";

import { PatientCard } from "@/features/patient";
import { useVitalsStore } from "@/features/vitals";
import HeartRateChart from "@/features/vitals/components/HeartRateChart.vue";
import OxygenSaturationChart from "@/features/vitals/components/OxygenSaturationChart.vue";
import TemperatureChart from "@/features/vitals/components/TemperatureChart.vue";

const vitalsStore = useVitalsStore();
let intervalId: number;

onMounted(() => {
  vitalsStore.generateInitialVitals();
  intervalId = setInterval(() => {
    vitalsStore.fetchVitals("1234");
  }, 3000);
});

onUnmounted(() => {
  clearInterval(intervalId);
});
</script>

<template>
  <div class="dashboard">
    <PatientCard />
    <TemperatureChart />
    <HeartRateChart />
    <OxygenSaturationChart />
  </div>
</template>

<style scoped lang="scss">
.dashboard {
  display: grid;
  grid-template-columns: repeat(2, 440px);
  gap: 20px;
  padding: 20px;
  max-width: 1400px;
}

@media (max-width: 768px) {
  .dashboard {
    grid-template-columns: 1fr;
  }
}
</style>