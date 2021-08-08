<template>
  <div class="chart-container" :style="[gridStyle]">
    <chart-model2 class="chart-component w-full"
                  :key="data.key"
                  v-for="(data,index) of layoutDatas"
                  :prop-btn-max-click="btnMaxClick"
                  :prop-btn-back-click="popLayoutData"
                  :prop-next-click="pushLayoutData"
                  :check-can-back="checkCanBack"
                  :layout-data="data"
                  :theme-data="themeData"></chart-model2>
  </div>
</template>

<script>
import ChartModel2 from "./ChartModel2_2";

export default {
  name: "GridAppNew",
  mounted() {
    // this.initData();
  },
  data() {
    return {
      layoutDatas: [],
      gridStyle: {},
      layoutMap: {}
    };
  },
  props:["themeData"],
  components: { ChartModel2 },
  methods: {
    initData(layoutModel) {
      this.curLayoutModel = layoutModel;
      this.gridStyle = this.curLayoutModel.layout;
      this.layoutDatas = this.curLayoutModel.charts.map(t => ({ ...t, active: true }));
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
    }
  }
};
</script>

<style scoped>
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

</style>