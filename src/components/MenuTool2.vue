<template>
  <el-row>
    <el-button v-if="menuState.canBack" @click="menuState.btnBackClick" type="primary" size="mini" icon="el-icon-d-arrow-left" circle
               title="返回"></el-button>
    <el-button v-if="menuState.canMaximized" @click="menuState.btnMaxClick" type="success" size="mini" icon="el-icon-zoom-in" circle title="放大"></el-button>
  </el-row>
</template>

<script>
export default {
  name: "MenuTool2",
  props:["menuState"],
  methods: {
    btnMaxClick() {
      // this.$router.push({ name: "maxApp" });

    },
    btnBackClick() {
      /*this.$router.addRoute("dynamic", {
        path: "maxApp",
        name: "maxApp",
        component: () => import("../views/MaxApp.vue")
      });*/
    }
  }
};
</script>

<style scoped>

</style>