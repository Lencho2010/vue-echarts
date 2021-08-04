<template>
  <div @click="titleClick" class="chart-title"
       :class="[{'chart-title-checked':isChecked},{'chart-title-click':isCanClick}]">{{ titleData.text }}
  </div>
</template>

<script>
export default {
  name: "ChartTitle",
  data() {
    return {
      // titleName: this.titleData.text,
      isCanClick: this.titleTag.isCanClick,
      isChecked: this.titleTag.isChecked
    };
  },
  props: ["titleData", "titleTag"],
  methods: {
    titleClick() {
      if (!this.isCanClick) return;
      console.log(this.titleData);
      this.titleTag.isChecked = this.isChecked = !this.isChecked;
    }
  },
  computed: {}
};
</script>

<style scoped>
.chart-title {
  text-align: center;
  line-height: 30px;
  font-size: 18px;
  color: rgb(1, 211, 18);
}

.chart-title-click{
  cursor: pointer;
}

.chart-title-checked {
  color: orange
}
</style>