<template>
  <div class="root-container h-full">
    <top-bar :title="fullTitle"></top-bar>
    <div class="chart-container" :style="[gridStyle]">
      <div class="chart-component w-full" :style="[val.layout]" v-for="(val,index) of centerData">
        <chart-model2 :chart-data="val"></chart-model2>
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
    // this.initData();
    // templateLayoutGrid
    this.$bus.$on("toggleTheme", data => {
      console.log("我是DynamicApp组件，收到了数据：", data);
      this.initData(data + "grid");
    });
  },
  data() {
    return {
      fullTitle: "全国土地利用结构汇总统计",
      centerData: [],
      gridStyle: {}
    };
  },
  components: { ChartModel2, TopBar },
  methods: {
    getDataFromServer(themeKey) {
      return this.$http.get(`/data/${themeKey}.json`);
    },

    async initData(themeKey) {
      const { data: ret } = await this.getDataFromServer(themeKey);
      console.log(ret);
      this.gridStyle = ret.layout;
      this.fullTitle = ret.title;
      this.centerData = ret.charts;
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
  /*height: calc(100% - 70px);*/
  height: 100%;
  width: 100%;
  flex: 1;
  display: grid;
  /*place-content: stretch stretch;*/
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