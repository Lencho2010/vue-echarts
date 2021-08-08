<template>
  <lencho-chart-tree :data-model="layoutData"></lencho-chart-tree>
</template>

<script>
import LenchoChartTree from "./LenchoChartTree";

export default {
  name: "LenchoChartHome",
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