<template>
  <div class="header">
    <div class="con-wrap">
      <div class="avatar">
        <img :src="seller.avatar" alt="">
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">
          {{seller.description}}/{{seller.deliverTime}}分钟送达
        </div>
        <!--v-if="seller.supports"如果没有这个，控制台会报错，因为请求是一步的，如果不加那么[0]取值的时候是undefind-->
        <div class="support" v-if="seller.supports">
          <span class="icon" :class="classMap[seller.supports[0].type]"></span>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>

      </div>
      <div v-if="seller.supports" class="support-count">
        <span class="count">{{seller.supports.length}}个 </span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>

    </div>
    <div class="bulletin-warp">
      <span class="bulletin-title"></span><span class="bulletin-text">{{seller.bulletin}}</span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
  </div>
</template>
<script>
  export default{
    props: {
      seller: {
        type: Object
      }
    },
    created(){
      this.classMap = ['decrease', 'discount', 'guarantee', 'invoice', 'special']
    }
  }
</script>
<style type="text/stylus" lang="stylus">
  @import "../../common/stylus/mixin.styl"

  .header
    color: #fff
    background: #999
    .con-wrap
      position :relative
      padding: 24px 12px 18px 24px
      /*inline-block会导致有空白字符，解决办法给父级设置font-size:0*/
      font-size 0
      .avatar
        display inline-block
        width: 64px;
        height: 64px;
        vertical-align: top
        img
          width 100%
          height 100%
          border-radius: 2px
      .content
        display: inline-block
        margin-left: 16px
        font-size: 14px
        .title
          margin: 2px 0 8px 0
          .brand
            display: inline-block
            width 30px
            height 18px
            vertical-align: top
            bg-image('brand')
            background-size: 30px 18px
            background-repeat: no-repeat
        .name
          margin-left: 6px
          font-size: 16px
          line-height: 18px
          font-weight: bold

        .description
          margin-bottom: 10px
          line-height: 12px
          font-size: 12px
        .support
          .icon
            display: inline-block
            vertical-align :middle
            width: 12px
            height: 12px
            margin-right: 4px
            background-size: 12px 12px
            background-repeat: no-repeat
            &.decrease
              bg-image('decrease_1')
            &.discount
              bg-image('discount_1')
            &.guarantee
              bg-image('guarantee_1')
            &.invoice
              bg-image('invoice_1')
            &.special
              bg-image('special_1')

          .text
            line-height :12px
            font-size :10px
      .support-count
         position: absolute
         right :12px
         bottom :14px
         padding :0 8px
         height :24px
         line-height :24px
         border-radius :14px
         background :rgba(0,0,0,0.2)
         text-align :center
         .count
            vertical-align :top
            font-size :10px
          .icon-keyboard_arrow_right
            margin-left :2px
            line-height :24px
            font-size :10px
    .bulletin-warp
       position :relative
       height :28px
       line-height :28px
       padding :0 22px 0 12px
       white-space :nowrap
       overflow :hidden
       text-overflow :ellipsis
       background :rgba(7,17,27,.2)
       .bulletin-title
          display :inline-block
          vertical-align :top
          margin-top :7px
          width :22px
          height :12px
          bg-image('bulletin')
          background-size :22px 12px
          background-repeat :no-repeat
        .bulletin-text
            vertical-align :top
            margin:0 4px
            font-size :10px
        .icon-keyboard_arrow_right
            position :absolute
            font-size :10px
            right:12px
            top:8px

</style>
