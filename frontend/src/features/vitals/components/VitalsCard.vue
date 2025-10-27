<script setup lang="ts">
import { ElCard } from "element-plus";
import { onMounted, onUnmounted } from "vue";

import { useVitalsStore } from "@/features/vitals";

const vitalsStore = useVitalsStore();

let intervalId: number;

onMounted(() => {
  vitalsStore.fetchVitals("1234");
  intervalId = setInterval(() => {
    vitalsStore.fetchVitals("1234");
  }, 2000);
});

onUnmounted(() => {
  clearInterval(intervalId);
});
</script>

<template>
  <ElCard class="card">
    <span>Vitals</span>
    {{ vitalsStore.vitals }}
  </ElCard>
</template>

<style scoped>
.card {
  margin: 10px;
}
</style>
