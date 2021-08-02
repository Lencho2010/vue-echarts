<template>
  <div class="template color2">
    <slot name='title' v-bind:title="titleData">我是默认标题</slot>
    <slot name='menu'></slot>
    <div ref="chartBody" class="chart-body">{{chartContent}}</div>
  </div>
</template>

<script>
export default {
  name: "Column2",
  mounted() {
    this.$bus.$on('hello',data=>{
      console.log('我是column_2组件，收到了数据：',data)
    })
  },
  data() {
    return {
      chartKey:'',
      chartTitle: "我是column_2标题",
      chartContent: "我是饼状图",
      titleData: {
        text: '耕地'
      }
    }
  }
};
</script>

<style scoped>

</style>