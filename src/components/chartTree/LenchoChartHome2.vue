<template>
  <div class="home h-full w-full" :style="layoutData.layout">
    <lencho-chart-tree v-for="(item,index) in layoutData.charts"
                       :key="index" :parent-node="layoutData" :depth="1"
                       :data-model="item"></lencho-chart-tree>
    <!--    <lencho-chart-tree :layout-model="layoutData" class="h-full w-full"></lencho-chart-tree>-->
  </div>
</template>

<script>
import LenchoChartTree from "./LenchoChartTree2";

export default {
  name: "LenchoChartHome2",
  components: { LenchoChartTree },
  data() {
    return {
      layoutData: {}
    };
  },
  mounted() {
    this.initData();
  },
  methods: {
    getDataFromServer() {
      return this.$http.get(`/layout/土地利用现状/永久基本农田.json`);
    },
    async initData() {
      const { data: ret } = await this.getDataFromServer();
      this.layoutData = ret.mini;
      console.log(this.layoutData);
    }
  }
};
</script>

<style scoped>

</style>