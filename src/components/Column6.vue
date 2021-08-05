<template>
  <div ref="chartBody" className="chart-body"></div>
</template>

<script>
import chartResize from "../util/chartResize";

export default {
  name: "Column6",
  components: {},
  mounted() {
    this.initChart();
    chartResize(this.myChart);
  },
  data() {
    return {
      myChart: null,
      chartOption: {}
    };
  },
  methods: {
    initChart() {
      let chartDom = this.$refs.chartBody;
      this.myChart = this.$echarts.init(chartDom);
      this.setOption();
    },
    setOption() {
      this.myChart.setOption(this.chartOption);
    },
    updateChart(param) {
      // console.log(param);
      const colorList = param.colors;
      const [xAxisName] = param.xAxis;
      const [yAxisName] = param.yAxis;
      this.chartOption = {
        tooltip: {},
        legend: {
          data: [xAxisName]
        },
        xAxis: {
          data: param.data.map(item=>item[xAxisName])
        },
        yAxis: {},
        series: [{
          name: xAxisName,
          type: "bar",
          data: param.data.map(item=>item[yAxisName]),
          itemStyle: {
            //柱形图圆角，初始化效果
            borderRadius: [5, 5, 0, 0],
            label: {
              show: true//是否展示
            },
            color: function(params) {
              return colorList[params.dataIndex];
            }
          },
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)"
            }
          }
        }]
      };
      this.setOption();
    }
  }
};
</script>

<style scoped>
.chart-body {
  width: 100%;
}
</style>