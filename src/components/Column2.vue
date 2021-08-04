<template>
  <div class="template color2 h-full w-full">
    <slot name="title" v-bind:title="titleData">我是默认标题</slot>
    <slot name="menu"></slot>
    <!--    <pie2 ref="chart"></pie2>-->
    <component ref="chart" :is="myComponent"></component>
<!--    <remote-js src="http://localhost:3000/testJs/chartM.js"></remote-js>-->
  </div>
</template>

<script>
import Pie2 from "./Pie2";
//logM()
export default {
  name: "Column2",
  components: {
    "remote-js": {
      render(h) {
        return h("script", { attrs: { type: "text/javascript", src: this.src } });
      },
      props: {
        src: { type: String, required: true }
      }
    },
    Pie2
  },
  created() {
  },
  mounted() {

    this.$bus.$on("hello", data => {
      console.log("我是column_2组件收到了数据：", data);
    });
    // this.$router.push({name:'pie2'})
    this.gainData();
  },
  data() {
    return {
      chartKey: "",
      chartTitle: "我是column_2标题",
      chartContent: "我是饼状图",
      titleData: {
        text: "耕地"
      },
      myComponent: ""
    };
  },
  methods: {
    // 异步从后台获取数据
    gainDataFromServer() {
      return this.$http.get("/testData/耕地种植属性.json");
    },
    async gainData() {
      const { data: retData } = await this.gainDataFromServer();
      this.myComponent = "Pie2";
      this.$nextTick(() => {
        this.$refs.chart.updateChart(retData.data);
      });
      // this.$refs.chart.updateChart(retData.data);
      /*this.myComponent = () => import('./Pie2.vue')
      console.log(this.myComponent);*/
    }
  }
};
</script>

<style scoped>
.color2 {
  /*background-color: burlywood;*/
}

.template {
  position: relative;
}

.chart-body {
  text-align: center;
  vertical-align: middle;
  line-height: 250px;
  font-size: 24px;
  width: 100%;
  height: calc(100% - 20px);
}
</style>