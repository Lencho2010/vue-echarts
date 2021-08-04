<template>
  <div id="RightMenuBar">
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

<!--      <div style="width: 100px; height: 100px; background-color: pink"></div>-->
    </el-select>
  </div>
</template>

<script>
export default {
  name: "RightMenuBar",
  data() {
    return {
      options: [{
        label: "热门城市",
        options: [{
          value: "Shanghai",
          label: "上海"
        }, {
          value: "Beijing",
          label: "北京"
        }]
      }, {
        label: "城市名",
        options: [{
          value: "Chengdu",
          label: "成都"
        }, {
          value: "Shenzhen",
          label: "深圳"
        }, {
          value: "Guangzhou",
          label: "广州"
        }, {
          value: "Dalian",
          label: "大连"
        }]
      }],
      value: "Dalian"
    };
  }
};
</script>

<style>
.el-input input {
  background-color: transparent !important;
}

.el-select-dropdown{
  background-color: transparent;
}

.el-select-dropdown__item.hover, .el-select-dropdown__item:hover{
  background-color: #01323b;
}

.el-popper[x-placement^=bottom] .popper__arrow::after{
  background-color: transparent;
}
</style>