<template>
  <div class="w-full">
    <!--    <remote-js src="http://localhost:3000/testJs/data1006.js"></remote-js>-->
    <div ref="chartBody" class="chart-body"></div>
  </div>
</template>

<script>
import chartResize from "../util/chart-resize";

export default {
  name: "pie_2",
  components: {
    "remote-js": {
      render(h) {
        return h("script", { attrs: { type: "text/javascript", src: this.src } });
      },
      props: {
        src: { type: String, required: true }
      }
    }
  },
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
  mixins: [],
  methods: {
    initChart() {
      let chartDom = this.$refs.chartBody;
      this.myChart = this.$echarts.init(chartDom);
      chartResize(this.myChart, this.$refs.chartBody);
      this.chartOption = {
        tooltip: {
          trigger: "item",
          formatter: '{b0}: {c0}万亩 {d0}%'
        },
        legend: {
          type: "scroll",
          top: "center",
          left: "60%",
          orient: "vertical",
          textStyle: {
            color: "#ccc",
            overflow: "truncate"
          }
        },
        series: [
          {
            type: "pie",
            radius: ["20%", "60%"],
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
                show: true,
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
    gainColorByIndex(dataIndex) {
      return this.chartData.colors[dataIndex];
    },
    gainColorByKey(dataKey, xFiled) {
      return this.chartData.xColors.find(item => item.keys[xFiled] === dataKey).color;
    },
    gainColorByParam(dataKey, xFiled, index) {
      if (this.chartData.colors)
        return this.gainColorByIndex(index);
      return this.gainColorByKey(dataKey, xFiled);
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
      this.chartOption.series[0].name = xAxis;
      this.chartOption.series[0].data = data;

      this.setOption();
    }
  }
};
</script>

<style scoped>
.chart-body {
  width: 100%;
  height: 100%;
}
</style>