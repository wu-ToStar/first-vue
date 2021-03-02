<template>
  <div class="goods">
    <!-- 接受数据遍历传给子组件进行布局 -->
      <goods-list-item v-for="(item,index) in goods" :key="index"
      :goods-item="item">

      </goods-list-item>
  </div>
</template>

<script>
import GoodsListItem from './GoodsListItem.vue';
export default {
  components: { GoodsListItem },
  name: "",
  props: {
    goods: {
      type: Array,
      default() {
        return [];
      }
    }
  }
};
</script>

<style>
.goods {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
}
</style>
