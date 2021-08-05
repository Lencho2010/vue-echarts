<template>
  <div class="root-container h-full">
    <top-bar :title="fullTitle"></top-bar>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
import TopBar from "../components/TopBar";

export default {
  name: "DynamicApp",
  mounted() {
    console.log("init DynamicApp");
    this.initData("templateDynamic");
    this.$bus.$on("toggleTheme", data => {
      console.log("我是DynamicApp组件，收到了数据：", data);
      //this.initData("templateDynamic2");
    });

  },
  data() {
    return {
      fullTitle: "全国土地利用结构汇总统计"
    };
  },
  components: { TopBar },
  methods: {
    getDataFromServer(themeKey) {
      // return this.$http.get("/data/templateDynamic.json");
      return this.$http.get(`/data/${themeKey}.json`);
    },

    async initData(themeKey) {
      const { data: ret } = await this.getDataFromServer(themeKey);
      this.fullTitle = ret.title;
      this.$router.push({
        name: "root",
        params: {
          chartData: ret
        }
      });
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
</style>