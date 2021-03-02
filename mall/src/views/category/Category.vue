<template>
  <div id="category">
    <nav-bar class="nav-bar"><div slot="center">商品分类</div></nav-bar>

    <div class="content">
      <tab-menu :categories="categories" @selectItem="selectItem"></tab-menu>
      
      <scroll
        id="tab-content"
        :data="[categoryData]"
        :probe-type="3"
        @scroll="contentScroll"
        :pull-upload="true"
        @pullingUp="loadMore"
      >
      <!-- <tab-control
        :titles="['综合', '新品', '销量']"
        class="tabcontrol"
        @itemClick="tabClick"
        v-show="isTabFixed"
      ></tab-control> -->
        <div>
          <tab-content-category
            :subcategories="showSubcategory"
            @ImageLoad="ImageLoad"
          ></tab-content-category>

          

          <tab-control
            :titles="['综合', '新品', '销量']"
            @itemClick="tabClick"
          ></tab-control>
          <tab-content-detail
            :category-detail="showCategoryDetail"
            ref="tabControl"
          ></tab-content-detail>
        </div>
      </scroll>
    </div>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";

import TabMenu from "./childComps/TabMenu";
import TabControl from "components/content/tabControl/TabControl";
import Scroll from "components/common/scroll/Scroll";
import TabContentCategory from "./childComps/TabContentCategory";
import TabContentDetail from "./childComps/TabContentDetail";

import {
  getCategory,
  getSubcategory,
  getCategoryDetail
} from "network/category";
import { POP, SELL, NEW } from "common/const";
import { tabControlMixin } from "common/mixin";

export default {
  name: "Category",
  components: {
    NavBar,
    TabMenu,
    TabControl,
    Scroll,
    TabContentCategory,
    TabContentDetail
  },
  mixins: [tabControlMixin],
  data() {
    return {
      categories: [],
      categoryData: {},
      currentIndex: -1,
      tabOffserTop: 0,
      isTabFixed: false,
      saveY: 0
    };
  },
  created() {
    // 1.请求分类数据
    this._getCategory();
  },
  computed: {
    showSubcategory() {
      if (this.currentIndex === -1) return {};
      return this.categoryData[this.currentIndex].subcategories;
    },
    showCategoryDetail() {
      if (this.currentIndex === -1) return [];
      return this.categoryData[this.currentIndex].categoryDetail[
        this.currentType
      ];
    }
  },
  methods: {
    contentScroll(position) {
      // console.log(position.y);
      //是否粘性定位1237 2624
      this.isTabFixed = -position.y > this.tabOffserTop-1379;
      // console.log("111");
    },
    ImageLoad() {
      this.tabOffserTop = this.$refs.tabControl.$el.offsetTop;
      // console.log(this.tabOffserTop);
      // console.log("222");
    },
    loadMore() {
      console.log("加载更多----");
    },
    _getCategory() {
      getCategory().then(res => {
        // 1.获取分类数据
        this.categories = res.data.category.list;
        // 2.初始化每个类别的子数据
        for (let i = 0; i < this.categories.length; i++) {
          this.categoryData[i] = {
            subcategories: {},
            categoryDetail: {
              pop: [],
              new: [],
              sell: []
            }
          };
        }
        // 3.请求第一个分类的数据
        this._getSubcategories(0);
      });
    },
    _getSubcategories(index) {
      this.currentIndex = index;
      const mailKey = this.categories[index].maitKey;
      getSubcategory(mailKey).then(res => {
        this.categoryData[index].subcategories = res.data;
        this.categoryData = { ...this.categoryData };
        this._getCategoryDetail(POP);
        this._getCategoryDetail(SELL);
        this._getCategoryDetail(NEW);
      });
    },
    _getCategoryDetail(type) {
      // 1.获取请求的miniWallkey
      const miniWallkey = this.categories[this.currentIndex].miniWallkey;
      // 2.发送请求,传入miniWallkey和type
      getCategoryDetail(miniWallkey, type).then(res => {
        // console.log(res);
        // 3.将获取的数据保存下来
        this.categoryData[this.currentIndex].categoryDetail[type] = res;
        this.categoryData = { ...this.categoryData };
      });
    },
    /**
     * 事件响应相关的方法
     */
    selectItem(index) {
      this._getSubcategories(index);
    }
  }
};
</script>

<style scoped>
#category {
  height: 100vh;
}

.nav-bar {
  background-color: var(--color-tint);
  font-weight: 700;
  color: #fff;
  z-index: 1;
}

.content {
  overflow: hidden;
  position: absolute;
  left: 0;
  right: 0;
  top: 44px;
  bottom: 49px;
  z-index: 99;
  display: flex;
}

#tab-content {
  height: 100%;
  flex: 1;
}
.tabcontrol {
  z-index: 1 ;
  background-color: red;
  height: 100px;
}
</style>
