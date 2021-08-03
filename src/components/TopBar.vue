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
.topBarContainer {
  height: 70px;
  position: relative;
}

.titleContent {
  text-align: center;
  font-size: 30px;
  color: #83f6df;
  line-height: 70px;
  margin: 0 10px;
}

.fullTitle {
  display: flex;
  justify-content: center;
}

.before-bg {
  margin-top: 22px;
  width: 456px;
  height: 29px;
  background: url(../assets/layoutImages/顶部装饰左.png) no-repeat center center;
}

.after-bg {
  margin-top: 22px;
  margin-left: -18px;
  width: 456px;
  height: 29px;
  background: url(../assets/layoutImages/顶部装饰右.png) no-repeat center center;
}
</style>