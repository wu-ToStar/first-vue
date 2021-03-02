<template>
<!-- <h2>购物车</h2> -->
<div>
  <nav-bar class="nav-bar">
    <div slot="center">购物车({{$store.getters.cartCount}})</div>
  </nav-bar>
  <cart-list class="cart-list" ></cart-list>
  <bottom-bar></bottom-bar>
</div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import CartList from './childComps/CartList'
import BottomBar from './childComps/BottomBar.vue'

export default {
  components: { NavBar ,CartList,BottomBar},

}
</script>

<style>
.cart{
    height:100vh;
}
.nav-bar{
  background-color: var(--color-tint);
  color: #fff;
}
 .cart-list {
    position: absolute;
    top: 44px;
    bottom: 49px;
    width: 100%;
    overflow: hidden;
  }
</style>
