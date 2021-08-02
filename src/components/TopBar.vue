<template>
  <div class="topBarContainer">
    <menu-bar></menu-bar>
    <div class="fullTitle">
      <div class="before-bg"></div>
      <div class="titleContent">{{ title }}</div>
      <div class="after-bg"></div>
    </div>
  </div>
</template>

<script>
import MenuBar from "./MenuBar";

export default {
  name: "TopBar",
  data() {
    return {
      //title:"全国土地利用结构汇总统计"
    };
  },
  props: ["title"],
  components: {
    MenuBar
  }
};
</script>

<style scoped>

</style>