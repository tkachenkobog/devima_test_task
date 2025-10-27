<script setup lang="ts">
import { ElCard, ElButton } from "element-plus";

import { useFeature1Store } from "@/features/feature1";

const feature1Store = useFeature1Store();
</script>

<template>
  <ElCard class="card">
    <span>Feature 1 check</span>
    <p>Count: {{ feature1Store.count }}</p>
    <ElButton type="primary" @click="feature1Store.increment">Check style upd && store +1</ElButton>
  </ElCard>
</template>

<style scoped>
.card {
  margin: 10px;
}
</style>
