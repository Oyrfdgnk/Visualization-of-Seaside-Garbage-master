// eslint-disable-next-line vue/multi-word-component-names


<!-- ['number_of_waste_bags', 'number_of_waste_bags'],
['number_of_waste_bags', 'handout_gloves'],
['number_of_waste_bags', 'handout_wastebags'],
 -->




<template>
  <div>
    <div ref="chart" style="width: 100%; height: 400px;"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts';

export default {
  name: 'CompositeDataQualityScoreByYearAndMonth',

  data() {
    return {
      hours: ['January', 'February','March','April','May','June','July','August','September','October','November','December'],
      days: ['2021', '2020', '2019', '2018','2017','2016','2015','2014','2013','nan'],
      data: [
      ['January', '2021', 3.57],
  ['January', '2020', 1.80],
  ['January', '2019', 4.00],
  ['January', '2018', 6.39],
  ['January', '2017', 6.97],
  ['January', '2016', 7.78],
  ['January', '2015', 9.80],
  ['January', '2014', 5.43],
  ['January', '2013', 5.43],
  ['January', 'nan', 0.00],

  ['February', '2021', 3.29],
  ['February', '2020', 2.05],
  ['February', '2019', 4.24],
  ['February', '2018', 4.81],
  ['February', '2017', 5.31],
  ['February', '2016', 3.91],
  ['February', '2015', 6.72],
  ['February', '2014', 0.00],
  ['February', '2013', 0.00],
  ['February', 'nan', 0.00],

  ['March', '2021', 3.47],
  ['March', '2020', 3.83],
  ['March', '2019', 3.74],
  ['March', '2018', 4.15],
  ['March', '2017', 6.56],
  ['March', '2016', 6.07],
  ['March', '2015', 8.02],
  ['March', '2014', 0.00],
  ['March', '2013', 0.00],
  ['March', 'nan', 0.00],

  ['April', '2021', 4.23],
  ['April', '2020', 3.74],
  ['April', '2019', 2.13],
  ['April', '2018', 4.53],
  ['April', '2017', 6.26],
  ['April', '2016', 6.29],
  ['April', '2015', 7.49],
  ['April', '2014', 0.00],
  ['April', '2013', 0.00],
  ['April', 'nan', 0.00],

  ['May', '2021', 5.28],
  ['May', '2020', 2.89],
  ['May', '2019', 6.54],
  ['May', '2018', 3.79],
  ['May', '2017', 7.97],
  ['May', '2016', 7.62],
  ['May', '2015', 10.25],
  ['May', '2014', 3.64],
  ['May', '2013', 0.00],
  ['May', 'nan', 0.00],

  ['June', '2021', 4.17],
  ['June', '2020', 3.11],
  ['June', '2019', 5.44],
  ['June', '2018', 5.02],
  ['June', '2017', 4.06],
  ['June', '2016', 5.33],
  ['June', '2015', 7.40],
  ['June', '2014', 0.00],
  ['June', '2013', 0.00],
  ['June', 'nan', 0.00],

  ['July', '2021', 3.28],
  ['July', '2020', 2.99],
  ['July', '2019', 3.87],
  ['July', '2018', 3.94],
  ['July', '2017', 4.66],
  ['July', '2016', 2.59],
  ['July', '2015', 5.94],
  ['July', '2014', 0.00],
  ['July', '2013', 0.00],
  ['July', 'nan', 0.00],

  ['August', '2021', 3.48],
  ['August', '2020', 2.73],
  ['August', '2019', 3.81],
  ['August', '2018', 4.38],
  ['August', '2017', 4.73],
  ['August', '2016', 3.44],
  ['August', '2015', 5.85],
  ['August', '2014', 4.04],
  ['August', '2013', 0.00],
  ['August', 'nan', 0.00],

  ['September', '2021', 3.34],
  ['September', '2020', 2.62],
  ['September', '2019', 4.85],
  ['September', '2018', 5.01],
  ['September', '2017', 4.73],
  ['September', '2016', 5.17],
  ['September', '2015', 5.79],
  ['September', '2014', 0.00],
  ['September', '2013', 0.00],
  ['September', 'nan', 0.00],

  ['October', '2021', 2.97],
  ['October', '2020', 2.41],
  ['October', '2019', 3.78],
  ['October', '2018', 4.27],
  ['October', '2017', 4.66],
  ['October', '2016', 3.65],
  ['October', '2015', 5.92],
  ['October', '2014', 0.00],
  ['October', '2013', 0.00],
  ['October', 'nan', 0.00],

  ['November', '2021', 1.20],
  ['November', '2020', 2.57],
  ['November', '2019', 3.28],
  ['November', '2018', 3.97],
  ['November', '2017', 4.20],
  ['November', '2016', 3.51],
  ['November', '2015', 4.87],
  ['November', '2014', 0.00],
  ['November', '2013', 0.00],
  ['November', 'nan', 0.00],

  ['December', '2021', 2.66],
  ['December', '2020', 2.68],
  ['December', '2019', 3.88],
  ['December', '2018', 4.01],
  ['December', '2017', 4.54],
  ['December', '2016', 3.70],
  ['December', '2015', 5.98],
  ['December', '2014', 0.00],
  ['December', '2013', 0.00],
  ['December', 'nan', 0.00],

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
    title: {
      text: 'Composite Data Quality Score by Year and Month',
      left: 'center', // 居中显示
      textStyle: {
        fontSize: 16,
        fontWeight: 'bold',
      },
    },
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
      max: 12,
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
            shadowColor: 'rgba(1, 0, 0, 1)',
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

<style scoped>
/* Your custom styles */
</style>