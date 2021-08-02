<template>
  <div class="template color3">
    <slot name='title' v-bind:title="titleData">我是默认标题</slot>
    <slot name='menu'></slot>
    <div ref="chartBody" class="chart-body">{{chartContent}}</div>
  </div>
</template>

<script>
import initChart from './pie_1_chart.js'
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
      //通过布局数据中传递过来的key值作为参数从后台请求对应数据
      console.log(this.chartKey);
      const { data: retData } = await this.gainDataFromServer()
      this.titleData.text = retData.title
      console.log(this.$refs.chartBody);
      initChart(this)
    },

  }
};
</script>

<style scoped>

</style>