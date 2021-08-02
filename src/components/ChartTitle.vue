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

</style>