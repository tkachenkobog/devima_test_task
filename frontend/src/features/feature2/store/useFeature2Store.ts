import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useFeature2Store = defineStore("feature2", () => {
  const count = ref(0);
  const getCount = computed(() => count.value);
  function increment() {
    count.value++;
  }

  return { count, getCount, increment };
});
