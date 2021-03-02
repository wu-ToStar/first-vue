<template>
  <div class="toast" v-show="show">
    <div >{{ message }}</div>
  </div>
</template>

<script>
export default {
props:{
    message:{
        type:String,
    default:''
    }
    ,show:{
        type:Boolean,
        default:false
    }

}
}
</script>

<style>
.toast {
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: 10;
  height: 50px;
  line-height: 50px;
  width: 130px;
  text-align: center;
  transform: translateX(-50%) translateY(-50%);
  border-radius: 10%;
  background-color: rgba(0, 0, 0, 0.3);
  color: rgb(16, 145, 46);
}
</style>
