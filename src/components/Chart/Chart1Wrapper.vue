/* eslint-disable */



<!-- // county_name,kg_of_collected_waste -->

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
          this.data = result.data;
          this.drawChart();
        },
      });
    },
    drawChart() {
      const chartElement = this.$refs.chart;
      const myChart = echarts.init(chartElement);
      const groupedData = this.groupDataBycounty_name();
      const sortedData = groupedData.sort((a, b) => b.totalWeight - a.totalWeight);
      const maxDisplayCount = 15; // 设置最多显示的数量
      const selectedData = sortedData.slice(0, maxDisplayCount);
      const remainingData = sortedData.slice(maxDisplayCount);
      const remainingTotalWeight = remainingData.reduce((sum, group) => sum + group.totalWeight, 0);

      const chartData = selectedData.map((group) => ({
        county_name: group.county_name,
        totalWeight: group.totalWeight,
      }));

      if (remainingTotalWeight > 0) {
        chartData.push({
          county_name: '其他',
          totalWeight: remainingTotalWeight,
        });
      }







      
      const option = {
        title: {
          text: 'county_name & kg_of_collected_waste',
        },
        xAxis: {
          type: 'category',
          data: chartData.map((data) => data.county_name),
          axisLabel: {
    interval: 0, // 0 表示所有标签都显示
    // 可以根据需要设置其他属性
  },
        },
        yAxis: {
          type: 'value',
        },
        series: [
          {
            data: chartData.map((data) => data.totalWeight),
            type: 'bar',
          },
        ],
      };

      myChart.setOption(option);
    },
    groupDataBycounty_name() {
      const groupedData = {};
      for (const record of this.data) {
        const county_name = String(record.county_name);
        if (!groupedData[county_name]) {
          groupedData[county_name] = {
            county_name: county_name,
            totalWeight: 0,
          };
        }
        groupedData[county_name].totalWeight += parseFloat(record.kg_of_collected_waste);
      }

      return Object.values(groupedData);
    },
  },
};
</script>