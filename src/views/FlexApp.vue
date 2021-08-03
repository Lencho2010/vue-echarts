<template>
  <div class="h-full">
    <top-bar :title="fullTitle"></top-bar>
    <div class="chart-container">
      <div class="chart-child chart-left" style="background-color: coral;" :style="[flexStyle.leftStyle]">
        <div class="chart-component w-full" v-for="(val,index) of leftData">
          <component :chartClick="chartClick" :chart-key="val.key" ref="child" :is="val.name">
            <template slot="title" slot-scope="comTitle">
              <chart-title :title-tag="val.title" :title-data="comTitle.title"></chart-title>
            </template>
            <template v-if="val.showMenu" v-slot:menu>
              <menu-tool></menu-tool>
            </template>
          </component>
        </div>
      </div>

      <div class="chart-child chart-center" style="background-color: aqua;" :style="[flexStyle.centerStyle]">
        <div class="chart-component w-full" v-for="(val,index) of centerData">
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

      <div class="chart-child chart-right" style="background-color: cadetblue;" :style="[flexStyle.rightStyle]">
        <div class="chart-component w-full" v-for="(val,index) of rightData">
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
import TopBar from "../components/TopBar";
import MenuTool from "../components/MenuTool";
import ChartTitle from "../components/ChartTitle";
import Column1 from "../components/Column1";
import Pie1 from "../components/Pie1";
import Column2 from "../components/Column2";
import Column3 from "../components/Column3";

export default {
  name: "FlexApp",
  mounted() {
    this.initData();
  },
  data() {
    return {
      fullTitle: "全国土地利用结构汇总统计",
      leftData: [],
      rightData: [],
      centerData: [],
      flexStyle: {
        leftStyle: {
          width: "25%"
        },
        centerStyle: {
          width: "45%"
        },
        rightStyle: {
          width: "25%"
        }
      }

    };
  },
  components: { TopBar, MenuTool, ChartTitle, Column1, Pie1, Column2, Column3 },
  methods: {
    getDataFromServer() {
      return this.$http.get("/data/templateLayoutFlex.json");
    },

    async initData() {
      const { data: ret } = await this.getDataFromServer();
      console.log(ret);
      this.fullTitle = ret.title;
      const charts = ret.charts;
      this.leftData = charts.filter(d => d.layout.region === "left");
      this.rightData = charts.filter(d => d.layout.region === "right");
      this.centerData = charts.filter(d => d.layout.region === "center");
    },

    chartClick(chartKey) {
      console.log(`app模块检测到chart[${chartKey}]被点击了`);
      this.leftData.shift();
      console.log(this.leftData);
    }
  }
};
</script>

<style scoped>
.chart-container {
  height: calc(100% - 70px);
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}

.fullTitle {
  display: flex;
  justify-content: center;
}

.chart-component {
  margin: 5px 0px;
}

.chart-left{
  display: flex;
  flex-direction: column;
}

.chart-right{
  display: flex;
  flex-direction: column;
}
</style>