import { POP, NEW, SELL } from "./const";
import { debounce } from "./utils";

export const itemListenerMixin = {
  data() {
    return {
      itemImageListener: null,
      newRefresh: null
    };
  },
  mounted() {
    // 1.图片加载旺财的事件监听
    this.newRefresh = debounce(this.$refs.scroll.refresh, 100);
    this.itemImageListener = () => {
      this.newRefresh();
    };
    this.$bus.$on("itemImageLoad", this.itemImageListener);
    console.log("000");
  }
};

export const backTopMixin = {
  data: function() {
    return {
      showBackTop: false
    };
  },
  methods: {
    backTop: function() {
      this.$refs.scroll.scrollTo(0, 0, 300);
    }
  }
};

export const tabControlMixin = {
  data: function() {
    return {
      currentType: POP
    };
  },
  methods: {
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = POP;
          break;
        case 1:
          this.currentType = NEW;
          break;
        case 2:
          this.currentType = SELL;
          break;
      }
      console.log(this.currentType);
    }
  }
};
