<template>
<!-- 轮播图是一个组件，直接传递图片数据就可以了 -->
    <swiper>
      <swiper-item v-for="(item,index) in banners" :key="index">
        <a :href="item.link">
          <img :src="item.image" alt="" @load="imageLoad">
        </a>
      </swiper-item>
    </swiper>
</template>

<script>
import {Swiper,SwiperItem} from 'components/common/swiper/index'

export default {
  name:"HomeSwiper",
  props:{
      banners:{
          type:Array,
          default(){
              return[]
          }
      }
  },
  data(){
    return{
      isOnload:false
    }
  },
  components:{
    Swiper,
    SwiperItem
  },
  methods:{
    imageLoad(){
      if(!this.isOnload){
        this.$emit('swiperImageLoad')
        this.isOnload=true
      }
      
    }
  }
}
</script>

<style>
</style>
