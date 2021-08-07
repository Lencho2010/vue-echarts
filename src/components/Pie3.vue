<template>
  <div class="w-full">
    <!--    <remote-js src="http://localhost:3000/testJs/data1006.js"></remote-js>-->
    <div ref="chartBody" class="chart-body"></div>
  </div>
</template>

<script>
import chartResize from "../util/chart-resize";


export default {
  name: "Pie3",
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
    this.setOption();
  },
  data() {
    return {
      myChart: null,
      chartOption: {}
    };
  },
  mixins:[],
  methods: {
    initChart() {
      let chartDom = this.$refs.chartBody;
      this.myChart = this.$echarts.init(chartDom);
      chartResize(this.myChart, this.$refs.chartBody);
    },
    setOption() {
      this.$http("http://localhost:3000/testJs/data1006.js").then(({ data }) => {
        this.chartOption = eval(data);
        console.log(this.chartOption);
        this.myChart.setOption(this.chartOption);
      });

      /*this.$http("http://localhost:3000/testJs/chartM.js").then(({ data }) => {
        const val = eval(data);
        console.log(val);
      });*/
    },
    updateChart() {
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