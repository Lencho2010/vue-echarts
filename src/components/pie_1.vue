<template>
  <div className="w-full">
    <!--    <remote-js src="http://localhost:3000/testJs/data1006.js"></remote-js>-->
    <div ref="chartBody" class="chart-body"></div>
  </div>
</template>

<script>
import chartResize from "../util/chart-resize";
import { hunhe } from "./extendjs/pie_mixin";

export default {
  name: "pie_1",
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
  props: ["layoutData"],
  mixins: [hunhe],
  methods: {
    initChart() {
      let chartDom = this.$refs.chartBody;
      this.myChart = this.$echarts.init(chartDom);
      chartResize(this.myChart, this.$refs.chartBody);
      if (this.checkCanClick()) {
        this.myChart.on("click", this.chartClick);
      }
      this.chartOption = {
        tooltip: {
          trigger: "item",
          formatter: "{b0}: {c0}万亩 {d0}%"
        },
        legend: {
          type: "scroll",
          top: "center",
          left: "50%",
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
            selectedMode: this.checkCanSelect(),
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
    chartClick({ data, dataIndex }) {
      if (this.checkCanSelect())
        this.chartSelect(data, dataIndex);
      const nextChart = this.layoutData.click.chart;
      if (nextChart) {
        this.$bus.$emit("nextClick", nextChart);
      }
    },
    chartSelect(data, dataIndex) {
      const dataArr = this.chartOption.series[0].data;
      dataArr.forEach((item, index) => {
        item.selected = index === dataIndex;
      });
      dataArr[dataIndex].selected = data.selected = !data.selected;
      this.setOption();
    },
    checkCanSelect() {
      // if(this.char)
      return this.layoutData.click.canSelect ? "single" : "false";
    },
    checkCanClick() {
      return this.layoutData.click.canClick;
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