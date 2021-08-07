<template>
  <div class="template color2 h-full w-full">
    <chart-title :title-tag="chartData.title" :title-data="titleData"></chart-title>
    <menu-tool2 class="menu-tool"></menu-tool2>
    <component class="chart-comm" ref="chart" :is="myComponent"></component>
  </div>
</template>

<script>
import Pie2 from "../components/Pie2";
import Pie3 from "../components/Pie3"
import Column6 from "../components/Column6";
import ChartTitle from "../components/ChartTitle";
import MenuTool2 from "../components/MenuTool2";

export default {
  name: "ChartModel2_1",
  components: {
    "remote-js": {
      render(h) {
        return h("script", { attrs: { type: "text/javascript", src: this.src } });
      },
      props: {
        src: { type: String, required: true }
      }
    },
    Pie2, ChartTitle, MenuTool2, Column6,Pie3
  },
  created() {
    this.chartKey = this.chartData.key;
    this.myComponent = this.chartData.name;
  },
  mounted() {
    this.$bus.$on("hello", data => {
      console.log("我是ChartModel2组件收到了数据：", data);
    });
    this.gainData();
  },
  data() {
    return {
      chartKey: "",
      titleData: {
        text: "耕地"
      },
      myComponent: ""
    };
  },
  props: ["chartData"],//chartData->布局json数据
  methods: {
    // 异步从后台获取数据
    gainDataFromServer() {
      return this.$http.get(`/testData/${this.chartKey}.json`);
    },
    async gainData() {
      const { data: retData } = await this.gainDataFromServer();
      this.titleData.text = retData.name;//图表标题
      this.$nextTick(() => {
        this.$refs.chart.updateChart(retData);
      });
      /*this.myComponent = () => import('./Pie2.vue')
      console.log(this.myComponent);*/
    }
  }
};
</script>

<style scoped>
.template {
  position: relative;
  display: flex;
  flex-direction: column;
}

.menu-tool {
  position: absolute;
  top: 5px;
  right: 10px;
}

.chart-comm {
  flex: 1;
}
</style>