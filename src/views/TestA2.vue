<template>
  <div id="test-a2" style="background-color: #297380">
    <span>A------------>A2</span>
    <router-view></router-view>
    <div>
      <hr>
      <button @click="btnClick">点击</button>
      <hr>
      <button @click="btnClick2">跳转</button>
    </div>
  </div>
</template>

<script>
import TestA3 from "./TestA3";
export default {
  name: "TestA2",
  methods:{
    btnClick(){
      const route = {
        path: "a3",
        name: "a3",
        component: TestA3
      };
      this.$router.addRoute("test",route);
    },
    btnClick2(){
      this.$router.push({name:'a3'})
    }
  }
};
</script>

<style scoped>
#test-a2 {
  font-size: 24px;
  color: #83f6df;
}
</style>