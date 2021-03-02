<template>
<!-- 对滚动进行封装 -->
<!-- 与home之间频繁进行父传子，子传父 -->
  <div class="wrapper" ref="wrapper">
      <div class="content">
          <slot></slot>
      </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
    name:"Scroll",
    props:{
        probeType:{
            type:Number,
            default:0
        },
        pullUpload:{
            type:Boolean,
            default:false
        }
    },
    data(){
        return{
            scroll:null,
            message:"111"
        }
    },
    mounted(){
        this.scroll=new BScroll(this.$refs.wrapper,{
            click:true,
            observeDOM:true,
            observeImage:true,
            probeType:this.probeType,
            pullUpLoad:this.pullUpload
        })
        this.scroll.scrollTo(0,0)

        // 2.监听滚动的位置
      if (this.probeType === 2 || this.probeType === 3) {
        this.scroll.on('scroll', (position) => {
          // console.log(position);
          this.$emit('scroll', position)
        })
      }
        
        // 加载更多时触发
        this.scroll.on('pullingUp',()=>{
            // console.log('加载更多');
            this.$emit('pullingUp')
        }
        )
    },
    methods:{
        scrollTo(x, y, time=300) {
        this.scroll && this.scroll.scrollTo(x, y, time)
      },
      refresh() {
          console.log("---");
        this.scroll && this.scroll.refresh()
      },
      finishPullUp() {
        this.scroll && this.scroll.finishPullUp()
      },
      getScrollY() {
        return this.scroll ? this.scroll.y : 0
      }
    
    },
}
</script>

<style>

</style>