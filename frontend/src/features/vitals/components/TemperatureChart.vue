<script setup lang="ts">
import * as echarts from "echarts";
import { ElCard } from "element-plus";
import { ref, onMounted, onUnmounted, watch, computed, nextTick } from "vue";

import { useVitalsStore } from "@/features/vitals";
import { useThemeStore } from "@/store/useThemeStore";

const chartRef = ref<HTMLElement | null>(null);
let chartInstance: echarts.ECharts | null = null;

const vitalsStore = useVitalsStore();
const themeStore = useThemeStore();

const chartOptions = computed(() => {
  const isDark = themeStore.isDark;
  const history = vitalsStore.getVitalsHistory;
  const dataCount = history.length;
  const targetLabels = 8;
  const interval = Math.max(0, Math.floor(dataCount / targetLabels) - 1);
  const fullTimestamps = vitalsStore.chartFullTimestamps;

  const textColor = isDark ? "#f5f5f5" : "#333";
  const tooltipBgColor = isDark ? "#2a2a2a" : "#fff";
  const tooltipBorderColor = isDark ? "#4a4a4a" : "#ccc";

  return {
    tooltip: {
      trigger: "axis",
      backgroundColor: tooltipBgColor,
      borderColor: tooltipBorderColor,
      textStyle: { color: textColor },
      //It's own EChart's recomendation - use any :D
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      formatter: (params: any) => {
        const param = Array.isArray(params) ? params[0] : params;
        const dataIndex = param.dataIndex;
        const fullDate = fullTimestamps[dataIndex];
        const value = Array.isArray(param.value) ? param.value[1] : param.value;
        const marker = '<span class="chart-marker chart-marker--temperature"></span>';
        return `${fullDate}<br/>${marker}${param.seriesName}: ${value}°C`;
      },
    },
    xAxis: {
      type: "category",
      data: vitalsStore.chartTimestamps,
      axisLabel: {
        interval: interval,
        color: textColor,
      },
    },
    yAxis: {
      type: "value",
      name: "Temperature (°C)",
      min: 36,
      max: 41,
      axisLabel: { color: textColor },
      nameTextStyle: { color: textColor },
    },
    series: [
      {
        name: "Temperature",
        type: "line",
        showSymbol: false,
        data: vitalsStore.chartTemperatures,
        lineStyle: {
          color: "#5c379a",
        },
      },
    ],
  };
});

const setupChart = () => {
  if (chartRef.value) {
    chartInstance = echarts.init(chartRef.value);
    updateChart();
  }
};

const updateChart = () => {
  if (chartInstance) {
    chartInstance.setOption(chartOptions.value);
  }
};

watch([() => vitalsStore.vitals, () => themeStore.isDark], updateChart, { deep: true });

onMounted(async () => {
  await nextTick();
  setupChart();
  window.addEventListener("resize", resizeChart);
});

onUnmounted(() => {
  if (chartInstance) {
    chartInstance.dispose();
  }
  window.removeEventListener("resize", resizeChart);
});

const resizeChart = () => {
  chartInstance?.resize();
};
</script>

<template>
  <ElCard>
    <div ref="chartRef" class="chart"></div>
  </ElCard>
</template>

<style lang="scss" scoped>
.chart {
  height: 400px;
}
</style>
