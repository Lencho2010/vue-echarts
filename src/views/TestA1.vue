<template>
  <div id="test-a1" style="background-color: #467cd4">
    <span>A------------>A1</span>
    <router-view></router-view>
<!--    <hr>
    <button @click="btnClick">点击</button>
    <hr>
    <button @click="btnClick2">跳转</button>-->
  </div>
</template>

<script>
import TestA2 from "./TestA2";

export default {
  name: "TestA1",
  mounted() {
  },
  methods:{
    btnClick(){
      const route = {
        path: "a2",
        name: "a2",
        component: TestA2
      };
      this.$router.addRoute("test",route);
    },
    btnClick2(){
      this.$router.push({name:'a2'})
    }
  }
};
</script>

<style scoped>
#test-a1 {
  font-size: 24px;
  color: #83f6df;
  border: #1f3349 2px solid;
  width: 200px;
  height: 200px;
  border-radius: 10px;
}
</style>