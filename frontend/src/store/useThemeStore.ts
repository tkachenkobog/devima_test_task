import { defineStore } from "pinia";
import { ref, computed, watch } from "vue";

export const useThemeStore = defineStore("theme", () => {
  const theme = ref(localStorage.getItem("theme") || "light");

  const isDark = computed(() => theme.value === "dark");

  function toggleTheme() {
    theme.value = theme.value === "light" ? "dark" : "light";
  }

  watch(
    theme,
    (newTheme) => {
      localStorage.setItem("theme", newTheme);
      document.documentElement.className = newTheme;
    },
    { immediate: true },
  );

  return {
    theme,
    isDark,
    toggleTheme,
  };
});
