<template>
  <div id="map" class="root-container h-full">
    <top-bar :title="fullTitle"></top-bar>
    <div class="chart-container" :style="[gridStyle]">
<!--      :class="[{'hidden':!data.active}]"-->
      <div class="chart-component w-full"  :style="[data.layout]" :key="data.key"
           v-for="(data,index) of layoutDatas">
        <chart-model2 :prop-btn-max-click="btnMaxClick"
                      :prop-btn-back-click="popLayoutData"
                      :prop-next-click="pushLayoutData"
                      :check-can-back="checkCanBack"
                      :layout-data="data"
                      :theme-data="themeData"></chart-model2>
      </div>
    </div>
  </div>
</template>

<script>
import TopBar from "../components/TopBar";
import ChartModel2 from "./ChartModel2";

export default {
  name: "GridApp",
  mounted() {
    this.$bus.$on("toggleTheme", data => {
      console.log("我是GridApp组件，收到了专题数据：", data);
      this.themeData = data;
      this.initData();
    });
    //图表点击跳转对应下一个
    this.$bus.$on("nextClick", this.pushLayoutData);
    /*this.$bus.$on("backClick", this.popLayoutData);
    this.$bus.$on("maxClick", this.btnMaxClick);*/
  },
  data() {
    return {
      themeData: {},
      fullTitle: "全国土地利用结构汇总统计",
      layoutDatas: [],
      gridStyle: {},
      layoutMap: {}
    };
  },
  components: { ChartModel2, TopBar },
  methods: {
    getDataFromServer() {
      const { themeGroup, themeItem } = this.themeData;
      return this.$http.get(`/layout/${themeGroup}/${themeItem}.json`);
    },
    async initData() {
      const { data: ret } = await this.getDataFromServer();
      this.fullTitle = ret.title; // 专题标题
      const curLayoutModel = ret.mini; // 用配置文件中的mini作为默认布局

      // console.log(ret);
      this.gridStyle = curLayoutModel.layout;
      this.layoutDatas = curLayoutModel.charts.map(t => ({ ...t, active: true }));
    },
    pushLayoutData(layoutData) {
      console.log("pushLayoutData", layoutData);
      const gridArea = layoutData.layout["grid-area"];
      let index = this.layoutDatas.findIndex(v => v.layout["grid-area"] == gridArea);
      if (index < 0) return;
      const oldLayoutData = this.layoutDatas.splice(index, 1, layoutData)[0];
      if (!this.layoutMap.hasOwnProperty(gridArea))
        this.layoutMap[gridArea] = [oldLayoutData];
      else this.layoutMap[gridArea].push(oldLayoutData);
    },
    popLayoutData(gridArea) {
      console.log("popLayoutData:" + gridArea);
      if (this.layoutMap.hasOwnProperty(gridArea) && this.layoutMap[gridArea].length > 0) {
        let index = this.layoutDatas.findIndex(v => v.layout["grid-area"] == gridArea);
        if (index < 0) return;
        const lastLayoutData = this.layoutMap[gridArea].pop();
        this.layoutDatas.splice(index, 1, lastLayoutData);
      }
    },
    checkCanBack(gridArea) {
      if (this.layoutMap.hasOwnProperty(gridArea))
        return this.layoutMap[gridArea].length > 0;
      return false;
    },
    btnMaxClick(layoutData) {
      const gridArea = layoutData.layout["grid-area"];
      const findGrid = this.layoutDatas.find(v => v.layout["grid-area"] == gridArea);
      this.layoutDatas.forEach(t => {
        t.active = t.layout["grid-area"] == gridArea;
      });
      findGrid.layout = layoutData.maxItem.layout;
      findGrid.layout["grid-area"] = "3 / 1 / 4 / 5";
      console.log(layoutData.maxItem);
      /*this.gridStyle = curLayoutModel.layout;
      this.layoutDatas = curLayoutModel.charts.map(t => ({ ...t, active: true }));*/
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
  height: calc(100% - 70px);
  /*height: 100%;*/
  width: 100%;
  flex: 1;
  display: grid;
  place-content: stretch stretch;
}

.chart-component {
  padding: 5px 5px;
  box-sizing: border-box;
}

.template {
  border-radius: 10px;
  background-color: #0f2f34;
}

</style>