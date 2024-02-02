// eslint-disable-next-line vue/multi-word-component-names
<template>
  <div>
    <div ref="chart" style="width: 100%; height: 400px;"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts';

export default {
  data() {
    return {
      hours: ['number_of_waste_bags', 'kg_of_collected_waste'],
      days: ['number_of_waste_bags', 'handout_gloves', 'handout_wastebags', 'kg_of_collected_waste'],
      data: [
      ['number_of_waste_bags', 'number_of_waste_bags', 1.0000],
      ['number_of_waste_bags', 'handout_gloves', 0.028508],
      ['number_of_waste_bags', 'handout_wastebags', 0.022796],
      ['number_of_waste_bags', 'kg_of_collected_waste', 0.292232],

      ['kg_of_collected_waste', 'kg_of_collected_waste', 1.0000],
      ['kg_of_collected_waste', 'handout_gloves', 0.106558],
      ['kg_of_collected_waste', 'handout_wastebags', 0.094806],
      ['kg_of_collected_waste', 'number_of_waste_bags', 0.292232],
         ],
      
    };
  },
  mounted() {
    this.drawChart();
  },
  methods: {
    drawChart() {
      const chartElement = this.$refs.chart;
      const myChart = echarts.init(chartElement);

      const option = {
        tooltip: {
          position: 'top',
          formatter: (params) => {
            return `${params.value}`;
          },
        },
        grid: {
          height: '50%',
          top: '10%',
        },
        xAxis: {
          type: 'category',
          data: this.hours,
          splitArea: {
            show: true,
          },
        },
        yAxis: {
          type: 'category',
          data: this.days,
          splitArea: {
            show: true,
          },
        },
        visualMap: {
          min: 0,
          max: 1,
          calculable: true,
          orient: 'horizontal',
          left: 'center',
          bottom: '15%',
        },
        series: [
          {
            name: 'Correlation Matrix',
            type: 'heatmap',
            data: this.data,
            label: {
              show: true,
            },
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowColor: 'rgba(0, 0, 0, 0.5)',
              },
            },
          },
        ],
      };

      myChart.setOption(option);
    },
  },
};
</script>
