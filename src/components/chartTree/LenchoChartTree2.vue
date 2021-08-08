<!--  -->
<template>
  <div class="h-full" :style="dataModel.layout"
       style="border: #9ecaed 2px solid; border-radius: 10px; box-sizing: border-box; margin: 5px">
    <button style="color: #b94a48; margin-right: 10px" @click="btnMaxClick">放大</button>
    <lencho-chart-tree2 ref="chartChild" v-if="showChild"
                        :data-model="item"
                        :parent-node="dataModel"
                        :depth="depth+1"
                        v-for="(item,index) in itemList"
                        :key="index">
    </lencho-chart-tree2>
  </div>
</template>

<script>
export default {
  name: "LenchoChartTree2",
  components: {},
  data() {
    return {
      showChild: false,
      layout: {},
      itemList: []
    };
  },
  // props: ["dataModel","parentNode","depth"],
  props: {
    dataModel: {},
    parentNode: {},
    // 用来接收层数
    depth: {
      type: Number
    }
  },
  computed: {},
  methods: {
    btnMaxClick() {
      console.log("dataModel", this.dataModel);
      console.log("parentNode", this.parentNode);
      console.log("depth:" + this.depth);
      this.showChild = true;
      // this.layout = this.dataModel.maxItem.layout;
      this.itemList = this.dataModel.maxItem.charts;

      /*const gridArea = layoutData.layout["grid-area"];
      const findGrid = this.layoutDatas.find(v => v.layout["grid-area"] == gridArea);
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