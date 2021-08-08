<!--  -->
<template>
  <div class="h-full w-full" :style="dataModel.layout"
       style="border: #9ecaed 2px solid; border-radius: 10px; box-sizing: border-box; margin: 5px;">
    <button style="color: #b94a48; margin-right: 10px;float: right; height: 20px" @click="btnMaxClick">放大</button>
    <lencho-chart-tree ref="chartChild" v-if="showChild"
                       :data-model="item"
                       :parent-node="dataModel"
                       v-for="(item,index) in itemList"
                       :key="index">
    </lencho-chart-tree>
  </div>
</template>

<script>
export default {
  name: "LenchoChartTree",
  components: {},
  mounted() {
    this.showChild = true;
    this.itemList = this.dataModel.charts;
  },
  data() {
    return {
      showChild: true,
      layout: {},
      itemList: []
    };
  },
  props: ["dataModel", "parentNode"],
  computed: {},
  methods: {
    btnMaxClick() {
      console.log(this.dataModel);
      console.log(this.parentNode);
      this.itemList = this.dataModel.maxItem.charts;
      const gridArea = this.dataModel.layout["grid-area"];
      const findGrid = this.parentNode.charts.find(v => v.layout["grid-area"] == gridArea);
      findGrid.layout = this.dataModel.maxItem.layout;
      findGrid.layout["grid-area"] = "3 / 1 / 4 / 5";
      console.log(findGrid);
      // findGrid.layout = layoutData.maxItem.layout;


      /*const gridArea = this.dataModel.layout["grid-area"];
      const findGrid = this.parentNode.charts.find(v => v.layout["grid-area"] == gridArea);
      this.layoutDatas.forEach(t => {
        t.active = t.layout["grid-area"] == gridArea;
      });
      findGrid.layout = layoutData.maxItem.layout;
      findGrid.layout["grid-area"] = "3 / 1 / 4 / 5";
      console.log(layoutData.maxItem);*/

    }
  }
};
</script>
<style scoped>
/* @import url(); 引入css类 */
</style>