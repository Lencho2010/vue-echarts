<template>
  <div class="root-container h-full">
    <top-bar :title="fullTitle"></top-bar>
    <grid-app-new ref="grid" :theme-data="themeData"></grid-app-new>
  </div>
</template>

<script>
import TopBar from "../components/TopBar";
import GridAppNew from "./GridAppNew";

export default {
  name: "GridAppNewContainer",
  mounted() {
    this.$bus.$on("toggleTheme", data => {
      console.log("我是GridApp组件，收到了专题数据：", data);
      this.themeData = data;
      this.initData();
    });
  },
  data() {
    return {
      fullTitle: "全国土地利用结构汇总统计",
      themeData: {}
    };
  },
  components: { GridAppNew, TopBar },
  methods: {
    getDataFromServer() {
      const { themeGroup, themeItem } = this.themeData;
      return this.$http.get(`/layout/${themeGroup}/${themeItem}.json`);
    },
    async initData() {
      const { data: ret } = await this.getDataFromServer();
      console.log("ret:", ret);
      this.fullTitle = ret.title; // 专题标题
      const curLayoutModel = ret.mini; // 用配置文件中的mini作为默认布局
      this.$refs.grid.initData(curLayoutModel);
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

</style>