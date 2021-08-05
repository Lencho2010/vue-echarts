<template>
  <div id="test-a">
    <span>A------------>A</span>
    <router-view></router-view>
    <router-view name="sidebar"></router-view>
  </div>
</template>

<script>
export default {
  name: "TestA"
};
</script>

<style scoped>
#test-a {
  font-size: 24px;
  color: #83f6df;
}
</style>