<template>
    <div ref="chartBody" class="chart-body">{{ chartContent }}</div>
</template>

<script>
import chartResize from "../util/chartResize";
export default {
  name: "Pie2",
  components: { },
  mounted() {
    this.initChart();
    chartResize(this.myChart);
    this.$http('http://localhost:3000/testJs/chartM.js').then(({data})=>{
      eval(data)
      logM()
    })
  },
  data() {
    return {
      chartContent: "我是饼状图2",
      myChart: null,
      chartOption: {
        tooltip: {
          trigger: "item"
        },
        series: [
          {
            // selectedMode: "single",
            type: "pie",
            radius: ["30%", "60%"],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 5,
              borderColor: "#ccc",
              borderWidth: 2
            }
          }
        ]
      }
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
    async updateChart(data) {
      const tData = data.map(item => ({
        ...item, itemStyle: {
          color: item.color
        }
      }));
      this.chartOption.series[0].data = tData;
      this.setOption();
    }
  }
};
</script>

<style scoped>
.chart-body {
  color: #cccccc;
  text-align: center;
  vertical-align: middle;
  line-height: 250px;
  font-size: 24px;
  width: 100%;
  height: calc(100% - 20px);
}
</style>