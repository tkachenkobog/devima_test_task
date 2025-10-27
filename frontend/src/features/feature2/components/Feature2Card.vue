<script setup lang="ts">
import { ElCard, ElButton } from "element-plus";

import { useFeature2Store } from "@/features/feature2";

const feature2Store = useFeature2Store();
</script>

<template>
  <ElCard class="card">
    <span>Feature 2 check</span>
    <p>Count: {{ feature2Store.count }}</p>
    <ElButton type="primary" @click="feature2Store.increment">Check style upd && store +1</ElButton>
  </ElCard>
</template>

<style scoped>
.card {
  margin: 10px;
}
</style>
