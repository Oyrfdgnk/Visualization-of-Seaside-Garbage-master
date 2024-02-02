<template>
  <div>
    <h3>实现地图下钻</h3>
    <papa_parse @getObject="setScatter"></papa_parse>
    <button @click="darwMap">drawMap</button>
    <div id="tooltip" class="tooltip"></div>
    <div ref="Map" id="main"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts'
// eslint-disable-next-line no-unused-vars
import NorwayJSON from "../assets/json/norway-with-regions_.json"
// eslint-disable-next-line no-unused-vars
import NorwaymapJson1 from '../assets/json/NorwayMap.json'
// eslint-disable-next-line no-unused-vars
// eslint-disable-next-line no-unused-vars
import mapJson2 from '../assets/json/kommuner_komprimert.json'
import papa_parse from "@/components/papa_parse";
export default {
  name: "Norway_map",
  components:{
    papa_parse,
  },
  data(){
    return{
      regions:[
        {
          name:"Troms",
          itemStyle: {
            areaColor: '#374ba4',
            opacity: 1,
          }
        },
        {
          name:'Aust-Agder',
          itemStyle: {
            areaColor: '#fe9b45',
            opacity: 1,
          },
        },
        {
          name: 'Buskerud',
          itemStyle: {
            areaColor: '#ffc556',
            opacity: 1,
          },
        },
      ],

      scatter:[
        {name:'1',value:[11.5358, 58.868,9],rubType:{personal_use: 20, fisheries: 39, industrial: 20, hygiene: 0, others: 12},symbolSize: 10},
        { name: 'Point 1', value: [12.5358, 56.868,9], rubType: { personal_use: 10, fisheries: 5, industrial: 20, hygiene: 8, others: 15 } },
        { name: 'Point 2', value: [10.5358, 59.868,9], rubType: { personal_use: 5, fisheries: 12, industrial: 18, hygiene: 7, others: 10 } },
        // ... 更多散点数据
      ],
      chartID:'bar-chart-' + Math.random().toString(36).substr(2, 9)
    }
  },
  mounted() {
    this.darwMap()
  },
  methods:{
    darwMap(){
      //初始化一个echarts容器
      const myChart=echarts.init(this.$refs.Map);
      echarts.registerMap('norway',NorwaymapJson1)
      // eslint-disable-next-line no-unused-vars
      var geo_labelFontSize=10;
      // eslint-disable-next-line no-unused-vars
      myChart.on("click",params=>{

        if (params.componentType === 'geo'){
          console.log('name',params.name)
          console.log( 'target',params.event.target)
          console.log(params)

          var clickJson=this.getProvinceGeoJsonByName(params.name)
          console.log(params.name,'json:',clickJson)
         var center=this.getCenterByname(params.name)
          var mapName=params.name+'Submap'
          echarts.registerMap(mapName,clickJson)
          myChart.setOption({
            geo:{
              type: 'map',
              map:mapName,//用上述注册地图
              zoom:1,
              center:center,
            }
          })
        }
      })
      var option={
        geo:{
          type: 'map',
          map:'norway',//用上述注册地图
          roam: true,//是否允许缩放
          zoom:8,//初始化大小
          scaleLimit:{
            min:0.5,
            max:500,
          },
          label:{
            show:true,
            fontSize:geo_labelFontSize
          },
          //设置中心点
          center:[6.595407938897836,
            67.06621414564643],
          //省份地图添加背景
          regions: this.regions,
          itemStyle: {
            areaColor: 'white',
            //areaColor:{},
            color: 'red',
            borderColor: '#232652',
            borderWidth: 2,
          },
          //高亮状态
          emphasis: {
            itemStyle: {
              areaColor: '#1af',
              color: '#fff',
            },
          },
          zlevel:1
        },
        tooltip:{
          trigger:"item",
          formatter(params){
            if(params.componentType==='series'&& params.seriesType==='scatter'){
              //console.log('params:',params.data.value)
              const data = params.data; // 获取选中的散点数据
              const rubType = data.rubType; // 获取 rubType 对象
              const rubTypeKeys = ['personal_use', 'fisheries', 'industrial', 'hygiene', 'others'];
              const barData = rubTypeKeys.map(key => rubType[key]);
              //简单样式输出
              var result='';
              for (var i=0;i<5;i++){
                result+=rubTypeKeys[i]+': '+barData[i]+'<br />'
              }
              return result
            }
            else return ""
          }
        },
        //配置属性
        series:[{
          type:'scatter',
          //type: 'effectScatter',
          coordinateSystem: 'geo',
          data: this.scatter,
          showEffectOn: 'render',
          rippleEffect: {
            //涟漪特效相关配置
            brushType: 'stroke', //波纹的绘制方式，可选 'stroke' 和 'fill'
          },
          hoverAnimation: true, //是否开启鼠标 hover 的提示动画效果
          label: {
            //图形上的文本标签，可用于说明图形的一些数据信息，比如值，名称等，
            formatter: '{b}',
            position: 'right',
            show: true,
            textStyle: {
              // 设置标签的字体样式
              color: 'black', // 设置标签字体颜色（淡色）
              fontSize: 10, // 设置字体大小
              fontWeight: 'normal', // 设置字体粗细 bold,normal
            },
            color:'black'
          },
          itemStyle: {
            //图形样式，normal 是图形在默认状态下的样式；emphasis 是图形在高亮状态下的样式，比如在鼠标悬浮或者图例联动高亮时
            //color:'white', //散点的颜色
            show: true,
            // shadowBlur: 0,
            // shadowColor:'transparent',
          },

          symbolSize: 10, // 设置散点的大小
          zlevel: 2,
          symbol: "image://data:image/png;base64,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"
        }],

      }
      myChart.setOption(option)
    },
    setScatter(data){
      console.log("map_object:    ",data)
      console.log(data.length)
      for(var i=1;i<data.length;i++){
        var tem={name:i,value:data[i].point,rubType:data[i].type,symbolSize: 12}
        this.scatter.push(tem)
      }
      console.log("scatter:   ",this.scatter)
    },
    getRandomColor(){
      // 生成随机的 R、G 和 B 分量
      const r = Math.floor(Math.random() * 256); // 0 到 255
      const g = Math.floor(Math.random() * 256);
      const b = Math.floor(Math.random() * 256);

      // 将分量转换为十六进制，并保证字符串长度为 2
      const rHex = r.toString(16).padStart(2, '0');
      const gHex = g.toString(16).padStart(2, '0');
      const bHex = b.toString(16).padStart(2, '0');

      // 返回随机颜色的字符串表示，格式为 '#RRGGBB'
      return `#${rHex}${gHex}${bHex}`;
    },
    getProvinceGeoJsonByName(provinceName) {
      // 在 norwayJson 中查找指定省份的 feature
      var provinceFeature = NorwaymapJson1.features.find(function (feature) {
        // 假设省份名称存储在 feature 的 properties.name 中
        return feature.properties.name === provinceName;
      });

      // 返回包含指定省份 feature 的 GeoJSON 对象
      return {
        type: 'FeatureCollection',
        features: [provinceFeature]
      };
    },
    getCenterByname(provinceName){
      // eslint-disable-next-line no-unused-vars
      var provinceFeature = NorwaymapJson1.features.find(function (feature) {
        // 假设省份名称存储在 feature 的 properties.name 中
        return feature.properties.name === provinceName;
      });
    // var num1= Math.floor(Math.random() * (15 - 0 + 1)) + 0;
     // var num2= Math.floor(Math.random() * (15 - 0 + 1)) + 0;
      //var num3= Math.floor(Math.random() * (15 - 0 + 1)) + 0;
      var coordinates=provinceFeature.geometry.coordinates
      console.log('coordinates',coordinates[0][0][0])
      console.log('feature',provinceFeature)
      return coordinates[0][0][0]
    },

  }
}
</script>

<style scoped>
#main{
  width: 1000px;
  height: 800px;
  border: 1px solid red;
}
</style>