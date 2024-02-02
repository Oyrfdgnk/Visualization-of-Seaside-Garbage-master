<template>
    <div>
      <input type="file" @change="handleFileUpload" accept=".csv" />
      <div id="chart" style="width: 1000px; height: 600px;"></div>
    </div>
  </template>
  
  <script>
  import * as echarts from 'echarts';
  import Papa from 'papaparse';
  
  export default {
    data() {
      return {
        data: [],
        categories: [],
        myChart: null,
        app: {
          count: 11,
        },
      };
    },
    mounted() {
      this.myChart = echarts.init(document.getElementById('chart'));
      this.drawChart();
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
            this.categories = result.data.map((data) => data.startdate);
            this.data = result.data.map((data) => data.kg_of_collected_waste);
            this.sortChartData();
            this.drawChart();
          },
        });
      },
      sortChartData() {
        // Add sorting logic here if needed
      },
      drawChart() {
        const option = {
          title: {
            text: 'Dynamic Data',
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
              label: {
                backgroundColor: '#283b56',
              },
            },
          },
          legend: {},
          toolbox: {
            show: true,
            feature: {
              dataView: { readOnly: false },
              restore: {},
              saveAsImage: {},
            },
          },
          dataZoom: {
            show: false,
            start: 0,
            end: 100,
          },
          xAxis: [
            {
              type: 'category',
              boundaryGap: true,
              data: this.categories,
            },
            {
              type: 'category',
              boundaryGap: true,
              data: this.categories,
            },
          ],
          yAxis: [
            {
              type: 'value',
              scale: true,
              name: 'kg_of_collected_waste',
              min: 0,
              boundaryGap: [0.2, 0.2],
            },
            {
              type: 'value',
              scale: true,
              name: 'kg_of_collected_waste',
              min: 0,
              boundaryGap: [0.2, 0.2],
            },
          ],
          series: [
            {
              name: 'Dynamic Bar',
              type: 'bar',
              xAxisIndex: 1,
              yAxisIndex: 1,
              data: this.data,
            },
            {
              name: 'Dynamic Line',
              type: 'line',
              data: this.data,
            },
          ],
        };
  
        this.myChart.setOption(option);
  
        setInterval(() => {
          let axisData = new Date().toLocaleTimeString().replace(/^\D*/, '');
          this.data.shift();
          this.data.push(Math.round(Math.random() * 1000));
          this.data.shift();
          this.data.push(+(Math.random() * 10 + 5).toFixed(1));
          this.categories.shift();
          this.categories.push(axisData);
          this.categories.shift();
          this.categories.push(this.app.count++);
          this.myChart.setOption({
            xAxis: [
              {
                data: this.categories,
              },
              {
                data: this.categories,
              },
            ],
            series: [
              {
                data: this.data,
              },
              {
                data: this.data,
              },
            ],
          });
        }, 2100);
      },
    },
  };
  </script>
  