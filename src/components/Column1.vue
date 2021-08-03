<template>
  <div class="template color1" :style="[myStyl]">
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
      myStyl:{
        width: "100%",//宽高设置来自于配置文件，此处设置默认值
        "height": "250px"
      },
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
      //通过布局数据中传递过来的key值作为参数从后台请求对应数据
      console.log(this.chartKey);
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
  /* width: 450px; */
  width: 100%;
  height: 250px;
  position: relative;
}

.color1 {
  background-color: rgb(6, 135, 158);
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