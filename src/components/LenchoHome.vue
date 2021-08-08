<template>
  <div class="home h-full w-full">
    <lencho-tree :title="list.name" :list="list.children" :detph="0"></lencho-tree>
  </div>
</template>

<script>
import LenchoTree from './LenchoTree'
export default {
  name: "LenchoHome",
  components: {
    LenchoTree
  },
  data: function() {
    return {
      list: {
        name: "酒店",
        children: [
          {
            name: "经济",
            children: [
              {
                name: "如家",
                children: [
                  {
                    name: "长江路-如家"
                  },
                  {
                    name: "望江路-如家"
                  }
                ]
              },
              {
                name: "7天",
                children: [
                  {
                    name: "长江路-7天"
                  },
                  {
                    name: "望江路-7天"
                  }
                ]
              }
            ]
          },
          {
            name: "舒适",
            children: [
              {
                name: "智选假日",
                children: [
                  {
                    name: "卧龙路-智选假日"
                  },
                  {
                    name: "望江路-智选假日"
                  }
                ]
              },
              {
                name: "全季",
                children: [
                  {
                    name: "卧龙路-全季"
                  },
                  {
                    name: "建设路-全季"
                  }
                ]
              }
            ]
          },
          {
            name: "商务",
            children: [
              {
                name: "中方商务",
                children: [
                  {
                    name: "卧龙路-中方商务"
                  },
                  {
                    name: "望江路-中方商务"
                  }
                ]
              },
              {
                name: "锦江之星",
                children: [
                  {
                    name: "人民路-锦江之星"
                  },
                  {
                    name: "新华路-锦江之星"
                  }
                ]
              }
            ]
          }
        ]
      }
    };
  },
  methods: {}
};
</script>
<style scoped>
.home{
  color: white;
  font-size: 16px;
}
.ww {
  margin-left: 20px;
}
.hh {
  font-size: 10px;
}
</style>

