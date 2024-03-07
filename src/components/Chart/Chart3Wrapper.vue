//startdate kg_of_collected_waste 


<template>
  <div>
    <input type="file" @change="handleFileUpload" accept=".csv" />
    <div ref="chart" style="width: 100%; height: 400px;"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts';
import Papa from 'papaparse';
import ecStat from 'echarts-stat';

export default {
  data() {
    return {
      data: null,
      option: null,
    };
  },
  mounted() {
    // Don't call drawChart here; it will be called after file upload and parsing
  },
  methods: {
    handleFileUpload(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const contents = e.target.result;
          this.parseCSV(contents);
        };
        reader.readAsText(file);
      }
    },
    parseCSV(csv) {
      Papa.parse(csv, {
        header: true,
        dynamicTyping: true,
        complete: (result) => {
          this.data = result.data;
          this.drawChart(); // Call drawChart after data is updated
        },
      });
    },
    drawChart() {
      if (!this.data) return; // Ensure data is available before drawing

      echarts.registerTransform(ecStat.transform.regression);
      this.option = {
        transform: {
              type: 'ecStat:regression',
              config: { method: 'polynomial', order: 3 },
            },
        title: {
          text: 'kg_of_collected_waste & start_date',
          subtext: '',
          left: 'center',
          sublink: 'https://github.com/ecomfe/echarts-stat',
          top: 16,
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
          },
        },
        xAxis: {
          data: this.data.map((item) => item.startdate),
          splitLine: {
            lineStyle: {
              type: 'dashed',
            },
          },
          splitNumber: 20,
        },
        yAxis: {
          min: -40,
          splitLine: {
            lineStyle: {
              type: 'dashed',
            },
          },
        },
        series: [
          {
            name: 'scatter',
            type: 'scatter',
            symbolSize: 5,
            data: this.data.map((item) => [item.startdate, item.kg_of_collected_waste]),
          },
          {
            name: 'line',
            type: 'line',
            smooth: true,
            symbolSize: 0.1,
            symbol: 'circle',
            label: { show: true, fontSize: 16 },
            labelLayout: { dx: -20 },
            encode: { label: 2, tooltip: 1 },
          },
        ],
      };

      this.renderChart();
    },
    renderChart() {
      const chartElement = this.$refs.chart;
      const myChart = echarts.init(chartElement);

      this.option && myChart.setOption(this.option);
    },
  },
};
</script>
