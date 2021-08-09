<template>
  <div ref="grid" class="chart-container" :style="[gridStyle]">
    <chart-model2 class="chart-component w-full"
                  v-if="data.active"
                  :key="data.key"
                  v-for="(data,index) of layoutDatas"
                  :prop-btn-max-click="btnMaxClick"
                  :prop-btn-back-click="popLayoutData"
                  :prop-next-click="pushLayoutData"
                  :check-can-back="checkCanBack"
                  :layout-data="data"
                  :theme-data="themeData">
      <grid-app-new :theme-data="themeData"></grid-app-new>
    </chart-model2>
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
      layoutMap: {},
      showChild: false
    };
  },
  props: ["themeData"],
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
      const gridArea = layoutData.layout["grid-area"];
      const findGrid = this.layoutDatas.find(v => v.layout["grid-area"] == gridArea);
      this.layoutDatas.forEach(item => item.active = item.layout["grid-area"] == gridArea);
      const newGridArea = this.gainGridArea(this.$refs.grid);
      findGrid.layout["grid-area"] = newGridArea;
    },
    gainGridArea(domEle) {
      console.log(this.$refs.grid);
      const gridRows = window.getComputedStyle(domEle).getPropertyValue("grid-template-rows");
      const gridRowCount = gridRows.split(" ").length;
      const gridCols = window.getComputedStyle(domEle).getPropertyValue("grid-template-columns");
      const gridColCount = gridCols.split(" ").length;
      return `1 / 1 / ${gridRowCount + 1} /${gridColCount + 1}`;
    }
  }
};
</script>

<style scoped>
.chart-container {
  height: 100%;
  width: 100%;
  display: grid;
  place-content: stretch stretch;
  /*  grid-gap: 10px;
    box-sizing: border-box;*/
}

.chart-component {
  padding: 5px 5px;
  box-sizing: border-box;
  /*background-color: #481552;*/
}

</style>