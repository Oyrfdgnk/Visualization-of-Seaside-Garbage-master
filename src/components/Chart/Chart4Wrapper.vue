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
        teiner: 0,
        oljefat: 0,
        fulle_soppelbotter: 0,
        avfallsstasjon: 0,
        kloakkutslipp: 0,
        dumpet_avfall: 0
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
          this.data = result.data;
          this.computeCategoryCounts();
          this.drawChart();
        },
      });
    },
    computeCategoryCounts() {
      this.categoryCounts = {
        teiner: 0,
        oljefat: 0,
        fulle_soppelbotter: 0,
        avfallsstasjon: 0,
        kloakkutslipp: 0,
        dumpet_avfall: 0
      };
    

      this.data.forEach((row) => {
        for (const category in this.categoryCounts) {
          if (row[category]) {
            this.categoryCounts[category] += row[category];
          }
        }
      });
    },
    drawChart() {
      const chartElement = this.$refs.chart;
      const myChart = echarts.init(chartElement);
      const colors = ['blue', 'green', 'yellow', 'purple', 'orange', 'pink', 'cyan', 'magenta', 'brown'];

      const option = {
        backgroundColor: '#2c343c',
        title: {
          text: 'Municipility & pollutant',
          subtext: 'Vadso and Lindesnes',
          left: 'center',
          top: 20,
          textStyle: {
            color: '#ccc'
          }
        },
        tooltip: {
          trigger: 'item',
        },
        visualMap: {
          show: false,
          min: 80,
          max: 600,
          inRange: {
            colorLightness: [0, 1]
          }
        },
        legend: {
          left: 'center',
          top: 'bottom',
          data: [
            'serveringssteder',
            'turisme',
            'biltrafikk',
            'havn',
            'landbruk',
            'fiskeri_havbruk',
            'bygg_anlegg',
            'fisheries',
            'industrial',
            'hygiene',
            'others'
          ]
        },
        label: {
          color: 'rgba(255, 255, 255, 0.3)'
        },
        labelLine: {
          lineStyle: {
            color: 'rgba(255, 255, 255, 0.3)'
          },
          smooth: 0.2,
          length: 10,
          length2: 20
        },
        itemStyle: {
          color: '#c23531',
          shadowBlur: 200,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        },
        animationType: 'scale',
        animationEasing: 'elasticOut',
        animationDelay: function () {
          return Math.random() * 200;
        },
        series: [
          
          {
            name: 'Vadso',
            type: 'pie',
            radius: '55%',
            center: ['50%', '50%'],
            roseType: 'radius',
            itemStyle: {
              borderRadius: 5
            },
            data: Object.entries(this.categoryCounts).map(([name, value], index) => ({
              name,
              value,
              itemStyle: {
                color: colors[index % colors.length]
              }
            }))
          },
        ]
      };

      option && myChart.setOption(option);
    },
  },
};
</script>
