<template>
    <div class="chart-container" :style="[gridStyle]">
      <div class="chart-component w-full" :style="[val.layout]" v-for="(val,index) of centerData">
        <chart-model :chart-data="val"></chart-model>
      </div>
    </div>
</template>

<script>
import TopBar from "../components/TopBar";
import ChartModel from "./ChartModel";

export default {
  name: "MaxApp",
  mounted() {
    console.log("init maxApp");
    this.initData();
  },
  data() {
    return {
      centerData: [],
      gridStyle: {}
    };
  },
  components: { ChartModel, TopBar },
  methods: {
    getDataFromServer() {
      return this.$http.get("/data/templateLayoutGrid.json");
    },

    async initData() {
      const { data: ret } = await this.getDataFromServer();
      console.log(ret);
      this.gridStyle = ret.layout;
      this.centerData = ret.charts;
    }
  }
};
</script>

<style scoped>
.chart-container {
  height: calc(100% - 70px);
  display: grid;
}

.chart-component {
  padding: 5px 5px;
  box-sizing: border-box;
}

.template {
  border-radius: 10px;
  background-color: #297380;
}

</style>