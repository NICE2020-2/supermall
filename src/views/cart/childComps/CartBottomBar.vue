<template>
  <div class="bottom-bar">
    <div class="check-area">
      <check-button class="check-button" :is-checked="isSelectedAll" @click.native="checkClick" />
      <span>全选</span>
    </div>
    <div class="total">合计:{{totalPrice}}</div>
    <div class="calculate">去计算({{checkedLength}})</div>
  </div>
</template>
<script>
import CheckButton from "components/content/checkButton/CheckButton";

export default {
  name: "CartBottomBar",
  components: {
    CheckButton,
  },
  computed: {
    totalPrice() {
      return (
        "￥" +
        this.$store.state.cartList
          .filter((item) => item.checked)
          .reduce((pre, item) => {
            return pre + item.price * item.count;
          }, 0)
          .toFixed(2)
      );
    },
    checkedLength() {
      return this.$store.state.cartList.filter((item) => item.checked).length;
    },
    isSelectedAll() {
      if (this.checkedLength) {
        return this.$store.state.cartList.length === this.checkedLength;
      }
    },
  },
  methods: {
    checkClick() {
      if (this.isSelectedAll) {
        this.$store.state.cartList.forEach((item) => (item.checked = false));
      } else {
        this.$store.state.cartList.forEach((item) => (item.checked = true));
      }
    },
  },
};
</script>
<style scoped>
.bottom-bar {
  width: 100%;
  height: 44px;
  background-color: #ccc;
  display: flex;
  position: fixed;
  bottom: 50px;
  left: 0;
  box-shadow: 0 -2px 3px rgba(0, 0, 0, 0.2);
  font-size: 14px;
  color: #888;
  line-height: 44px;
  padding-left: 25px;
  box-sizing: border-box;
}
.check-area {
  display: flex;
  align-items: center;
  margin-right: 5px;
  width: 70px;
}
.check-button {
  width: 25px;
  height: 25px;
  line-height: 25px;
}
.total {
  margin-left: 10px;
  flex: 1;
}
.calculate {
  width: 80px;
  background-color: red;
  color: #fff;
  text-align: center;
}
</style>