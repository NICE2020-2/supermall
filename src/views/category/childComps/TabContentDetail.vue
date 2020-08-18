<template>
  <div class="goods">
    <goods-list-item v-for="(item,index) in categoryDetail" :key="index" :goods-item="item" />
  </div>
</template>
<script>
import GoodsListItem from "components/content/goods/GoodsListItem";

export default {
  name: "TabContentDetail",
  components: {
    GoodsListItem,
  },
  props: {
    categoryDetail: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  updated() {
    console.log(this.categoryDetail);
  },
};
</script>
<style scoped>
.goods {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
</style>