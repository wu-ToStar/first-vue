<template
  ><div>
    <div id="detail">
      <detail-nav-bar
        class="detail"
        @titleClick="titleClick"
        ref="nav"
      ></detail-nav-bar>
      <scroll
        class="detailcontent"
        @scroll="contentScroll"
        ref="scroll"
        :probe-type="3"
        :pull-upload="true"
        @pullingUp="loadMore"
      >
        <detail-swiper :topImages="topImages"></detail-swiper>
        <detail-base-info :goods="goods"></detail-base-info>
        <detail-shop-info :shop="shop"></detail-shop-info>
        <detail-goods-info
          :detail-info="detailInfo"
          class="goodsinfo"
          @imageLoad="imageLoad"
        ></detail-goods-info>
        <detail-param-info
          ref="param"
          :param-info="paramInfo"
        ></detail-param-info>
        <detail-comment-info
          ref="comment"
          :comment-info="commentInfo"
        ></detail-comment-info>
        <detail-recommend-info
          ref="recommend"
          :recommend-list="recommendList"
        ></detail-recommend-info>
      </scroll>
      <detail-bottom-bar
        @addToCart="addToCart"
        class="bottom"
      ></detail-bottom-bar>
      <back-top
        @click.native="backClick"
        class="back-top"
        v-show="isShowBackTop"
      ></back-top>
    <toast :message="message" :show="show"></toast>
    </div>
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar.vue";
import DetailSwiper from "./childComps/DetailSwiper.vue";
import DetailBottomBar from "./childComps/DetailBottomBar";
import DetailBaseInfo from "./childComps/DetailBaseInfo.vue";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
import DetailParamInfo from "./childComps/DetailParamInfo";
import DetailCommentInfo from "./childComps/DetailCommentInfo";
import DetailRecommendInfo from "./childComps/DetailRecommendInfo";

import {
  getDetail,
  Goods,
  Shop,
  GoodsParam,
  getRecommend
} from "network/detail";
import { itemListenerMixin } from "common/mixin";
import { debounce } from "common/utils";

import BackTop from "components/content/backTop/BackTop";
import Scroll from "components/common/scroll/Scroll";
import Toast from 'components/common/toast/Toast.vue';

export default {
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailRecommendInfo,
    DetailBottomBar,
    BackTop,
    Toast
  },
  
    name: "Detail",
  mixins: [itemListenerMixin],
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommendList: [],
      themeTops: [],
      currentIndex: 0,
      //   itemImageListener: null,
      isShowBackTop: false,
      themeTopYs: [],
      getThemeTopY: null,
      message:"",
      show:false
    };
  },
  created() {
    console.log("进入");
    this.iid = this.$route.params.iid;

    getDetail(this.iid).then(res => {
      //   console.log(res);
      const data = res.result;
      //获取轮播图信息
      this.topImages = res.result.itemInfo.topImages;
      // this.$refs.scroll.scroll.refresh();
      //获取商品信息
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );

      // 获取店铺信息
      this.shop = new Shop(data.shopInfo);

      // 获取商品详情信息
      this.detailInfo = data.detailInfo;

      // 保存参数信息
      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );

      // 保存评论信息
      if (data.rate.list) {
        this.commentInfo = data.rate.list[0];
      }

      //   this.$nextTick(() => {
      //       this.$refs.scroll.refresh();
      //   });
    });
    getRecommend().then(res => {
      // console.log(res);
      this.recommendList = res.data.list;
    });

    this.getThemeTopY = debounce(() => {
      this.themeTopYs = [];

      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.param.$el.offsetTop);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
      this.themeTopYs.push(Number.MAX_VALUE);

      //   console.log(this.themeTopYs);
    }, 50);
  },
  methods: {
    titleClick(index) {
      console.log(index);
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 100);
    },
    imageLoad() {
      this.newRefresh();
      //   console.log("ok");
      this.getThemeTopY();
      this.$refs.scroll.refresh();
    },
    backClick() {
      this.$refs.scroll.scrollTo(0, 0, 300);
      this.newRefresh();
      console.log("ooo");
    },
    contentScroll(position) {
      this.newRefresh();
      // console.log(position.y);
      const positionY = -position.y;

      // this.imageLoad()

      let length = this.themeTopYs.length;
      for (let i = 0; i < length - 1; i++) {
        if (
          this.currentIndex !== i &&
          positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i + 1]
        ) {
          this.currentIndex = i;
          this.$refs.nav.currentIndex = this.currentIndex;
        }
      }
      //1.是否显示置顶
      this.isShowBackTop = -position.y > 1000;
      // console.log("11");
    },
    addToCart() {
      // 1.创建对象
      const obj = {};
      // 2.对象信息
      obj.iid = this.iid;
      obj.imgURL = this.topImages[0];
      obj.title = this.goods.title;
      obj.desc = this.goods.desc;
      obj.newPrice = this.goods.nowPrice;
      // 3.添加到Store中
    //   console.log("+++");
    //异步可以返回一个Promise
      this.$store.dispatch("addCart", obj).then(res=>{
        console.log(res);
        this.show=true;
        this.message=res

        setTimeout(() => {
          this.show=false
          this.message=""
        }, 1500);
        // this.$toast.show(res,2000)
      });
    },
    loadMore() {
      // console.log("加载更多----");
    }
  },
  destroyed() {
    //关闭事件总线
    this.$bus.$off("itemImageLoad", this.itemImageListener);
    console.log("离开");
  }
};
</script>

<style>
#detail {
  height: 100vh;
  position: relative;
  z-index: 1;
  background-color: #fff;
}
.detailcontent {
  position: absolute;
  top: 44px;
  bottom: 60px;
  z-index: 1;
  background-color: #fff;
  overflow: hidden;
}
.goodsinfo {
  position: relative;
}
.bottom {
  position: sticky;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
}
.back-top {
  position: fixed;
  right: 10px;
  bottom: 65px;
  z-index: 1;
}
</style>
