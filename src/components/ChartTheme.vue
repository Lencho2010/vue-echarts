<template>
  <el-select v-model="value" placeholder="请选择">
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
  data() {
    return {
      options: [{
        label: "林地",
        options: [{
          value: "林地总体情况-key",
          label: "总体情况"
        }, {
          value: "林地一张图-key",
          label: "林地一张图"
        }]
      }, {
        label: "草地",
        options: [{
          value: "草地总体情况-key",
          label: "总体情况"
        }, {
          value: "降雨量-key",
          label: "降雨量"
        }, {
          value: "恢复种植区-key",
          label: "恢复种植区"
        }]
      }],
      value: "林地总体情况-key"
    };
  }
};
</script>

<style scoped>

</style>