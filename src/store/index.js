import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    itemList: [
      {
        itemName: "林地",
        id: "1"
      },
      {
        itemName: "草地",
        id: "2"
      },
      {
        itemName: "园地",
        id: "3"
      },
      {
        itemName: "耕地",
        id: "4"
      }
    ]
  },
  mutations: {
    addItem(state, val) {
      state.itemList.push(val);
    },
    removeItemAt(state, index) {
      state.itemList.splice(index, 1);
    },
    clearItems(state, val) {
      const len = state.itemList.length;
      state.itemList.splice(0, len);
    }
  },
  actions: {
    addItem(context, val) {
      console.log("addItem");
      context.commit("addItem", val);
    },
    removeItemAt(context, index) {
      console.log("removeItemAt");
      context.commit("removeItemAt", index);
    },
    clearItems(context, val) {
      console.log("clearItems");
      context.commit("clearItems", val);
      Vue.prototype.$bus.$emit("hello", "lencho");
    }
  },
  modules: {}
});
