<template>
<!-- 父页面将导航栏数据同过props传递 -->
  <div class="recommend">
      <div v-for="(item,index) in recommends" :key="index" class="recommend-item">
          <a :href="item.link">
              <img :src="item.image" alt="">
              <div>{{item.title}}</div>
          </a>
      </div>
  </div>
</template>

<script>
export default {
    name:"RecommendView",
    props:{
        recommends:{
            type:Array,
            default(){
                return []
            }
        }
    }
}
</script>

<style>
.recommend{
    background-color: #fff;
    display: flex;
    width: 100%;
    text-align: center;
    font-size: 12px;
    padding: 5% 0 10% 0;
    border-bottom: 8px solid #eee;
}
.recommend-item{
    flex: 1;
}
.recommend-item img{
     width: 80%;
     height:80%;
     margin-bottom: 5%;
}
.recommend-item:hover{
     box-shadow: 0px 0px 10px transparent;
     opacity: 0.85;
}
.recommend-item:hover div{
     box-shadow: 0px 0px 10px transparent;
     opacity: 0.85;
     color: var(--color-tint);
}
</style>