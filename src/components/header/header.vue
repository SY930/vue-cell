<template>
<div class="header">
  <div class="con-wrap">
    <div class="avatar">
      <img :src="seller.avatar" alt="">
    </div>
    <div class="content">
      <div class="title">
        <span class="brand"></span>
        <span class="name">{seller.name}</span>
      </div>
      <div class="description">
        {{seller.description}}/{{seller.deliverTime}}分钟送达
      </div>
      <!--v-if="seller.supports"如果没有这个，控制台会报错，因为请求是一步的，如果不加那么[0]取值的时候是undefind-->
      <div class="support" v-if="seller.supports">
        <span class="text">{{seller.supports[0].description}}</span>
      </div>

    </div>
  </div>
  <div class="bulletin-warp"></div>
</div>
</template>
<script>
export default{
    props:{
        type:Object
    }
}
</script>
<style type="text/stylus" lang="stylus">

</style>
