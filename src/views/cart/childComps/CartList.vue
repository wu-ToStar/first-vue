<template>
  <!-- <div class="cart-list"> -->
  <scroll class="content" ref="scroll">
    <div>
      <cart-list-item
        v-for="(item, index) in cartList"
        :key="index"
        :itemInfo="item"
      ></cart-list-item>
      <ul>
        <li>  </li>
        <li>  </li>
        <li>  </li>
        <li>  </li>
        <li>  </li>
        <li>  </li>
        <li>  </li>
        <li>  </li>
        <li>  </li>
        <li>  </li>
        <li>  </li>
        <li>  </li>
        <li>  </li>
        <li>  </li>
        <li>  </li>
        <li>  </li>
        <li>  </li>
        <li>  </li>
        <li>  </li>
        <li>  </li>
        <li>  </li>
      </ul>
    </div>
  </scroll>

  <!-- </div> -->
</template>

<script>
import { mapGetters } from "vuex";
import Scroll from "components/common/scroll/Scroll.vue";
import CartListItem from "./CartListItem";
export default {
  components: { Scroll, CartListItem },
  computed: {
    ...mapGetters(["cartList"])
  },
  activated(){
      this.$refs.scroll.refresh()
  }
};
</script>

<style>
/* .cart-list{
    height: calc(10vh - 44px - 49px);
}
.content{
    height: 100%;
    overflow: hidden;
} */
</style>
