<template>
  <div className="w-full">
    <div ref="chartBody" class="chart-body"></div>
  </div>
</template>

<script>
import { mixinChartResize, mixinGainColor, mixinPieChartClick } from "./extendjs/pie_mixin";

export default {
  name: "pie_1",
  mounted() {
    this.initChart();
  },
  data() {
    return {
      myChart: null,
      chartOption: {},
      chartData: {}
    };
  },
  props: ["layoutData"],
  mixins: [mixinChartResize, mixinGainColor, mixinPieChartClick],
  methods: {
    initChart() {
      let chartDom = this.$refs.chartBody;
      this.myChart = this.$echarts.init(chartDom);
      this.chartOption = {
        tooltip: {
          trigger: "item",
          formatter: "{b0}: {c0}万亩 {d0}%"
        },
        legend: {
          type: "scroll",
          top: "center",
          left: "60%",
          orient: "vertical",
          textStyle: {
            color: "#ccc",
            overflow: "truncate",
            fontSize: 14,
            lineHeight: 14
          }
        },
        series: [
          {
            type: "pie",
            radius: ["0", "60%"],
            center: ["30%", "50%"],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 6,
              borderColor: "#eee",
              borderWidth: 1
            },
            label: {
              show: false,
              position: "center"
            },
            emphasis: {
              label: {
                show: false,
                fontSize: "20",
                fontWeight: "bold"
              }
            },
            labelLine: {
              show: false
            }
          }
        ]
      };
    },
    setOption() {
      this.myChart.setOption(this.chartOption);
    },
    updateChart(chartData) {
      this.chartData = chartData;
      const [xAxis] = chartData.xAxis;
      const [yAxis1, yAxis2] = chartData.yAxis;
      const data = chartData.data.map((item, index) => {
        return {
          name: item[xAxis],
          value: item[yAxis1],
          m_percent: item[yAxis2],
          itemStyle: {
            color: this.gainColorByParam(item[xAxis], xAxis, index)
          }
        };
      });
      const legendData = data.map((item, index) => {
        return {
          name: item.name,
          textStyle: item.itemStyle
        };
      });
      const legendFormatter = (name) => {
        const findItem = data.find(t => t.name === name);
        return `${name} - ${findItem.value} - ${findItem.m_percent}%`;
      };
      this.chartOption.legend.formatter = legendFormatter;
      this.chartOption.legend.data = legendData;
      this.chartOption.series[0].name = xAxis;
      this.chartOption.series[0].data = data;

      this.setOption();
    },
  }
};
</script>

<style scoped>
.chart-body {
  width: 100%;
  height: 100%;
}
</style>