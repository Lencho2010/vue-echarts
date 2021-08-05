<template>
  <el-row>
    <el-button @click="btnAddRoute" type="primary" size="mini" icon="el-icon-edit" circle></el-button>
    <el-button @click="btnMaxClick" type="success" size="mini" icon="el-icon-check" circle></el-button>
    <!--    <el-button type="info" icon="el-icon-message" circle></el-button>
        <el-button type="warning" icon="el-icon-star-off" circle></el-button>-->
  </el-row>
</template>

<script>
export default {
  name: "MenuTool2",
  created() {
  },
  methods: {
    btnMaxClick() {
      // this.$router.push({ name: "maxApp" });
    },
    btnAddRoute() {
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