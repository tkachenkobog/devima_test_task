import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useFeature1Store = defineStore("feature1", () => {
  const count = ref(0);
  const getCount = computed(() => count.value);
  function increment() {
    count.value++;
  }

  return { count, getCount, increment };
});
