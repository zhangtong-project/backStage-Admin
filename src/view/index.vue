<template>
  <div>
    <div id="myChart" :style="{width: '100%', height: '5rem'}"></div>
  </div>
  
</template>

<script>
export default {
  name:"Home1",
  data() {
    return {

    }  
  },
  mounted(){
    this.drawLine();
  },
  methods:{
    drawLine(){
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('myChart'))
        // 绘制图表
        myChart.setOption({
          color: ["#003366", "#006699","red"],
          tooltip: {
              trigger: 'axis'
          },
          legend: {
              icon:'diamond',
              data: ['邮件营销', '联盟广告', '视频广告']
          },
          xAxis: {
              type: 'category',
              data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
          },
          yAxis: {
              type: 'value'
          },
          series: [{
              name:"邮件营销",
              data: [820, 932, 901, 934, 1290, 1330, 1320],
              type: 'line',
              smooth: true,
              // itemStyle: {
              //   normal: {
              //     color: 'black', //改变折线点的颜色
              //     lineStyle: {
              //       color: 'red' //改变折线颜色
              //     }
              //   }
              // },
          },
          {   
              name:"视频广告",
              data: [330, 780, 600, 800, 800, 260, 999],
              type: 'line',
              smooth: true
          },
          {   
              name:"联盟广告",
              data: [660, 660, 300, 350, 720, 460, 800],
              type: 'line',
              smooth: true
          }]
      });
    }
   } 
}
</script>

<style lang="less" scoped>
#myChart{
  margin-top: .3rem;
  float: right;
}
</style>

