<template>
  <div class="bottom-bar">
    <div class="bar-item bar-left">
      <div>
        <i class="icon service"></i>
        <span class="text">客服</span>
      </div>
      <div>
        <i class="icon shop"></i>
        <span class="text">店铺</span>
      </div>
      <div>
        <i class="icon select"></i>
        <span class="text">收藏</span>
      </div>
    </div>
    <div class="bar-item bar-right">
      <div class="cart" @click="addToCart">加入购物车</div>
      <div class="buy">购买</div>
    </div>
    <!-- <sport-ball ref="ball" class="sport-ball"></sport-ball> -->
  </div>
</template>
<script>
export default {
  name: "DetailBottomBar",
  methods: {
    addToCart() {
      this.$emit("addCart");
    },
  },
};
</script>
<style scoped>
.bottom-bar {
  height: 49px;
  background-color: #ffffff;
  position: fixed;
  left: 0;
  bottom: 0;
  right: 0;
  display: flex;
  text-align: center;
}
.bar-item {
  flex: 1;
  display: flex;
  text-align: center;
  /* align-items: center; */
}
.bar-left > div {
  flex: 1;
}
.bar-left {
  line-height: 49px;
  font-size: 13px;
}
.bar-right > div {
  flex: 1;
}
.bar-right {
  line-height: 49px;
  font-size: 15px;
  color: #fff;
}
.cart {
  background-color: peru;
  color: #333;
}
.buy {
  background-color: #f69;
}
</style>