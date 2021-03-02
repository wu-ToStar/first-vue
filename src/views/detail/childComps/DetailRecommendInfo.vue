<template>
<!-- 商品推荐 -->
  <div class="recommend-info">
    <div class="info-header">热门推荐</div>
    <grid-view>
            <goods-list-item class="gooditem" v-for="(item, index) in recommendList" :key="index" :goodsItem="item"></goods-list-item>
    </grid-view>
  </div>
</template>

<script>
  import GridView from 'components/common/gridView/GridView'
  import GoodsListItem from 'components/content/goods/GoodsListItem'
import GoodList from 'components/content/goods/GoodList.vue'

	export default {
		name: "DetailRecommendInfo",
    components: {
		  GridView,
      GoodsListItem,
        GoodList
    },
    props: {
		  recommendList: {
		    type: Array
      }
    }
	}
</script>

<style scoped>
  .recommend-info {
    padding: 5px;
  }

  .info-header {
    line-height: 40px;
    padding-left: 8px;
    font-size: 15px;
    color: #333;
  }
  .goods-item {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
}
</style>
