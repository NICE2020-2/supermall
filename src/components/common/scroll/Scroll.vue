<template>
  <div ref="wrapper">
    <slot></slot>
  </div>
</template>
<script>
import BSscroll from "better-scroll";

export default {
  name: "Scroll",
  props: {
    probeType: {
      type: Number,
      default: 0,
    },
    pullUpLoad: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      scroll: null,
    };
  },
  mounted() {
    this.scroll = new BSscroll(this.$refs.wrapper, {
      click: true,
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad,
    });

    this.scroll.on("scroll", (position) => {
      this.$emit("scroll", position);
    });

    this.scroll.on("pullingUp", () => {
      this.$emit("pullingUp");
    });
  },
  methods: {
    scrollTo(x, y, time = 300) {
      this.scroll && this.scroll.scrollTo(x, y, time);
    },
    finishPullUp() {
      this.scroll && this.scroll.finishPullUp();
    },
    refresh() {
      // console.log("-----");
      this.scroll && this.scroll.refresh();
    },
  },
  watch: {
    data() {
      setTimeout(this.refresh, 20);
    },
  },
};
</script>
<style scoped>
</style>