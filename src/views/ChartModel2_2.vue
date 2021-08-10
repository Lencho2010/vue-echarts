<template>
  <div class="h-full w-full" :style="[layoutData.layout]">
    <div v-show="!showChild" class="template h-full w-full">
      <chart-title :chart-title-click="chartTitleClick"
                   :title-tag="layoutData.title"
                   :title-data="titleData"></chart-title>
      <area-unit :unit-select="unitSelect"></area-unit>
      <menu-tool2 :menu-state="menuState" class="menu-tool"></menu-tool2>
      <component :chart-next-click="propNextClick"
                 :layout-data="layoutData"
                 :is="chartName"
                 class="chart-comm"
                 ref="chart"></component>
    </div>
    <slot v-if="showChild"></slot>
  </div>
</template>

<script>
import ChartTitle from "../components/ChartTitle";
import MenuTool2 from "../components/MenuTool2";
import AreaUnit from "../components/AreaUnit";
import { mapState } from "vuex";

export default {
  name: "ChartModel2",
  components: {
    AreaUnit,
    "remote-js": {
      render(h) {
        return h("script", { attrs: { type: "text/javascript", src: this.src } });
      },
      props: {
        src: { type: String, required: true }
      }
    },
    ChartTitle, MenuTool2,
    "pie_1": () => import("../components/pie_1"),
    "pie_2": () => import("../components/pie_2"),
    "column_4": () => import("../components/column_4"),
    "column_6": () => import("../components/column_6"),
    "Table1": () => import("../components/Table1")
  },
  created() {
    this.chartKey = this.layoutData.key;
    this.chartName = this.layoutData.type;
    console.log(this.chartKey);
    console.log(this.chartName);
  },
  mounted() {
    this.$bus.$on("hello", data => {
      console.log("我是ChartModel2组件收到了数据：", data);
    });
    this.initData();
    this.$bus.$on("regionChanged", this.initData);
  },
  beforeDestroy() {
    this.$bus.$off("regionChanged", this.initData);
  },
  data() {
    return {
      showChild: false,
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
      },
      childParams: {}
    };
  },
  props: ["layoutData", "themeData",
    "checkCanBack", "propBtnBackClick",
    "propBtnMaxClick", "propNextClick",
    "propChartTitleClick"],
  computed: {
    ...mapState({ regionInfo: "curRegionInfo" })
  },
  methods: {
    // 异步从后台获取数据
    gainDataFromServer() {
      const { themeGroup, themeItem } = this.themeData;
      return this.$http.get(`/landStatus/${themeGroup}/${themeItem}/${this.chartKey}`, {
        params: {
          ...this.regionInfo,
          ...this.childParams
        }
      });
    },
    async initData() {
      this.gridArea = this.layoutData.layout["grid-area"];
      this.menuState.canBack = this.checkCanBack(this.gridArea);
      this.menuState.canMaximized = this.layoutData.canMaximized;
      this.childParams = this.layoutData.params;

      const { data: retData } = await this.gainDataFromServer();
      this.titleData.text = retData.name;//图表标题
      this.titleData.key = retData.key;
      this.$nextTick(() => {
        this.$refs.chart.updateChart(retData);
      });
    },
    btnBackClick() {
      // this.$bus.$emit("backClick", this.gridArea);
      this.propBtnBackClick(this.gridArea);
    },
    btnMaxClick() {
      const maxItem = this.layoutData.maxItem;
      // 判断最大化是否响应
      if (!maxItem || !maxItem.charts || maxItem.charts.lenght < 1) return;
      this.showChild = true;
      this.propBtnMaxClick(this.layoutData, this);

      this.$nextTick(() => {
        // console.log(this.$slots);
        // const containerInstance = this.$slots.default[0].context;
        const containerInstance = this.$slots.default[0].child;
        containerInstance?.initData(maxItem);
      });
    },
    /*btnMaxClick() {
      const maxItem = this.layoutData.maxItem;
      if (!maxItem || !maxItem.charts || maxItem.charts.lenght < 1) return;

      // 传递给父级响应
      this.showChild = true;
      this.$nextTick(() => {
        const slotInstance = this.$slots.default[0].child;
        this.propBtnMaxClick(this.layoutData, slotInstance);
      });
    }*/
    unitSelect(item) {
      console.log(item);
    },
    chartTitleClick(titleData) {
      console.log(titleData);
      this.propChartTitleClick?.call(null, titleData);
    }

  }
};
</script>

<style scoped>
.template {
  position: relative;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  background-color: #0f2f34;
}

.menu-tool {
  position: absolute;
  top: 5px;
  right: 10px;
}

.chart-comm {
  flex: 1;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 2s
}

.fade-enter, .fade-leave-to /* .fade-leave-active, 2.1.8 版本以下 */
{
  opacity: 0
}
</style>