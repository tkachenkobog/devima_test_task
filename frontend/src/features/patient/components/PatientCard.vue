<script setup lang="ts">
import { ElCard } from "element-plus";
import { onMounted } from "vue";

import { usePatientStore } from "@/features/patient";

const patientStore = usePatientStore();

onMounted(() => {
  patientStore.fetchPatient("1234");
});
</script>

<template>
  <ElCard class="card">
    <div v-if="patientStore.patient">
      <p>Name: {{ patientStore.patient.name }}</p>
      <p>Age {{ patientStore.patient.age }}</p>
      <p>Gender{{ patientStore.patient.gender }}</p>
    </div>
  </ElCard>
</template>

<style scoped>
.card {
  margin: 10px;
}
</style>
