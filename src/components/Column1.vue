<template>
  <div class="template color1 h-full w-full">
    <slot name="title" v-bind:title="titleData">我是默认标题</slot>
    <slot name="menu"></slot>
    <div ref="chartBody" class="chart-body" :class="[!isExpand?'hidden':'']">{{ chartContent }}</div>
  </div>
</template>

<script>
import initChart from "./extendjs/column_1_chart.js";

export default {
  name: "Column1",
  mounted() {
    this.$bus.$on("hello", data => {
      console.log("我是column_1组件，收到了数据：", data);
    });
    this.gainData();
  },
  data() {
    return {
      chartTitle: "我是column_1标题",
      chartContent: "",
      titleData: {
        text: "种植园用地123"
      },
      isExpand: true
    };
  },
  props: ["chartKey", "chartClick"],
  computed: {},
  methods: {
    // 异步从后台获取数据
    gainDataFromServer() {
      return this.$http.get("/data/column_1.json");
    },
    async gainData() {
      const { data: retData } = await this.gainDataFromServer();
      this.titleData.text = retData.title;
      initChart(this);
    },
    chartBarClick() {
      this.chartClick && this.chartClick(this.chartKey);
    }
  }
};
</script>

<style scoped>

.template {
  position: relative;
}

.color1 {
   /*background-color: rgb(6, 135, 158);*/
}

.chart-body {
  text-align: center;
  vertical-align: middle;
  line-height: 250px;
  font-size: 24px;
  width: 100%;
  height: calc(100% - 20px);
}

</style>