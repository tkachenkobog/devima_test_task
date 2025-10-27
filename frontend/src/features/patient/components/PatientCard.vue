<script setup lang="ts">
import { ElCard } from "element-plus";
import { onMounted } from "vue";

import patientImage from "@/assets/patient.webp";
import { usePatientStore } from "@/features/patient";

const patientStore = usePatientStore();

onMounted(() => {
  patientStore.fetchPatient("1234");
});
</script>

<template>
  <ElCard class="card">
    <div class="img-box">
      <img :src="patientImage" alt="Patient Image" class="patient-image" />
    </div>
    <div v-if="patientStore.patient" class="patient-data">
      <p><strong>Name:</strong> {{ patientStore.patient.name }}</p>
      <p><strong>Age:</strong> {{ patientStore.patient.age }}</p>
      <p><strong>Gender:</strong> {{ patientStore.patient.gender }}</p>
    </div>
  </ElCard>
</template>

<style scoped>
.card {
  height: 100%;
  max-width: 450px;
}

:deep(.el-card__body) {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.img-box {
  flex-grow: 1;
  display: flex;
  max-height: 320px;
  justify-content: center;
  align-items: center;
}

.patient-image {
  max-width: 100%;
  max-height: 100%;
  border-radius: 6px;
}

.patient-data {
  text-align: center;
  padding-top: 16px;
}
</style>