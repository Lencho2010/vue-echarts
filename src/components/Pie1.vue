<template>
  <div class="template color3 h-full w-full">
    <slot name='title' v-bind:title="titleData">我是默认标题</slot>
    <slot name='menu'></slot>
    <div ref="chartBody" class="chart-body">{{chartContent}}</div>
  </div>
</template>

<script>
import initChart from './extendjs/pie_1_chart.js'
export default {
  name: "Pie1",
  mounted() {
    this.$bus.$on('hello',data=>{
      console.log('我是pie_1组件，收到了数据：',data)
    })
    this.gainData()
  },
  data() {
    return {
      chartTitle: "我是pie_1标题",
      chartContent: "",
      titleData: {
        text: '种植园用地23'
      }
    }
  },
  props: ["chartKey"],
  computed:{

  },
  methods: {
    // 异步从后台获取数据
    gainDataFromServer() {
      return this.$http.get('/data/pie_1.json')
    },
    async gainData() {
      const { data: retData } = await this.gainDataFromServer()
      this.titleData.text = retData.title
      initChart(this)
    },

  }
};
</script>

<style scoped>

.color3 {
  background-color: #7054ef;
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