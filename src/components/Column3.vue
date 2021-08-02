<template>
  <div class="template color3">
    <slot name="title" v-bind:title="titleData">我是默认标题</slot>
    <slot name="menu"></slot>
    <div ref="chartBody" class="chart-body">{{ chartContent }}</div>
  </div>
</template>

<script>
export default {
  name: "Column3",
  mounted() {
    this.$bus.$on("hello", data => {
      console.log("我是column_3组件，收到了数据：", data);
    });
  },
  data() {
    return {
      chartKey: "",
      chartTitle: "我是column_3标题",
      chartContent: "我是桑基图",
      titleData: {
        text: "草地"
      }
    };
  }
};
</script>

<style scoped>

</style>