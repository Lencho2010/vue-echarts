<!--  -->
<template>
    <div :style="getDetph">
      <!-- 显示隐藏 -->
      <div @click="getData ">
        <!-- 这里呢如果为真的话就显示那么就是减号否则的话就是加号 -->
        <span >{{isShow?'-':'+'}}</span>{{title}}</div>
      <!-- 那么在这里我们就需要改成 item.name和item.children -->
      <div v-if="isShow">
        <lencho-tree
          :title="item.name"
          :list="item.children"
          v-for="(item,index) in list"
          :key="index"
          :detph="detph+1"
        >
          <!-- 每次递增1 -->
        </lencho-tree>
      </div>
    </div>
</template>

<script>
export default {
  name: "LenchoTree",
  components: {},
  data: function() {
    return {
      isShow: false
    };
  },
  props: {
    // 接收标题
    title: {
      type: String
      // default: "标题"
    },
    // 接收一整个数组
    list: {
      type: Array
    },
    // 用来接收层数
    detph: {
      type: Number
    }
  },
  // 计算属性用来接收我们的层数
  computed: {
    getDetph() {
      return `transform:translate(${this.detph * 20}px)`;
    }
  },
  methods: {
    getData: function() {
      this.isShow = !this.isShow;
    }
  }
};
</script>
<style scoped>
/* @import url(); 引入css类 */
</style>