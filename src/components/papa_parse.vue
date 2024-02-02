<template>
  <h5>load Sample1000.csv</h5>
<!--  <div>-->
<!--    <input type="file" @change="handleFileChange"/>-->
<!--  </div>-->
<!--  <div>-->
<!--    <button @click="handleDataByCounty_name">计算得每个省的垃圾分布</button>-->
<!--    <div >{{geoData_county}}</div>-->
<!--  </div>-->
</template>

<script>
import Papa from 'papaparse'


// eslint-disable-next-line no-unused-vars
//这里只能引入组件
//import data from '../assets/Sample1000.csv' 这个非法引用
export default {

  // eslint-disable-next-line vue/multi-word-component-names
  name: "papa_parse",
  data(){
    return{
      results:[],
      points:[],
      geoData:[],
      geoData_county:[]
    }
  },
  mounted() {
    this.readData()
    //console.log("length",this.geoData.length)
    //this.categorizeData(this.geoData)
  },
  updated(){
    console.log("update")
    this.results=[1,23,3]
    //
  },
  methods:{
    handleFileChange(event){
      const file = event.target.files[0]
      console.log("file",file)
      Papa.parse(file, {
        // download: true,
        // header: true,
        complete: (results)=>{
          console.log("input读取",results)
          //这里进行csv文件处理
          //results是一个数组，他会一直读csv文件读到最后行的后一空行
          //this.results=results
          // console.log(this.results.data)
          //获取出地理位置
          var points=[]
          var type=[{personal_use:"",fisheries:"",industrial:"",hygiene:"",others:""}]
         // var kg_of_collected_waste=[]
          var object=[{}]
          for(var i=1;i<results.data.length-1;i++)
          {
            //console.log(this.results.data.length)
            // console.log(results.data[i][28])
            const inputString =results.data[i][28];
            // 使用正则表达式匹配坐标值
            const regex = /POINT\(([^ ]+) ([^ ]+)\)/;
            const match =  inputString.match(regex);
            var result=[]
            if (match) {
              const x = parseFloat(match[1]);
              const y = parseFloat(match[2]);
              result = [x, y];
              //console.log(result);
            } else {
              console.log("无法解析坐标值。");
            }
            points[i]=result
            var temType={}
            temType.personal_use=parseInt(results.data[i][29])
            temType.fisheries=parseInt(results.data[i][30])
            temType.industrial=parseInt(results.data[i][31])
            temType.hygiene=parseInt(results.data[i][32])
            temType.others=parseInt(results.data[i][33])
            type.push(temType)
            var temkg=parseInt(results.data[i][7])
            var temObject={}
            temObject.type=temType
            temObject.point=result
            temObject.kg_of_collected_waste=temkg
            object.push(temObject)
          }
          console.log('ob:  ',object)
          console.log('tpye  ',type)
            console.log('point:   ',points)
          //this.points.push(points)
         // console.log('papa:   ',this.points)
          this.$emit("getObject",object)
        }
      })
    },
    readData(){
      var   data=[]
      //引入文件../assets/Sample1000.csv
     // console.log(data)
      //input读取csv文件是将每个值的属性变成一个数组，data[0]，其他Array失去了每个值对应的属性名（变成了text流）
      //而通过引用，下载下来后，保存了每个值的属性名，没有损失（直接引用保留了特征名）
      Papa.parse('Sample1000.csv', {
        download: true,
        header: true,
        complete: (results)=>{
        console.log('直接引用',results)
          //遍历data
          for(var i=0;i<results.data.length-1;i++)
          {
            //接下来将获取数据中的经纬度坐标
            const inputString =results.data[i].geom_wkt
            // 使用正则表达式匹配坐标值
            const regex = /POINT\(([^ ]+) ([^ ]+)\)/;
            const match =  inputString.match(regex);
            var result=[]
            if (match) {
              const x = parseFloat(match[1]);
              const y = parseFloat(match[2]);
              result = [x, y];
              //console.log(result);
            } else {
              console.log("无法解析坐标值。");
            }
            results.data[i].value=result
            //将想要传输的数据放到geoData里面
            var temType= {}
            temType.personal_use=parseInt(results.data[i].personal_use)
            temType.fisheries=parseInt(results.data[i].fisheries)
            temType.industrial=parseInt(results.data[i].industrial)
            temType.hygiene=parseInt(results.data[i].hygiene)
            temType.others=parseInt(results.data[i].others)
            var tem={}
            tem.name=results.data[i].id
            tem.value=result
            tem.type=temType
            tem.kg_of_collected_waste=parseInt(results.data[i].kg_of_collected_waste)
            tem.county_name=results.data[i].county_name
            // 输入的日期字符串
            var dateString =results.data[i].startdate
            // 使用正则表达式提取年份部分
            var yearMatch = dateString.match(/\d{4}/);
            // 获取年份部分
            var year =  yearMatch ? yearMatch[0] : null;
            tem.startData=parseInt(year)
            this.geoData.push(tem)
            data.push(tem)
          }
          //作用域！！！！！！！
          console.log("length::",data.length)
          console.log("geoData",this.geoData)
          this.$emit("getGeoData",this.geoData)
          this.handleDataByCounty_name(this.geoData)
        }
  })

},
    handleDataByCounty_name(data){
      //console.log(county_name)
      // console.log(this.geoData)
      // console.log(this.geoData.length)
     //var data3=this.geoData
     // console.log(data)
      this.categorizeData(data)
      let result = [];
      data.forEach(item=>{
        //console.log("item=",item)
        if (result[item.county_name]) {
          result[item.county_name].personal_use= result[item.county_name].personal_use+item.type.personal_use;
          result[item.county_name].fisheries= result[item.county_name].fisheries+item.type.fisheries;
          result[item.county_name].industrial= result[item.county_name].industrial+item.type.industrial;
          result[item.county_name].hygiene= result[item.county_name].hygiene+item.type.hygiene;
          result[item.county_name].others= result[item.county_name].others+item.type.others;
        } else {
          result[item.county_name] =item.type;
        }
      })
      this.geoData_county=result
     console.log("this county",result)
      //console.log(result.length)
      //将result以数值的形式存储data2里
      var data2=[]
      for(var county in result){
       // console.log(county)
       var tem={county_name:county.toString(),
         data:[
           {value:result[county].personal_use,name:'personal_use'},
           { value:result[county].fisheries,name:'fisheries'},
           {value:result[county].industrial,name:'industrial'},
           {value:result[county].hygiene,name:'hygiene'},
           {value:result[county].others,name:'others'}
           ]}
        data2.push(tem)
      }
        console.log("this county",data2)
      this.$emit("geoData_county",data2)
//
//      var mergedData = data.reduce((result, current) => {
//         // 查找已有数据中是否存在相同的 countyname
//         const existingData = result.find(item => item.county_name === current.county_name);
//
//         if (existingData) {
//           // 如果找到相同的 countyname，则将对应的数值相加
//           existingData.type.personal_use += current.type.personal_use;
//           existingData.type.fisheries += current.type.fisheries;
//           existingData.type.industrial += current.type.industrial;
//           existingData.type.hygiene += current.type.hygiene;
//           existingData.type.others += current.type.others;
//           existingData.kg_of_collected_waste += current.kg_of_collected_waste;
//         } else {
//           // 如果没有找到相同的 countyname，则将当前对象添加到结果数组中
//           result.push({ ...current });
//         }
//
//         return result;
//       }, []);
//       console.log('mergedData:  ',mergedData);
//       console.log('mergedData:  ',mergedData.length)
//
//       // //升序
//       // var temMergedData = mergedData
//       // temMergedData.sort((a, b) => a.kg_of_collected_waste - b.kg_of_collected_waste);
//       // 计算 radius 的范围
//       const minRadius = 10;
//       const maxRadius = 35;
//
// // 计算每个对象对应的 radius
//       const radiusArray = mergedData.map((data) => {
//         const radius = minRadius + (data.kg_of_collected_waste /84433 ) * (maxRadius - minRadius);
//         // maxValue 是 kg_of_collected_waste 的最大值
//         return radius;
//       });
//       console.log('radiusArray:  ',radiusArray)
    },
    categorizeData(data) {
      this.groupByDate(data)
      const categories = ['personal_use', 'fisheries', 'industrial', 'hygiene', 'others'];
      // 创建一个对象来存储每个类别的数组
      const categorizedData = categories.reduce((acc, category) => {
        acc[category] = [];
        return acc;
      }, {});
      console.log('categorizedData:  ', categorizedData);
      data.forEach(item => {
        categories.forEach(category => {
          if (item.type[category] !== 0) {
            // 深拷贝对象，避免修改原始数据
            const newItem = JSON.parse(JSON.stringify(item));
            // 重置type对象，只包含当前的category
            newItem.type = { [category]: item.type[category] };
            // 将新对象添加到对应类别的数组中
            categorizedData[category].push(newItem);
          }
        });
      });
      this.$emit("getCategorizedData",categorizedData)
      console.log('categorizedData:  ', categorizedData);
    },
    groupByDate(data){
      // 使用 reduce 方法按照 startData 属性进行分类
      var date=[]
      var groupedByStartDate = data.reduce(function (acc, obj) {
        var key = obj.startData;
        // 如果该 startData 对应的数组不存在，则创建一个空数组
        if (!acc[key]) {
          acc[key] = [];
         date.push(key)
        }

        // 将当前对象添加到对应的数组中
        acc[key].push(obj);

        return acc;
      }, {});

     // 将结果转换为数组形式
     //  var resultArray = Object.values(groupedByStartDate);
     //  console.log('groupedByStartData:  ', groupedByStartDate[2020])
      // console.log('date:',date)
      // console.log('resultArray:',resultArray)
      date.sort((a, b) => a - b)
      this.$emit("getGroupedByStartDate",groupedByStartDate,date)
      this.$emit("getDate",date)
    }

},
  complete(){
    // console.log("complete")

  }

}
</script>


<style scoped>
.test{
  color:red
}
</style>