<template>
  <div class="ratings">
    <div class="ratings-content">
      <div class="overview">
        <!--设计师虽然标了一个宽，但overview层要自适应，如果用flex布局的话左边固定右边自适应的话，iphone5小屏幕会有问题，所有需要用media 对一些比较小的手机做自适应-->
        <div class="overview-left">
          <div class="score">{{seller.score}}</div>
          <div class="title">综合评分</div>
          <div class="rank">高于周边商家{{seller.rankRate}}</div>
        </div>
        <div class="overview-right">
          <div class="score-wrapper">
            <span class="title">服务态度</span>
            <Star :size="36" :score="seller.serviceScore"></Star>
            <span class="score">{{seller.serviceScore}}</span>
          </div>
          <div class="score-wrapper">
            <span class="title">商品评分</span>
            <Star :size="36" :score="seller.foodScore"></Star>
            <span class="score">{{seller.foodScore}}</span>
          </div>
          <div class="delivery-wrapper">
            <span class="title">送达时间</span>
            <span class="delivery">{{seller.deliveryTime}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import Star from '../star/star.vue'
export default{
    props:{
        seller:{
            type:Object
        }
    },
  components:{
        Star
  }
}
</script>
<style type="text/stylus" lang="stylus">
  .ratings
    position: absolute
    top: 174px
    bottom: 0
    left: 0
    width: 100%
    overflow: hidden
    .ratings-content
      .overview
        display: flex
        padding: 18px 0
        .overview-left
          flex: 0 0 137px
          padding: 6px 0
          width: 137px
          border-right: 1px solid rgba(7, 17, 27, .1)
          text-align: center
          .score
            margin-bottom :6px
            line-height :28px
            font-size :24px
            color :rgb(255,153,0)
          .title
            margin-bottom :8px
            line-height :12px
            font-size :12px
            color :rgb(7,17,27)
          .rank
            line-height :10px
            font-size :10px
            color :rgb(147,153,159)
        .overview-right
          flex: 1
          padding: 6px 0 6px 24px
          .score-wrapper
             margin-bottom :8px
             font-size :0
             .title
                display :inline-block
                line-height :18px
                vertical-align :top
                font-size :12px
                color :rgb(7,17,27)
             .star
                display :inline-block
                line-height :18px
                vertical-align :top
                padding :0 12px
                font-size :12px
                color :rgb(255,253,177)
             .score
              display: inline-block
              line-height: 18px
              vertical-align: top
              font-size: 12px
              color: rgb(255, 153, 0)


          .delivery-wrapper
            font-size :0
          .title
            line-height :18px
            font-size :12px
            color :rgb(7,17,27)
          .delivery
            margin-left :12px
            font-size :12px
            color :rgb(147,153,159)


</style>
