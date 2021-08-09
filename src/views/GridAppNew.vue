<template>
  <div id="gridApp" ref="grid" class="chart-container" :style="[gridStyle]">
    <el-button circle v-if="depth>1 && nextLayouts.length+1 === depth" class="btn-back"
               @click="btnBackClick"
               type="primary" size="mini"
               icon="el-icon-d-arrow-left"
               title="返回"></el-button>
    <chart-model2 class="chart-component w-full"
                  v-show="data.active"
                  :key="data.key"
                  v-for="(data,index) of layoutDatas"
                  :prop-btn-max-click="btnMaxClick"
                  :prop-btn-back-click="popLayoutData"
                  :prop-next-click="pushLayoutData"
                  :check-can-back="checkCanBack"
                  :layout-data="data"
                  :theme-data="themeData">
      <grid-app-new :depth="depth+1" :theme-data="themeData"></grid-app-new>
    </chart-model2>
  </div>
</template>

<script>
import ChartModel2 from "./ChartModel2_2";
import { mapState, mapActions } from "vuex";

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
  props: ["themeData", "depth"],
  computed: {
    ...mapState(["nextLayouts"]),
    thisDepth() {
      return this.depth + 1;
    }
  },
  components: { ChartModel2 },
  methods: {
    ...mapActions(["pushNextLayout", "popNextLayout"]),
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
    btnMaxClick(layoutData, childInstance) {
      const gridArea = layoutData.layout["grid-area"];
      const findGrid = this.layoutDatas.find(v => v.layout["grid-area"] == gridArea);
      this.layoutDatas.forEach(item => item.active = item.layout["grid-area"] == gridArea);
      const newGridArea = this.gainGridArea(this.$refs.grid);
      findGrid.layout["grid-area"] = newGridArea;

      this.pushNextLayout({ findGrid, gridArea, childInstance, layoutDatas: this.layoutDatas });
    },
    gainGridArea(domEle) {
      console.log(this.$refs.grid);
      const gridRows = window.getComputedStyle(domEle).getPropertyValue("grid-template-rows");
      const gridRowCount = gridRows.split(" ").length;
      const gridCols = window.getComputedStyle(domEle).getPropertyValue("grid-template-columns");
      const gridColCount = gridCols.split(" ").length;
      return `1 / 1 / ${gridRowCount + 1} /${gridColCount + 1}`;
    },
    /*btnMaxClick(layoutData, slotInstance) {
      const gridArea = layoutData.layout["grid-area"];
      const findGrid = this.layoutDatas.find(v => v.layout["grid-area"] == gridArea);
      this.layoutDatas.forEach(item => item.active = item.layout["grid-area"] == gridArea);
      const newGridArea = this.gainGridArea(this.$refs.grid);
      findGrid.layout["grid-area"] = newGridArea;
      slotInstance?.initData(layoutData.maxItem);
    },*/
    btnBackClick() {
      const { findGrid, gridArea, childInstance, layoutDatas } = this.nextLayouts.pop();
      findGrid.layout["grid-area"] = gridArea;
      childInstance.showChild = false;
      layoutDatas.forEach(item => item.active = true);
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
  position: relative;
}

.chart-component {
  padding: 5px 5px;
  box-sizing: border-box;
  /*background-color: #481552;*/
}

#gridApp .btn-back {
  position: absolute;
  width: 30px;
  height: 30px;
  top: 10px;
  right: 10px;
  z-index: 99;
}

</style>