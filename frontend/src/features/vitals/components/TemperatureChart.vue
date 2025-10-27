<script setup lang="ts">
import * as echarts from "echarts";
import { ElCard } from "element-plus";
import { ref, onMounted, onUnmounted, watch } from "vue";

import { useVitalsStore } from "@/features/vitals";

const chartRef = ref<HTMLElement | null>(null);
let chartInstance: echarts.ECharts | null = null;

const vitalsStore = useVitalsStore();

const setupChart = () => {
  if (chartRef.value) {
    chartInstance = echarts.init(chartRef.value);
    updateChart();
  }
};

const updateChart = () => {
  if (chartInstance) {
    const history = vitalsStore.getVitalsHistory;
    const dataCount = history.length;
    const targetLabels = 8;
    const interval = Math.max(0, Math.floor(dataCount / targetLabels) - 1);
    const fullTimestamps = vitalsStore.chartFullTimestamps;

    const option = {
      tooltip: {
        trigger: "axis",
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
        },
      },
      yAxis: {
        type: "value",
        name: "Temperature (°C)",
        min: 36,
        max: 41,
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
    chartInstance.setOption(option);
  }
};

watch(() => vitalsStore.vitals, updateChart, { deep: true });

onMounted(() => {
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
