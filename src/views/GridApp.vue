<template>
  <div id="map" class="root-container h-full">
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

    // this.initMap()
  },
  data() {
    return {
      fullTitle: "全国土地利用结构汇总统计",
      centerData: [],
      gridStyle: {},
      map:""
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
    },

    initMap() {
      this.map = L.map("map", {
        center: [40.02404009136253, 116.50641060224784], // 地图中心
        zoom: 14, //缩放比列
        zoomControl: false, //禁用 + - 按钮
        doubleClickZoom: false, // 禁用双击放大
        attributionControl: false // 移除右下角leaflet标识
      });
      let name = L.tileLayer(
        // "http://mt0.google.cn/vt/lyrs=y@160000000&hl=zh-CN&gl=CN&src=app&y={y}&x={x}&z={z}&s=Ga",
        "http://192.168.102.200:8066/ime-cloud/rest/IMG_QG_2019/wmts/1.0.0/调查底图影像2019/undefined/guobiao/{z}/{y}/{x}"
      ).addTo(this.map);
      //   this.map.removeLayer(name)  // 移除图层
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

.template {
  border-radius: 10px;
  background-color: #0f2f34;
}

</style>