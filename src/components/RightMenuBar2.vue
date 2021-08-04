<template>
  <div id="RightMenuBar2">
    <el-popover
      placement="right"
      width="400"
      transition="fade-in-linear"
      trigger="click">
      <div id="popContainer">
        <el-input
          placeholder="输入关键字进行过滤"
          v-model="filterText">
        </el-input>
        <el-tree
          class="filter-tree"
          :data="data"
          @node-click="nodeClick"
          :props="defaultProps"
          accordion
          :filter-node-method="filterNode"
          ref="tree">
        </el-tree>
      </div>
      <el-button type="primary" slot="reference">{{ curRegion }}</el-button>
    </el-popover>
  </div>
</template>

<script>
export default {
  name: "RightMenuBar2",
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    }
  },

  methods: {
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    /*共三个参数，依次为：传递给 data 属性的数组中该节点所对应的对象、节点对应的 Node、节点组件本身。*/
    nodeClick(data,node,tree){
      this.curRegion = data.label
    }
  },

  data() {
    return {
      curRegion:"全国",
      filterText: "",
      data: [{
        id: 1,
        label: "北京",
        children: [{
          id: 4,
          label: "北京市",
          children: [{
            id: 9,
            label: "西城区"
          }, {
            id: 110107,
            label: "石景山区"
          }]
        }]
      }, {
        id: 2,
        label: "天津",
        children: [{
          id: 5,
          label: "河东区"
        }, {
          id: 6,
          label: "滨海新区"
        }]
      }, {
        id: 3,
        label: "山东",
        children: [{
          id: 7,
          label: "青岛"
        }, {
          id: 8,
          label: "烟台"
        }]
      }],
      defaultProps: {
        children: "children",
        label: "label"
      }
    };
  }
};
</script>

<style>
.el-popover{
  background-color: #297380;
  border-color: aqua;
}
#popContainer .el-tree{
  color: #cccccc;
}
#popContainer .el-input__inner,.el-tree{
  background-color: transparent;
}

/*#popContainer .el-tree  .is-current {
  background-color: pink;
}

#popContainer .el-tree  .is-current,is-focuable :hover{
  background-color: pink;
}*/
</style>