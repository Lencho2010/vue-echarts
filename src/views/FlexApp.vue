<template>
  <div class="root-container h-full">
    <top-bar :show-menu-bar="true" :title="fullTitle"></top-bar>
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
  </div>
</template>

<script>
import TopBar from "../components/TopBar";
import ChartModel from "./ChartModel";
import ChartModel2 from "./ChartModel2_1";

export default {
  name: "FlexApp",
  created() {
  },
  mounted() {
    console.log("init flexapp");
    // this.initData("templateDynamic");
    this.$bus.$on("toggleTheme", data => {
      console.log("我是DynamicApp组件，收到了数据：", data);
      const { themeItem } = data;
      this.initData(themeItem);
    });
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
  components: { ChartModel, TopBar, ChartModel2 },
  methods: {
    getDataFromServer(themeKey) {
      console.log("themeKey:" + themeKey);
      return this.$http.get(`/data/${themeKey}.json`);
    },

    async initData(themeKey) {
      const { data: ret } = await this.getDataFromServer(themeKey);

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
.root-container {
  padding: 0 5px 5px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}

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