<template>
  <div class="chart-container">
    <div class="chart-child chart-left" :style="[flexStyle.leftStyle]">
      <div class="chart-component w-full" :style="[val.layout]" v-for="(val,index) of leftData">
        <chart-model2 :chart-data="val"></chart-model2>
      </div>
    </div>
    <div class="chart-child chart-center" :style="[flexStyle.centerStyle]">
      <div class="chart-component w-full" :style="[val.layout]" v-for="(val,index) of centerData">
        <chart-model2 :chart-data="val"></chart-model2>
      </div>
    </div>
    <div class="chart-child chart-right" :style="[flexStyle.rightStyle]">
      <div class="chart-component w-full" :style="[val.layout]" v-for="(val,index) of rightData">
        <chart-model2 :chart-data="val"></chart-model2>
      </div>
    </div>
  </div>
</template>

<script>
import ChartModel2 from "./ChartModel2";
import TopBar from "../components/TopBar";

export default {
  name: "DynamicRoot",
  created() {
  },
  mounted() {
    console.log("init DynamicRoot");
    this.initData();
  },
  data() {
    return {
      leftData: [],
      rightData: [],
      centerData: [],
      flexStyle: {
        leftStyle: {
          width: "25%"
        },
        centerStyle: {
          width: "50%"
        },
        rightStyle: {
          width: "25%"
        }
      }
    };
  },
  components: { TopBar, ChartModel2 },
  props: ["chartData"],
  methods: {
    initData() {
      if (!this.chartData) return;
      const flexStyle = this.chartData.layout.colStyle;
      this.flexStyle.leftStyle.width = flexStyle[0];
      this.flexStyle.centerStyle.width = flexStyle[1];
      this.flexStyle.rightStyle.width = flexStyle[2];

      const charts = this.chartData.charts;
      this.leftData = charts.filter(d => d.layout.region === "left");
      this.rightData = charts.filter(d => d.layout.region === "right");
      this.centerData = charts.filter(d => d.layout.region === "center");
    }
  }
};
</script>

<style scoped>
.chart-container {
  flex: 1;
  /*height: calc(100% - 70px);*/
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}

.chart-component {
  padding: 5px 5px;
  box-sizing: border-box;
}

.template {
  border-radius: 10px;
  background-color: #01323b;
}

.chart-left {
  display: flex;
  flex-direction: column;
}

.chart-right {
  display: flex;
  flex-direction: column;
}
</style>