<template>
  <div class="template color2 h-full w-full">
    <chart-title :title-tag="layoutData.title" :title-data="titleData"></chart-title>
    <menu-tool2 :menu-state="menuState" class="menu-tool"></menu-tool2>
    <component :layout-data="layoutData" class="chart-comm" ref="chart" :is="chartName"></component>
  </div>
</template>

<script>
import ChartTitle from "../components/ChartTitle";
import MenuTool2 from "../components/MenuTool2";
import pie_1 from "../components/pie_1";
import pie_2 from "../components/pie_2";
import { mapState } from "vuex";

export default {
  name: "ChartModel2",
  components: {
    "remote-js": {
      render(h) {
        return h("script", { attrs: { type: "text/javascript", src: this.src } });
      },
      props: {
        src: { type: String, required: true }
      }
    },
    ChartTitle, MenuTool2, pie_1, pie_2
  },
  created() {
    this.chartKey = this.layoutData.key;
    this.chartName = this.layoutData.type;
  },
  mounted() {
    this.$bus.$on("hello", data => {
      console.log("我是ChartModel2组件收到了数据：", data);
    });
    this.initData();
    this.$bus.$on("regionChanged", region => {
      this.initData();
    });
  },
  data() {
    return {
      chartKey: "",
      titleData: {
        text: "耕地22"
      },
      chartName: "",
      gridArea: "",
      menuState: {
        canBack: false,
        canMaximized: true,
        btnBackClick: this.btnBackClick,
        btnMaxClick: this.btnMaxClick
      }
    };
  },
  props: ["layoutData", "themeData", "checkCanBack"],//chartData->布局json数据
  computed: {
    ...mapState({ regionInfo: "curRegionInfo" })
  },
  methods: {
    // 异步从后台获取数据
    gainDataFromServer() {
      const { themeGroup, themeItem } = this.themeData;
      return this.$http.get(`/landStatus/${themeGroup}/${themeItem}/${this.chartKey}`, {
        params: {
          ...this.regionInfo
        }
      });
    },
    async initData() {
      this.gridArea = this.layoutData.layout["grid-area"];
      this.menuState.canBack = this.checkCanBack(this.gridArea);

      const { data: retData } = await this.gainDataFromServer();
      this.titleData.text = retData.name;//图表标题
      this.$nextTick(() => {
        this.$refs.chart.updateChart(retData);
      });
    },
    btnBackClick() {
      this.$bus.$emit("backClick", this.gridArea);
    },
    btnMaxClick() {
      console.log("max...");
    }
  }
};
</script>

<style scoped>
.template {
  position: relative;
  display: flex;
  flex-direction: column;
}

.menu-tool {
  position: absolute;
  top: 5px;
  right: 10px;
}

.chart-comm {
  flex: 1;
}
</style>