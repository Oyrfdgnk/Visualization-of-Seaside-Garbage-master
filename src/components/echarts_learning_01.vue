<template>
<div ref="mychart01" class="myDiv"></div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  name: "echarts_learning_01",
  mounted() {
    let myEcharts=echarts.init(this.$refs.mychart01)
    //配置选项是一个对象
    let option={
      //设置title配置(图标的标题)
      title:{
        text:'主标题',
        link:"",//设定主标题超链接
        sublink:"",//设定主标题超链接
        target:'self',//设置跳转方式
        backgroundColor:'pink',
        borderColor:'red',
        borderWidth:5,
        x:'center',//水平剧中
        subtext:"副标题",
        textStyle:{
          color:"blue",
          fontSize:20
        },
        subtextStyle:{
          color: 'yellow',
        }
      },
      xAxis:{
        data:["EZ",'VN','noc','MF']
      },
      yAxis:{
        //data:[400,3200,5800,6400]
      },
      tooltip:{
        //默认样式是显示，series中的name，data；xAxis.data值，
        //触发类型
        trigger:"axis",
        axisPointer:{
          type: "shadow",//cross,line
        },
        backgroundColor: "pink",
        borderColor: "red",
        textStyle: {
          color:"blue"
        },
        //自定义提示框信息
        formatter(){

        }
      },
      series:{
        name:"lol",
        //type属性最重要，他表示图标的类型
        type:"bar",//柱状图
        //x对应的值
        data:[6400,5800,3200,400]
      }
    }
    myEcharts.setOption(option)
  }
}
</script>

<style scoped>
.myDiv{
  width: 500px;
  height: 500px;
  border: 1px solid red;
}
</style>