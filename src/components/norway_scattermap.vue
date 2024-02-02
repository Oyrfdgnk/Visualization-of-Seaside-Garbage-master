<template>
  <div>
    <Papa_parse @getGeoData="setGeoData"
                @getCategorizedData="setScatterData"
                @geoData_county="setPieData"
                @getGroupedByStartDate="setStartDate"
                @getDate="setTimeTitle">
    </Papa_parse>
    <button @click="drawScatter">Load Scatter</button>
    <button @click="drawPie">Load Pie Chart</button>
    <button @click="reset">Load original map</button>
    <button @click="drawHeatMap">Load HeatMap</button>
    <button @click="drawTimeScatter">Load Time Scatter</button>
    <button @click="drawTimeHeatMap">Load Time HeatMap</button>
    <div>Select data seriesType: {{ seriesType }}</div>
    <input type="radio" id="scatter" value="scatter" v-model="seriesType" />
    <label for="scatter">scatter</label>
    <input type="radio" id="heatMap" value="heatMap" v-model="seriesType" />
    <label for="heatMap">heatMap</label>
    <div>Picked: {{ picked }}</div>
    <input type="radio" id="fisheries" value="fisheries" v-model="picked" />
    <label for="fisheries">fisheries</label>
    <input type="radio" id="hygiene" value="hygiene" v-model="picked" />
    <label for="hygiene">hygiene</label>
    <input type="radio" id="personal_use" value="personal_use" v-model="picked" />
    <label for="personal_use">personal use</label>
    <input type="radio" id="industrial" value="industrial" v-model="picked" />
    <label for="industrial">industrial</label>
    <input type="radio" id="others" value="others" v-model="picked" />
    <label for="others">others</label>
    <input type="radio" id="all" value="all" v-model="picked" />
    <label for="all">all</label>
    <div ref="Map" id="main"></div>
  </div>
</template>


<script>
import * as echarts from 'echarts'
import NorwaymapJson1 from '../assets/json/NorwayMap.json'

import Papa_parse from "@/components/papa_parse";
export default {
  name: "norway_scattermap",

  components: {
    Papa_parse}
  ,
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
        {name:'1',value:[11.5358, 58.868,9],type:{personal_use: 20, fisheries: 39, industrial: 20, hygiene: 0, others: 12},symbolSize: 10},
        { name: 'Point 1', value: [12.5358, 56.868,9], type: { personal_use: 10, fisheries: 5, industrial: 20, hygiene: 8, others: 15 } },
        { name: 'Point 2', value: [10.5358, 59.868,9], type: { personal_use: 5, fisheries: 12, industrial: 18, hygiene: 7, others: 10 } },
        // ... 更多散点数据
      ],
      mycharts:null,
      pieData:[],
      fisheriesData:[],
      hygieneData:[],
      industrialData:[],
      personalData:[],
      othersData:[],
      heatdata:[[6.595407938897836, 67.06621414564643,0]],
      picked:'',
      geoData:[],
      isDraw:false,
      timeTitle:[],
      startDate:[],
      seriesType:'',
      data:[],
    }
  },
  mounted() {
    const myChart=echarts.init(this.$refs.Map);
    this.mycharts=myChart;
    this.initMap()
  },
  methods:{
    /**
     * 初始化地图
     * */
    initMap(){
      //初始化一个echarts容器
     const myChart =this.mycharts;
      //注册地图
      echarts.registerMap('norway', NorwaymapJson1);
      let geo_labelFontSize=10;
      let option={
        // graphic: {
        //   type: 'image',
        //   id: 'mapBackground',
        //   left: 'center', // 根据需要调整位置
        //   top: 'center', // 根据需要调整位置
        //   z: 10, // 将图片放在最底层
        //   bounding: 'raw',
        //   origin: [0, 0],
        //   style: {
        //     image: 'visualmap.png', // 地图图片的URL
        //     width: 1024,
        //     height: 768,
        //     // 根据需要调整图片大小
        //   }
        // },
        geo:{
          type: 'map',
          map:'norway',//用上述注册地图
          roam: true,//是否允许缩放
          zoom:8,//初始化大小
          scaleLimit:{
            min:1,
            max:500,
          },
          label:{
            show:true,
            fontSize:geo_labelFontSize
          },
          //backgroundImage:'public/visualmap.png',
          //设置中心点
          center:[6.595407938897836,67.06621414564643],
          //省份地图添加背景
          regions: this.regions,
          itemStyle: {
            areaColor: 'white',
            //areaColor:{},
            color: 'red',
            borderColor: '#232652',
            borderWidth: 2,
          },
          zlevel: 0,
          //高亮状态
          emphasis: {
            itemStyle: {
              areaColor: '#1af',
              color: '#fff',
            },
          },
        },

      };
      myChart.setOption(option);

    },
    drawClear(){
      if(this.isDraw){
        console.log('series clear')
        this.reset()
        this.isDraw=false;
      }
    },
    drawScatter(){
      this.drawClear()
     let thisChart=this.mycharts;
     var newoption={
       tooltip:{
         trigger:"item",
         formatter(params){
           if(params.componentType==='series'&& params.seriesType==='scatter'){
             console.log('params:',params.data.value)
             const data = params.data; // 获取选中的散点数据
             const rubType = data.type; // 获取 rubType 对象
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
       //散点的配置属性
       series:{
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
             fontSize: 8, // 设置字体大小
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
         zlevel: 1,
         symbol: "image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAGFUlEQVR4nO2Ye2xTZRjGD723p/EPQ4LxD43sBtvabr2c75wzWGFhKJgYoiIEQRA16owQ5I8RNV4mqEi4BDGISoQA2yyMy8aEtesubGNbd2+pMkFMWMYGrGCikbjEPeY7u6QY0xvdtAlv8qQnadL8nve833PeU4a5X/frfsWlekQmzSvI1nlFuaNHlPl6ePntbkGObkGBLkHxa6cg93YKitJ2QbG+g1cnM/+HarcwSh8ve8EryjxeUQ6qHioJfAIenWPqkKREOxWv9HgE5Sr6G/8JvFeQP+kVZJd9ogxRwwtKtI3JIyh724hq8ZSBd+czrE+YdoCC3zu8Ch5ehVYqovqm28iwkwrvJcwMnyDrijs8r0ILr0Izr25rJuyMSYG/YGMe8gmy3smCb+HV1ACaeHVv3E1csDN6nyjrmGz482NqJOrOdguji58Bcdr+qYJvkqRBI9Hsj1vaTDk8P6p6Qf34PcHTjPaKsp+igW8mSrisSnxvUaDcPKrTFiWqLCo0cJHDN1ARTa9jKSOP2YBPkK2KFL6VV6DKosTeRQasfe8zLDjcAnKmXxK9Xvv+VnzxhEEy00gigsc5okWdTbMiZgNeUdYaCXwzUeAEx2JN0U5YqgMwu2//u5xDWP3Bdhy16lHHhYc/Rw1w2qaY4P2ESYm08xT+qS8r7oatDsBa1isp2xVAtusWspy3YKoKYPHnp+Cw6lFPQsPXUwNEO9JgVc+MpftvRjLzdGzWFO2SoPdduYOBO3/Bc7kPy9a8jHnz5iE3Nxdi/iJYN+2G6fQAjGcCMJwZwsp3t6Hcog4JP2YAtTbtazEYkJdEcmDpzNOxeaXjNwSX2+2G3W7H3LlzIYoieJ6H+bmXYKgYQGblEDLLB7Er34gaLjR8HdGhhtMeitpAtyDrDheVNG3ogaXd33Th97sMdHV1SfA5OTkQBAEcx8FqtcK4cQcyKm4ivfwmVhZuQYVFHRK+dlTtMRiQB8LlPI3KBUdaYa6+DdEdwOUrv0jww8PDKCwsxJw5cya6b7PZYDabYRRzkX5yELNP3kDOvgYcz1aHg6d34HosBobDPaRoxnOVfchy3YLZ8SPy8vJQUFCAJUuWSJ0PhrdYLMjKyoLRaMSsAz6knbiOzJKf4cjShIYnOriJ7s8YDCiGwz1hJQMVV6VkMZX+IAGPi44NIWQCPjs7W4LPzMxE2rc+pJYNIuPIJclAGHhUc+wfURvoFBSBcOsBfSjZDzaPJkvlDXDzF0rQVOMzPw5vMpkk+Nk2EamOfqQcHQS/pw7HsjUh4d2ERTWni36EOnh5V7jdhq4Hq9/5ZDRVKodg2rhjAnocfHxsKHx6ejrS3tiKZMeApOUbPsIpsyY0vGSA9URvQFAcDreY0d1mz0KDFInpNFmO98P09IsSNO04BTcYDMjIyJDgUxevQHJJH5K+G0BycR925BngtIWFh9PGHozaQLugKIhkq6Rj9Pzb2zD71A0pWWYd60f6um3I4HImwGdZBaS8/imSivsws/QaZpZcw9INH6NM6n5oeBdHP7WvxnAHNI+2CcqRcCsxXczobrNwexnSjl+XRA9oiqMfqV/3IOWrbiSV9iNpDPyx4muwb3ag2Kynsx0W3smxIy6L5pGoDUh3gVc2RbLP08XMYWWxvHAr0sYOKJ1xOipJpQMT4EmHruLZDVskeKctPLyLY1FlYxuYWMtDlMsifRmhixndbXYuMGD5W5tBdtch7eAlpB64BNuuGixbX4Tt8w3S2ETSeZfUfT1cRP9MzAZq7YzCIyj90bxJ0d2Grgf0CUsznopGJU2bSA6sKwi+yqbvuacXGlptRJ3fwqtGonyTCr8ehIPn9CNVHJvHxKNaiGrvVMI7Rw3sZuJV53lG28yrmqcOnm2qtTMaJp7VbtFPP0/UF6cA/mKtRT+dmYyi/5g18Wr/ZMGf5dhep6h9eFLgg0008hp/QsIHm2jgNf6EhA82UU+0/oSEH69qws6oI1p/QsIHm6glWn9Cwv/TRELCB5uoIVp/QsIHm3ATnT8h4YNNuGw6f0LCB5tw2nT+hIQfr7P8Aw86ObaoysZ+SK8nvrhfzF31N5yrHRKO9AxAAAAAAElFTkSuQmCC"
       },
      }

      thisChart.setOption(newoption);
     this.isDraw=true;
    },
    setGeoData(data){
      this.geoData=data;
      this.setHeatdata()
      this.setScatter()
    },
    setScatter(){
      var data=this.geoData;
      console.log("map_object:    ",data)
      console.log(data.length)
      for(var i=0;i<data.length;i++){
        var tem={
          name:data[i].name,
          value:data[i].value,
          type:data[i].type,
          kg_of_collected_waste:data[i].kg_of_collected_waste,
          county_name:data[i].county_name
        }
        this.scatter.push(tem)
      }
      console.log("scatter:   ",this.scatter)
    },
    setPieData(data){
      console.log('county',data)
      this.pieData=data;
    },
    drawPie(){
      this.drawClear()
      // eslint-disable-next-line no-unused-vars
      let thisChart=this.mycharts;
     const radius=[18.022041145049922,
      22.678099795103808,
      26.80504068314522,
      16.43824097213175,
      35,
      15.506140963841151,
      26.660251323534638,
      13.215567372946596,
      11.905949095732712,
      12.027643220067983, 11.12485639501143, 10.296092759939834, 10.03553113119278]
      //每个省的饼图中心点
      const center=[
        [4.732561,60.872091],
        [ 5.923173,59.301698],
        [ 13.645292,67.994069],
        [6.802845,62.784375 ],
        [ 22.448044,70.463485],
        [10.988482,59.128791 ],
        [8.027554,58.090047],
        [ 9.759097,58.983307],
        [10.700121,59.875606],
        [10.723020,64.673937 ],
        [10.974006,60.731743 ],
        [26.41126132293,70.798674760997],
        [15.6357942833288,78.2662080115]]
      // eslint-disable-next-line no-unused-vars
      var series=[]
      // eslint-disable-next-line no-unused-vars
      for(var i=0;i<this.pieData.length;i++)
      {
        // eslint-disable-next-line no-unused-vars
        var temseries = {
        name:this.pieData[i].county_name,
        type: 'pie',
        coordinateSystem: 'geo',
        data:this.pieData[i].data,
        center:center[i],
         // roseType: 'area',
        radius:radius[i],
        label: {
          show: false
        },
        labelLine: {
          show: false
        },
        animationDuration: 0,
          // itemStyle: {
          //   borderRadius: 5
          // },
          emphasis: {
            label: {
              show: true,
              fontSize: 5,
              fontWeight: 'bold'
            }
          },
    }
        series.push(temseries)
      }
      console.log(series)
      let newoption={
        series:series,
        tooltip: {
          trigger:"item",
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        legend: {
          top: '5%',
          left: 'center',
          // doesn't perfectly work with our tricks, disable it
          selectedMode: false
        },
      }
      thisChart.setOption(newoption);
      this.isDraw=true;
    },
    setScatterData(data){
      //console.log('typeData',data)
      // for(var i1=0;i1<data.fisheries.length;i2++){
      //   var tem1={
      //     name:data.fisheries[i1].name,
      //     value:data.fisheries[i1].value,
      //     rubType:data.fisheries[i1].type,
      //     kg_of_collected_waste:data.fisheries[i1].kg_of_collected_waste,
      //     county_name:data.fisheries[i1].county_name
      //   }
      //   this.fisheriesScatterData.push(tem1)
      // }
      // for(var i2=0;i2<data.hygiene.length;i2++){
      //     var tem2={
      //       name:data.hygiene[i2].name,
      //       value:data.hygiene[i2].value,
      //       rubType:data.hygiene[i2].type,
      //       kg_of_collected_waste:data.hygiene[i2].kg_of_collected_waste,
      //       county_name:data.hygiene[i2].county_name
      //     }
      //     this.hygieneScatterData.push(tem2)
      // }
      // for(var i3=0;i3<data.industrial.length;i3++){
      //   var tem3={
      //     name:data.industrial[i3].name,
      //     value:data.industrial[i3].value,
      //     rubType:data.industrial[i3].type,
      //     kg_of_collected_waste:data.industrial[i3].kg_of_collected_waste,
      //     county_name:data.industrial[i3].county_name
      //   }
      //   this.industrialScatterData.push(tem3)
      // }
      // for(var i4=0;i4<data.personal_use.length;i4++){
      //   var tem4={
      //     name:data.personal_use[i4].name,
      //     value:data.personal_use[i4].value,
      //     rubType:data.personal_use[i4].type,
      //     kg_of_collected_waste:data.personal_use[i4].kg_of_collected_waste,
      //     county_name:data.personal_use[i4].county_name
      //   }
      //   this.personalScatterData.push(tem4)
      // }
      // for(var i5=0;i5<data.others.length;i5++){
      //   var tem5={
      //     name:data.others[i5].name,
      //     value:data.others[i5].value,
      //     rubType:data.others[i5].type,
      //     kg_of_collected_waste:data.others[i5].kg_of_collected_waste,
      //     county_name:data.others[i5].county_name
      //   }
      //   this.othersScatterData.push(tem5)
      // }
      this.fisheriesData=data.fisheries;
      this.hygieneData=data.hygiene;
      this.industrialData=data.industrial;
      this.personalData=data.personal_use;
      this.othersData=data.others;
      this.data=data
      console.log('data:   ',data)
    },
    checkAndDrawData() {
      if (this.seriesType !== '' && this.picked !== '') {
        this.drawSelectData(this.picked, this.seriesType);
      }
    },
    drawSelectData(type,method){
      const colorType={
        hygiene:['#3498db', '#2980b9', '#2c3e50', '#1f2d3d'],
        fisheries:['#2ecc71', '#27ae60', '#16a085', '#1693a5'],
        industrial: [ '#9932cc','#ba55d3', '#9b59b6', '#dda0dd'],
        personal_use:[ '#ffd700', '#bcbd22', '#dbdb8d','#f9e79f'],
        others:['#e74c3c', '#c0392b', '#d35400', '#e67e22']
      }
      this.drawClear()
      var data=null
      if(type!==''){
      if(type==='hygiene'){
        data=this.hygieneData
      }
      else if(type==='personal_use'){
        data=this.personalData
      }else if(type==='fisheries'){
        data=this.fisheriesData
      }else if(type==='industrial'){
        data=this.industrialData
      }
      else if(type==='others'){
        data=this.othersData
      }
      else if(type==='all'){
       data=this.scatter
      }
      else { alert('输入不合法')
      }
      }
      if(data!=null){
      try {
        let thisChart=this.mycharts;
        if(method==='scatter'){
        var newoption={
          tooltip:{
            trigger:"item",
            formatter(params){
              if(params.componentType==='series'&& params.seriesType==='scatter'){
               // console.log('params:',params.data.value)
                const data = params.data; // 获取选中的散点数据
                const rubType = data.type; // 获取 rubType 对象
                const rubTypeKeys = [type];
                const barData = rubTypeKeys.map(key => rubType[key]);
                //简单样式输出
                var result='';
                for (var i=0;i<1;i++){
                  result+=rubTypeKeys[i]+': '+barData[i]+'<br />'
                }
                return result
              }
              else return ""
            }
          },
          //配置属性
          //散点的配置属性
          series:{
            type:'scatter',
            //type: 'effectScatter',
            coordinateSystem: 'geo',
            data: data,

            label: {
              //图形上的文本标签，可用于说明图形的一些数据信息，比如值，名称等，
              formatter: '{b}',
              position: 'right',
              show: true,
              textStyle: {
                // 设置标签的字体样式
                color: 'black', // 设置标签字体颜色（淡色）
                fontSize: 8, // 设置字体大小
                fontWeight: 'normal', // 设置字体粗细 bold,normal
              },
              color:'black'
            },
            itemStyle: {
              //图形样式，normal 是图形在默认状态下的样式；emphasis 是图形在高亮状态下的样式，比如在鼠标悬浮或者图例联动高亮时
              color:'red', //散点的颜色
              show: true,
              // shadowBlur: 0,
              // shadowColor:'transparent',
            },
            symbolSize: 7, // 设置散点的大小
            zlevel: 1,
            //symbol: "image://data:image/png;base64,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"
          },
        };}
        else if(method==='heatMap'){
          var heatData=[]
          data.forEach((item)=>{
            var tem=[item.value[0],item.value[1],item.type[type]]
            heatData.push(tem)
          })
          console.log('heatData:',heatData)
           newoption={
            //配置视图
            visualMap: {
              show: true,
              top: 'top',
              min: 0,
              max: 500,
              seriesIndex: 0,
              calculable: true,
              inRange: {
                color:  colorType[type].reverse()
              },
            },
            tooltip: {
              // trigger:"item",
            },
            //配置属性
            series: [{
              name:'heatmap',
              type: 'heatmap',
              coordinateSystem: 'geo',
              data:heatData,
              emphasis: {
                itemStyle: {
                  borderColor: '#333',
                  borderWidth: 1
                },
                zlevel:2
              },

            }],
          }
        }
        thisChart.setOption(newoption);
        this.isDraw=true
      } catch (error) {
        console.log('run this',error)
      }
      }
    },
    drawTimeScatter(){
      this.drawClear()
      let thisChart=this.mycharts;
      var newoption={
        baseOption:{
          timeline: {
            data: this.timeTitle,
            axisType: 'category',
            autoPlay: false,
            playInterval: 3000,
            left: '10%',
            right: '10%',
            bottom: '2%',
            width: '80%',
            label: {
              normal: {
                textStyle: {
                  color: 'rgb(179, 239, 255)'
                }
              },
              emphasis: {
                textStyle: {
                  color: '#fff'
                }
              }
            },
            symbolSize: 10,
            lineStyle: {
              color: '#8df4f4'
            },
            checkpointStyle: {
              borderColor: '#8df4f4',
              color: '#53D9FF',
              borderWidth: 2,
            },
            controlStyle: {
              showNextBtn: true,
              showPrevBtn: true,
              normal: {
                color: '#53D9FF',
                borderColor: '#53D9FF'
              },
              emphasis: {
                color: 'rgb(58,115,192)',
                borderColor: 'rgb(58,115,192)'
              }
            },
          },
          tooltip:{
            trigger:"item",
            formatter(params){
              if(params.componentType==='series'&& params.seriesType==='scatter'){
                //console.log('params:',params.data.value)
                const data = params.data; // 获取选中的散点数据
                const rubType = data.type; // 获取 rubType 对象
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
        },
        //变量则写在options中
        options: [],
      }
      this.timeTitle.forEach((item)=>{
       // console.log('this ',item,'  :',this.startDate[item])
       var title='In '+ item
      // console.log('title ',title)
        newoption.options.push({
          title:{
            text:title
          },
          series:[{
            name: '散点',
            type: 'scatter',
            coordinateSystem: 'geo',
            rippleEffect: {
              brushType: 'fill'
            },
            itemStyle: {
              normal: {
                color: 'red',
                shadowBlur: 10,
                shadowColor: '#333'
              }
            },
            data: this.startDate[item],
            symbolSize: 7,
            // symbolSize: function (val) {
            //   let value = val[2]
            //   if (value == max) {
            //     return 27
            //   }
            //   return 10
            // },
           // showEffectOn: 'render', //加载完毕显示特效
          }],

        })
      })
      thisChart.setOption(newoption);
      this.isDraw=true;
    },
    drawTimeHeatMap(){
      this.drawClear()
      var heatData={2020:[],2021:[],2022:[],2023:[],2024:[]}
      let thisChart=this.mycharts;
      let newoption={
        // //配置视图
        // visualMap: {
        //   show: true,
        //   top: 'top',
        //   min: 0,
        //   max: 1000,
        //   seriesIndex: -1,
        //   calculable: true,
        //   inRange: {
        //     color: ['blue', 'blue', 'green', 'yellow', 'red']
        //   },
        // },
        baseOption:{
          timeline: {
            data: this.timeTitle,
            axisType: 'category',
            autoPlay: false,
            playInterval: 3000,
            left: '10%',
            right: '10%',
            bottom: '2%',
            width: '80%',
            label: {
              normal: {
                textStyle: {
                  color: 'rgb(179, 239, 255)'
                }
              },
              emphasis: {
                textStyle: {
                  color: '#fff'
                }
              }
            },
            symbolSize: 10,
            lineStyle: {
              color: '#8df4f4'
            },
            checkpointStyle: {
              borderColor: '#8df4f4',
              color: '#53D9FF',
              borderWidth: 2,
            },
            controlStyle: {
              showNextBtn: true,
              showPrevBtn: true,
              normal: {
                color: '#53D9FF',
                borderColor: '#53D9FF'
              },
              emphasis: {
                color: 'rgb(58,115,192)',
                borderColor: 'rgb(58,115,192)'
              }
            },
          },

        },
        //变量则写在options中
        options: [

        ],
        //visualMap:[]
      }
      var i=0
     // var visualMaps=[]
      this.timeTitle.forEach((item)=>{
       // console.log('item',item)
       // console.log(this.startDate[item])
        this.startDate[item].forEach((item2)=>{
          //console.log('item2', item2)
          var tem=[item2.value[0],item2.value[1],item2.kg_of_collected_waste]
          //console.log(tem)
          heatData[item].push(tem)
        })
        var title='In '+ item
        // newoption.visualMap.push({
        //       min: 0,
        //       max: 3000,
        //     calculable: true,
        //     realtime: false,
        //     seriesIndex: i,
        //     inRange: {
        //   color: [
        //     '#313695',
        //     '#4575b4',
        //     '#74add1',
        //     '#abd9e9',
        //     '#e0f3f8',
        //     '#ffffbf',
        //     '#fee090',
        //     '#fdae61',
        //     '#f46d43',
        //     '#d73027',
        //     '#a50026'
        //   ]
        // }
        // })
        newoption.options.push({
          //配置视图
          title:{
            text:title,
            center:'center'
          },
          series:[{
            name:title,
            geoIndex:0,
            type: 'heatmap',
            coordinateSystem: 'geo',
            data:heatData[item],
          },
          ],
          visualMap:
        {
          type: 'continuous',
          min: 0,
              max: 3000,
            calculable: true,
            realtime: false,
            seriesIndex: i,
            inRange: {
          color: [
            '#313695',
            '#4575b4',
            '#74add1',
            '#abd9e9',
            '#e0f3f8',
            '#ffffbf',
            '#fee090',
            '#fdae61',
            '#f46d43',
            '#d73027',
            '#a50026'
          ]
        }
        },
        })
        i=i+1
        console.log(i)
      })
      console.log('newoption',newoption)
      thisChart.setOption(newoption);
      this.isDraw=true
    },
    drawHeatMap(){
      var type=['hygiene', 'fisheries', 'industrial', 'personal_use', 'others']
      // eslint-disable-next-line no-unused-vars
      const colorType={
        // hygiene:['#3498db', '#2980b9', '#2c3e50', '#1f2d3d'],
        // fisheries:['#2ecc71', '#27ae60', '#16a085', '#1693a5'],
        // industrial: [ '#9932cc','#ba55d3', '#9b59b6', '#dda0dd'],
        // personal_use:[ '#ffd700', '#bcbd22', '#dbdb8d','#f9e79f'],
        // others:['#e74c3c', '#c0392b', '#d35400', '#e67e22']
        fisheries:'green',
        industrial:'blue',
        personal_use:'yellow',
        others:'red',
        hygiene:'purple',
      }
      this.drawClear()
      let thisChart=this.mycharts;
      var visualMaps=[]
      var series=[]
      var i=0
      type.forEach((item)=>{
        var heatData=[]
        var data=this.data[item]
        console.log(item ,' data',data)
        data.forEach((item1)=>{
          var tem=[item1.value[0],item1.value[1],item1.type[item]]
          heatData.push(tem)
        })
        visualMaps.push({
          show:false,
            type: 'continuous',
            top: 'top',
            min: 0,
            max: 1000,
            seriesIndex: i,
            calculable: true,
            inRange: {
              color: colorType[item]
            },
        })
        series.push({
          name:item,
          type: 'heatmap',
          coordinateSystem: 'geo',
          data:heatData,
          emphasis: {
            itemStyle: {
              borderColor: '#333',
              borderWidth: 1
            },
          } ,
          zlevel:2,
        })
        i=i+1
      })
      var option={
        visualMap:visualMaps,
        series:series,
      }
      console.log('option',option)
      // eslint-disable-next-line no-unused-vars
      thisChart.setOption(option);
      this.isDraw=true
    },
    setHeatdata(){
      var data=this.geoData
      for(var i=1;i<data.length;i++){
        var value=[data[i].value[0],data[i].value[1],data[i].kg_of_collected_waste]
        var tem={name:i,value:value}
        this.heatdata.push(tem)
      }
      console.log('heat',this.heatdata)
    },
    // eslint-disable-next-line no-unused-vars
    reset(){
      this.mycharts.clear()
      this.initMap()
    },
    setStartDate(data){
      this.startDate=data
      console.log('StartDate data:',this.startDate)
    },
    setTimeTitle(data){
      this.timeTitle=data
      console.log('timeTitle',this.timeTitle)
    }

  },
  watch: {
    // eslint-disable-next-line no-unused-vars
    seriesType(newSeriesType, oldSeriesType) {
      this.checkAndDrawData();
    },
    // eslint-disable-next-line no-unused-vars
    picked(newPicked, oldPicked) {
      this.checkAndDrawData();
    },
  },
}
</script>

<style scoped>
#main{
  width: 1000px;
  height: 800px;
  border: 1px solid red;
}
</style>