<template>
<!-- 对数据进行布局 -->
<div class="goods-item" @click="itemClick">
    <img v-lazy="showImage" alt="" @load="imageLoad">
    <div class="goods-info">
        <p>{{goodsItem.title}}</p>
        <span class="price">{{goodsItem.price}}</span>
        <span class="collect">{{goodsItem.cfav}}</span>
    </div>
</div>
  
</template>

<script>
export default {
name:"",
props:{
    goodsItem:{
        type:Object,
        default(){
            return {}
        }
    }
},computed:{
  showImage(){
    return  this.goodsItem.img || this.goodsItem.image || this.goodsItem.show.img 
  }
},
methods:{
  //判断是否加载好图片
  imageLoad(){
    // console.log('imageLoad');
    this.$bus.$emit('itemImageLoad')
  },
  //从首页跳转到详情页
  itemClick(){
    if(this.goodsItem.item_id){
      this.goodsItem.iid=this.goodsItem.item_id
      this.$router.push('/detail/'+this.goodsItem.iid)
    }else{
      this.$router.push('/detail/'+this.goodsItem.iid)
    }
    
  }
}
}
</script>

<style>
.goods-item {
  padding-bottom: 40px;
  position: relative;
  width: 40%;
  display: flex;
}

.goods-item img {
  width: 98%;
  border-radius: 5px;
}
.goods-item img:hover{
  width: 100%;
  border-radius: 5px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
}
.goods-info {
  font-size: 12px;
  position: absolute;
  bottom: 5px;
  left: 0;
  right: 0;
  overflow: hidden;
  text-align: center;
}

.goods-info p {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 3px;
}

.goods-info .price {
  color: var(--color-high-text);
  margin-right: 20px;
}

.goods-info .collect {
  position: relative;
}

.goods-info .collect::before {
  content: '';
  position: absolute;
  left: -15px;
  top: -1px;
  width: 14px;
  height: 14px;
  background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
}
</style>