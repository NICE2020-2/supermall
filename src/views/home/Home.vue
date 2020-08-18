<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物车</div>
    </nav-bar>
    <tab-control
      class="tab-control"
      :titles="['流行','新款','精选']"
      @tabClick="tabClick"
      ref="tabControl1"
      v-show="isTabFixed"
    />

    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
      :pull-up-load="true"
      @pullingUp="loadMore"
    >
      <div>
        <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad " />
        <HomeRecommendView :recommends="recommends" />
        <feature-view />
        <tab-control :titles="['流行','新款','精选']" @tabClick="tabClick" ref="tabControl2" />
        <goods-list :goods="showGoods" />
      </div>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop" />
  </div>
</template> 
<script>
import NavBar from "components/common/navbar/NavBar";
import HomeSwiper from "./childComps/HomeSwiper";
import HomeRecommendView from "./childComps/HomeRecommendView";
import FeatureView from "./childComps/FeatureView";
import TabControl from "components/content/tabControl/TabControl";
import GoodsList from "components/content/goods/GoodsList";
import Scroll from "components/common/scroll/Scroll";
import BackTop from "components/content/backtop/BackTop";

import { getHomeMultidata, getHomeGoods } from "network/home";

import { debounce } from "common/utils";

export default {
  name: "Home",
  components: {
    NavBar,
    HomeSwiper,
    HomeRecommendView,
    FeatureView,
    TabControl,
    GoodsList,
    Scroll,
    BackTop,
  },
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      currentType: "pop",
      isShowBackTop: false,
      TabOffsetTop: 0,
      isTabFixed: false,
      saveY: 0,
      itemImgListener: null,
    };
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    },
  },
  created() {
    this.getHomeMultidata();
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  mounted() {
    let newRefresh = debounce(this.$refs.scroll.refresh, 100);
    this.itemImgListener = () => {
      newRefresh();
    };
    this.$bus.$on("itemImageLoad", this.itemImgListener);
  },
  activated() {
    this.$refs.scroll.refresh();
    this.$refs.scroll.scrollTo(0, this.saveY, 0);
    // console.log(this.saveY);
  },
  deactivated() {
    this.saveY = this.$refs.scroll.scroll.y;
    // 离开home后取消监听
    this.$bus.$off("itemImgListener", this.itemImgListener);
    // console.log(this.saveY);
  },
  methods: {
    /**
     * 网络请求相关方法
     */
    getHomeMultidata() {
      getHomeMultidata().then((res) => {
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then((res) => {
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;
        this.$refs.scroll.finishPullUp();
      });
    },

    /**
     * 事件请求相关方法
     */
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    backClick() {
      this.$refs.scroll.scrollTo(0, 0, 500);
    },
    contentScroll(position) {
      // 判断backtop是否显示
      this.isShowBackTop = -position.y > 1000;

      // 判断是需要吸顶
      this.isTabFixed = -position.y > this.TabOffsetTop;
    },
    loadMore() {
      this.getHomeGoods(this.currentType);
      this.$refs.scroll.scroll.refresh();
    },
    swiperImageLoad() {
      this.TabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
    },
  },
};
</script>

<style scoped>
#home {
  height: 100vh;
  position: relative;
}
.home-nav {
  background-color: var(--color-tint);
  color: #fff;
  /* position: fixed;
  left: 0;
  right: 0;
  top: 0; */
  z-index: 999;
  font-size: 16px;
}

.content {
  overflow: hidden;

  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}

.tab-control {
  position: relative;
  z-index: 9;
}
</style>