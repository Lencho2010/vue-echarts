<template>
  <div ref="chartBody" class="chart-body"></div>
</template>

<script>
import chartResize from "../util/chartResize";

export default {
  name: "Pie2",
  components: {},
  mounted() {
    this.initChart();
    chartResize(this.myChart);
  },
  data() {
    return {
      myChart: null,
      chartOption: {
        tooltip: {
          trigger: "item"
        },
        series: [
          {
            selectedOffset: 10,
            selectedMode: "single",
            type: "pie",
            radius: ["30%", "60%"],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 5,
              borderColor: "#ccc",
              borderWidth: 2
            },
            select: {
              itemStyle: {
                color: "rgba(3, 38, 64, 1)"
              }
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
      this.myChart.on("click", this.chartClick);
      this.setOption();
    },
    setOption() {
      this.myChart.setOption(this.chartOption);
    },
    updateChart({data}) {
      const tData = data.map(item => ({
        ...item,
        selected: false,
        itemStyle: {
          color: item.color
        }
      }));
      this.chartOption.series[0].data = tData;
      this.setOption();
    },
    chartClick({ data, dataIndex }) {
      const dataArr = this.chartOption.series[0].data;
      dataArr.forEach((item, index) => {
        item.selected = index === dataIndex;
      });
      dataArr[dataIndex].selected = data.selected = !data.selected;
      this.setOption();
      // console.log(data);
    }
  }
};
</script>

<style scoped>
.chart-body {
  width: 100%;
}
</style>