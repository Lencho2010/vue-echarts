<template>
  <div id="app" class="h-full">
    <top-bar :title="fullTitle"></top-bar>

    <div class="chart-container">
      <div class="chart-child chart-left" style="background-color: coral;">
        <div class="chart-component" style="width: 500px!important;" v-for="(val,index) of leftData">
          <component :chart-key="val.key" ref="child" :is="val.name">
            <template slot="title" slot-scope="comTitle">
              <chart-title :title-tag="val.title" :title-data="comTitle.title"></chart-title>
            </template>
            <template v-if="val.showMenu" v-slot:menu>
              <menu-tool></menu-tool>
            </template>
          </component>
        </div>
      </div>

      <div class="chart-child chart-center" style="background-color: aqua;">
        <div class="chart-component w-full" style="width: 890px!important;" v-for="(val,index) of centerData">
          <component :chart-key="val.key" ref="child" :is="val.name">
            <template slot="title" slot-scope="comTitle">
              <chart-title :title-tag="val.title" :title-data="comTitle.title"></chart-title>
            </template>
            <template v-if="val.showMenu" v-slot:menu>
              <menu-tool></menu-tool>
            </template>
          </component>
        </div>
      </div>

      <div class="chart-child chart-right" style="background-color: cadetblue;">
        <div class="chart-component" style="width: 500px!important;" v-for="(val,index) of rightData">
          <component :chart-key="val.key" ref="child" :is="val.name">
            <template slot="title" slot-scope="comTitle">
              <chart-title :title-tag="val.title" :title-data="comTitle.title"></chart-title>
            </template>
            <template v-if="val.showMenu" v-slot:menu>
              <menu-tool></menu-tool>
            </template>
          </component>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "@/assets/css/normalize.css";
import "@/assets/css/reset.css";
import "@/assets/css/public.css";
import "@/assets/css/myChart.css";
import "@/assets/css/index.css";
import TopBar from "./components/TopBar";
import MenuTool from "./components/MenuTool";
import ChartTitle from "./components/ChartTitle";
import Column1 from "./components/Column1";
import Pie1 from "./components/Pie1";
import Column2 from "./components/Column2";
import Column3 from "./components/Column3";

export default {
  mounted() {
    this.initData();
  },
  data() {
    return {
      leftData: [],
      rightData: [],
      centerData: [],
      fullTitle: "全国土地利用结构汇总统计"
    };
  },
  components: { TopBar, MenuTool, ChartTitle, Column1, Pie1, Column2, Column3 },
  methods: {
    getDataFromServer() {
      return this.$http.get("/data/chartLayout.json");
    },

    async initData() {
      const { data: ret } = await this.getDataFromServer();
      this.leftData = ret.filter(d => d.region === "left");
      this.rightData = ret.filter(d => d.region === "right");
      this.centerData = ret.filter(d => d.region === "center");
    }
  }
};

</script>

<style lang="less">

</style>
