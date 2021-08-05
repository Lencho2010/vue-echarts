<template>
  <el-select v-model="curValue" placeholder="请选择">
    <el-option-group
      v-for="group in options"
      :key="group.label"
      :label="group.label">
      <el-option
        v-for="item in group.options"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-option-group>
  </el-select>
</template>

<script>
export default {
  name: "ChartTheme",
  mounted() {
    this.curValue = "林地总体情况";
  },
  data() {
    return {
      options: [{
        label: "林地",
        options: [{
          value: "林地总体情况",
          label: "总体情况"
        }, {
          value: "林地一张图",
          label: "林地一张图"
        }]
      }, {
        label: "草地",
        options: [{
          value: "草地总体情况",
          label: "总体情况"
        }]
      }],
      curValue: ""
    };
  },
  watch: {
    curValue: function(newVal, oldVal) {
      this.$bus.$emit("toggleTheme", newVal);
    },
    /*curValue: {
      immediate: true,
      handler(newVal, oldVal) {
        this.$bus.$emit("toggleTheme", newVal);
      }
    }*/
  }
};
</script>

<style scoped>

</style>