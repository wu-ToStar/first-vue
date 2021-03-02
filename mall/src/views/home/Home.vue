<template>
  <!-- 相当于盒子，是本页面组件的聚集地 -->
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control
      ref="tabControl1"
      class="tab-control"
      :titles="['流行', '新款', '精选']"
      @tabClick="tabClick"
      v-show="isTabFixed"
      ><!-- 根据传回的状态进行数据的展示 -->
    </tab-control>
    <!-- 当滚动和加载时进行响应 -->
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
      :pull-upload="true"
      @pullingUp="loadMore"
    >
      <home-swiper
        :banners="banners"
        @swiperImageLoad="swiperImageLoad"
      ></home-swiper>
      <home-recommend-view :recommends="recommends"></home-recommend-view>
      <feature-view></feature-view>
      <tab-control
        ref="tabControl2"
        :titles="['流行', '新款', '精选']"
        @tabClick="tabClick"
        ><!-- 根据传回的状态进行数据的展示 -->
      </tab-control>
      <good-list :goods="showGoods"></good-list>
    </scroll>
    <!-- 监听组件 -->
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/content/tabControl/TabControl";
import GoodList from "components/content/goods/GoodList";
import Scroll from "components/common/scroll/Scroll";

import HomeSwiper from "./childComps/HomeSwiper";
import HomeRecommendView from "./childComps/HomeRecommendView.vue";
import FeatureView from "./childComps/FeatureView";
import BackTop from "components/content/backTop/BackTop";

import { getHomeMultidata, getHomeGoods } from "network/home";
import { debounce } from "common/utils";

// import BScroll from 'better-scroll'

export default {
  name: "Home",
  components: {
    NavBar,
    HomeSwiper,
    HomeRecommendView,
    FeatureView,
    TabControl,
    GoodList,
    Scroll,
    BackTop
  },
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] }
      },
      currentType: "pop",
      isShowBackTop: false,
      tabOffserTop: 0,
      isTabFixed: false,
      saveY: 0,
      homeItemImageListener:null
    };
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    }
  },
  activated() {
    this.$refs.scroll.scrollTo(0, this.saveY, 0);
    this.$refs.scroll.refresh();
  },
  deactivated() {
    this.saveY = this.$refs.scroll.getScrollY();
  

    this.$bus.$off('itemImgLoad',)
  },
  created() {
    this.$router.push('/home')
    this.getHomeMultidata();

    this.getHomeGoods("new");
    this.getHomeGoods("pop");
    this.getHomeGoods("sell");
  },
  mounted() {
    
    // 1.图片加载旺财的事件监听
    const refresh = debounce(this.$refs.scroll.refresh, 100);
    this.homeItemImageListener=() => {
      refresh();
      
    }
    this.$bus.$on("itemImageLoad", this.homeItemImageListener);
  },
  methods: {
    /*
      事件监听
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
      //保存两个tab-control的状态
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
      //  console.log(index);
    },
    backClick() {
      this.$refs.scroll.scrollTo(0, 0, 300);
      // console.log(this.$refs.scroll.message);
    },
    contentScroll(position) {
      // console.log(position.y);
      //1.是否显示置顶
      this.isShowBackTop = -position.y > 1000;
      //2.是否粘性定位
      this.isTabFixed = -position.y > this.tabOffserTop;

      this.saveY=position.y
    },
    loadMore() {
      // console.log("加载更多----");
      this.getHomeGoods(this.currentType);
      // this.$refs.scroll.scroll.refresh();
    },
    //在轮播图加载后获取tabControl的offsetTop
    swiperImageLoad() {
      this.tabOffserTop = this.$refs.tabControl2.$el.offsetTop;
      // console.log(this.tabOffserTop);
    },
    /*
      网络请求
    */
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
      this.$forceUpdate();
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then(res => {
        //使用es6的拓展运算符
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;

        //完成上拉加载
        this.$refs.scroll.finishPullUp();
      });
    }
  }
};
</script>

<style scoped>
#home {
  /* padding-top: 43px; */
  height: 100vh;
  position: relative;
}
.home-nav {
  background-color: var(--color-tint);
  color: #fff;

  padding-top: -2px;
}

.content {
  overflow: hidden;

  position: absolute;
  top: 44px;
  bottom: 0px;
  left: -1px;
  right: 0;
}
.tab-control {
  position: relative;
  z-index: 1;
}
</style>
