<template>
  <div class="root-container h-full">
    <top-bar :title="fullTitle"></top-bar>
    <div class="chart-container">
      <div class="chart-child chart-left" :style="[flexStyle.leftStyle]">
        <div class="chart-component w-full" :style="[val.layout]" v-for="(val,index) of leftData">
          <chart-model :chart-data="val"></chart-model>
        </div>
      </div>
      <div class="chart-child chart-center" :style="[flexStyle.centerStyle]">
        <div class="chart-component w-full" :style="[val.layout]" v-for="(val,index) of centerData">
          <chart-model :chart-data="val"></chart-model>
        </div>
      </div>
      <div class="chart-child chart-right" :style="[flexStyle.rightStyle]">
        <div class="chart-component w-full" :style="[val.layout]" v-for="(val,index) of rightData">
          <chart-model :chart-data="val"></chart-model>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TopBar from "../components/TopBar";
import ChartModel from "./ChartModel";

export default {
  name: "FlexApp",
  mounted() {
    this.initData();
  },
  data() {
    return {
      fullTitle: "全国土地利用结构汇总统计",
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
  components: { ChartModel, TopBar },
  methods: {
    getDataFromServer() {
      return this.$http.get("/data/templateLayoutFlex.json");
    },

    async initData() {
      const { data: ret } = await this.getDataFromServer();

      this.fullTitle = ret.title;
      const flexStyle = ret.layout.colStyle;
      this.flexStyle.leftStyle.width = flexStyle[0];
      this.flexStyle.centerStyle.width = flexStyle[1];
      this.flexStyle.rightStyle.width = flexStyle[2];

      const charts = ret.charts;
      this.leftData = charts.filter(d => d.layout.region === "left");
      this.rightData = charts.filter(d => d.layout.region === "right");
      this.centerData = charts.filter(d => d.layout.region === "center");
    }
  }
};
</script>

<style scoped>
.root-container{
  padding: 0 5px 5px;
  box-sizing: border-box;
}

.chart-container {
  height: calc(100% - 70px);
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}

.chart-component {
  padding: 5px 5px;
  box-sizing: border-box;
}

.template{
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