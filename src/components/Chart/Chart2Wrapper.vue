<template>
  <div>
    <input type="file" @change="handleFileUpload" accept=".csv" />
    <div ref="chart" style="width: 100%; height: 400px;"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts';
import Papa from 'papaparse';

export default {
  data() {
    return {
      data: [],
      categoryCounts: {
        personal_use: 0,
        fisheries: 0,
        industrial: 0,
        hygiene: 0,
        others: 0
    },
    categoryCounts2: {
        personal_use: 0,
        fisheries: 0,
        industrial: 0,
        hygiene: 0,
        others: 0
    },
  };
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
      result.data.forEach((row) => {
        if (row.county_name === "Troms og Finnmark") {
          for (const category in this.categoryCounts) {
            if (this.categoryCounts[category] <= row[category]) {
              this.categoryCounts[category] = row[category] || 0 
            }
          }
        }
        if (row.county_name === "Nordland") {
          for (const category in this.categoryCounts2) {
            if (this.categoryCounts2[category] <= row[category]) {
              this.categoryCounts2[category] = row[category] || 0 
            }
          }
        }
      });
      this.data = result.data;
      this.drawChart();
    },
  });
},
drawChart() {
  const chartElement = this.$refs.chart;
  const myChart = echarts.init(chartElement);

  const option = {
    title: {
      text: 'County & Component',
      subtext: 'Vadso and Lindesnes',
      left: 'center'
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c} ({d}%)'
    },
    legend: {
      left: 'center',
      top: 'bottom',
      data: [
        'personal_use',
        'fisheries',
        'industrial',
        'hygiene',
        'others'
      ]
    },
    toolbox: {
      show: true,
      feature: {
        mark: { show: true },
        dataView: { show: true, readOnly: false },
        restore: { show: true },
        saveAsImage: { show: true }
      }
    },
    series: [
    {
        name: 'Nordland',
        type: 'pie',
        radius: [20, 140],
        center: ['75%', '50%'],
        roseType: 'area',
        itemStyle: {
          borderRadius: 5
        },
        data: Object.entries(this.categoryCounts2).map(([name, value]) => ({
          name,
          value
        }))
      },
      {
        name: 'Troms og Finnmark',
        type: 'pie',
        radius: [20, 140],
        center: ['25%', '50%'],
        roseType: 'area',
        itemStyle: {
          borderRadius: 5
        },
        data: Object.entries(this.categoryCounts).map(([name, value]) => ({
          name,
          value
        }))
      }
    ]
  };

  option && myChart.setOption(option);
},
  },
};
</script>