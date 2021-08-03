<template>
    <component :chartClick="chartClick" :chart-key="chartData.key" ref="child" :is="chartData.name">
      <template slot="title" slot-scope="comTitle">
        <chart-title :title-tag="chartData.title" :title-data="comTitle.title"></chart-title>
      </template>
      <template v-if="chartData.showMenu" v-slot:menu>
        <menu-tool></menu-tool>
      </template>
    </component>
</template>

<script>
import ChartTitle from "../components/ChartTitle";
import Column1 from "../components/Column1";
import Pie1 from "../components/Pie1";
import Column2 from "../components/Column2";
import Column3 from "../components/Column3";
import TopBar from "../components/TopBar";
import MenuTool from "../components/MenuTool";

export default {
  name: "ChartModel",
  mounted() {
  },
  data() {
    return {}
  },
  props: ["chartData"],
  components: { TopBar, MenuTool, ChartTitle, Column1, Pie1, Column2, Column3 },
  methods: {
    chartClick(chartKey) {
      console.log(`app模块检测到chart[${chartKey}]被点击了`);
      this.leftData.shift();
      console.log(this.leftData);
    }
  }
}
</script>

<style scoped>
.chart-component {
  margin: 5px 0px;
}
</style>