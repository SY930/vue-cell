<template>
  <transition name="move">
    <div v-show="showFlag" class="food" ref="food">
      <div class="food-content">
        <div class="image-header">
          <img :src="food.image" alt="">
          <div class="back" @click="hide">
          <i class="icon-arrow_left"></i>
          </div>
        </div>
        <div class="content">
          <h1 class="title">{{food.name}}</h1>
          <div class="detail">
            <span class="sell-count">月售:{{food.sellCount}}</span>
            <span class="rating">好评率{{food.rating}}</span>
          </div>
          <div class="price">
            <span class="now">￥{{food.price}}</span><span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
          </div>
          <div class="cartcontrol-wrapper">
            <cartControl :food="food"></cartControl>
          </div>
          <transition name="fade">
            <div @click.stop.prevent="addFirst" class="buy" v-show="!food.count||food.count===0">
              加入购物车
            </div>
          </transition>
        </div>
        <Split v-show="food.info"></Split>
        <div class="info" v-show="food.info">
          <h1 class="title">商品信息</h1>
          <p class="text">{{food.info}}</p>
        </div>
        <Split></Split>
        <div class="rating">
          <h1 class="title">商品评价</h1>
        </div>
      </div>

    </div>
  </transition>
</template>
<script>
  import Vue from  'vue'
  import BScroll from 'better-scroll'
  import cartControl from '../cartcontrol/cartcontrol.vue'
  import Split from '../split/split.vue'
  export default{
    props: {
      food: {
        type: Object
      }
    },
    data(){
      return {
        showFlag: false
      }
    },
    methods: {
      show(){
        this.showFlag = true;
        this.$nextTick(()=>{
            if(!this.scroll){
                this.scroll = new BScroll(this.$refs.food,{
                    click:true
                })
            }else {
                this.scroll.refresh();
            }
        })
      },
      hide(){
        this.showFlag = false
      },
      addFirst(event){
        if(!event._constructed){
            return
        }
       // console.log(event.target);
        this.$root.eventHub.$emit('cart.add',event);
        Vue.set(this.food,'count',1)
      }
    },
    components:{
        cartControl,
      Split
    }
  }
  //第59行注释：w3c说给padding值设置为100%的时候，计算的时候是按照这个盒子的宽度（百分百）计算的，所以当我们给padding设置为100%，就相当于宽度的100%，也就是保证上下的padding值和宽度是一样的，所以盒子看起来就是宽高相等的盒子
</script>

<style type="text/stylus" lang="stylus">

  .food
    position: fixed
    left: 0
    top: 0
    bottom: 48px
    z-index: 30
    width: 100%
    background: #ffffff
    transform: translate3d(0, 0, 0)
    &.move-enter-active,&.move-leave-active
     transition: all 0.2s linear
    &.move-enter,&.move-leave-active
     transform: translate3d(100%, 0, 0)
    .food-content
      .image-header
        position :relative
        width :100%
        height :0
        padding-top :100%
        img
          position :absolute
          top:0
          left :0
          width :100%
          height :100%
        .back
          position :absolute
          top:10px
          left :0
          .icon-arrow_left
            display :block
            padding :10px
            font-size :20px
            color :#ffffff



      .content
        position :relative
        padding :18px
        .title
          line-height :14px
          margin-bottom :8px
          font-size :14px
          font-weight :700
          color :rgb(7,17,27)
        .detail
          margin-bottom :18px
          line-height :10px
          font-size :0
          height:10px
          .sell-count,.rating
           font-size :10px
           color :rgb(147,153,159)
          .sell-count
             margin-right :12px
        .price
          font-weight :700
          line-height :24px
        .now
          margin-right :8px
          font-size :14px
          color: rgb(240,20,20)
        .old
          text-decoration :line-through
          font-size :10px
          color :rgb(147,153,159)


        .cartcontrol-wrapper
          position absolute
          right :12px
          bottom :12px
        .buy
          position :absolute
          right :18px
          bottom :18px
          z-index :10px
          line-height :24px
          padding :0 12px
          box-sizing :border-box
          border-radius :12px
          color :#fff
          background :rgb(0,160,220)
          font-size :10px
          opacity: 1
          &.fade-enter-active, &.fade-leave-active
           transition: all 0.2s
          &.fade-enter, &.fade-leave-active
           opacity: 0
           z-index: -1


      .info
        padding :18px
        .title
          line-height :14px
          margin-bottom :16px
          font-size :14px
          color :rgb(77,85,93)
        .text
          line-height :24px
          padding :0 8px
          font-size :12px
          color :rgb(77,85,93)
</style>
