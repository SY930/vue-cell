<template>
  <div>
  <div class="shopcart">
    <div class="content" @click="toggleList">
      <div class="content-left">
        <div class="logo-wrapper">
          <div class="logo" :class="{'highLight':totalCount>0}">
            <i class="icon-shopping_cart" :class="{'highLight':totalCount>0}"></i>
          </div>
          <div class="num" v-show="totalCount>0">
            {{totalCount}}
          </div>
        </div>
        <div class="price" :class="{'highLight':totalPrice>0}">￥{{totalPrice}}元</div>
        <div class="desc">另需配送费￥{{deliveryPrice}}元</div>
      </div>
      <div class="content-right" @click.stop.prevent="pay">
        <div class="pay" :class="payClass">
          {{payDesc}}
        </div>
      </div>
    </div>

    <!--动画中的小球-->
    <div class="ball-container">
      <div v-for="ball in balls">
        <transition
          name="drop" @before-enter="beforeDrop" @enter="dropping" @after-enter="afterDrop"
        >
          <div v-show="ball.show" class="ball">
            <div class="inner inner-hook"></div>
          </div>
        </transition>
      </div>
    </div>
    <transition name="fold">
      <div class="shopcart-list" v-show="listShow">
        <div class="list-header">
          <h1 class="title">购物车</h1>
          <span class="empty" @click="clearAll">清空</span>
        </div>
        <div class="list-content" ref="listContent">
          <ul>
            <li class="food" v-for="food in selectFoods">
              <span class="name">{{food.name}}</span>
              <div class="price">
                <span>￥{{food.price*food.count}}</span>
              </div>
              <div class="cartcontrol-wrapper">
                <cartControl :food="food"></cartControl>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </transition>

  </div>
    <transition name="fade">
  <div class="list-mark" @click="hideList" v-show="listShow"></div>
    </transition>
  </div>
</template>
<script>

  import cartControl from '../cartcontrol/cartcontrol.vue'
  import BScroll from 'better-scroll'
  export default {
    props: {
      selectFoods: {
        type: Array,
        default(){
          return [{
            count: 2,
            price: 30
          }]
        }
      },
      deliveryPrice: {
        type: Number,
        //default:0
      },
      minPrice: {
        type: Number,
        default: 0
      }
    },
    data(){
      return {
        balls: [
          {show: false},
          {show: false},
          {show: false},
          {show: false},
          {show: false},
        ],
        dropBalls: [],
        fold: true,//表示是否展开折叠的状态
      }
    },
    created(){

    },
    methods: {
      //el是点击添加的那个按钮 、、小球动画执行
      drop(el){
        //console.log(el);
        for (let i = 0; i < this.balls.length; i++) {
          let ball = this.balls[i];
          if (!ball.show) {
            ball.show = true;//关键点：能触发动画
            ball.el = el;//保留dom元素，算位置的时候用
            this.dropBalls.push(ball);
            return
          }
        }
      },
      beforeDrop(el) {
        //console.log(el);//小球的dom

        let count = this.balls.length;
        while (count--) {
          let ball = this.balls[count];
          if (ball.show) {
            // console.log(ball.el);//点击的事件源
            let rect = ball.el.getBoundingClientRect();//获取元素相对于视口的位置；rect返回的left和top就是相对视口的偏移
            let x = rect.left - 32;
            let y = -(window.innerHeight - rect.top - 22);
            el.style.display = '';
            el.style.webkitTransform = `translate3d(0,${y}px,0)`;
            el.style.transform = `translate3d(0,${y}px,0)`;
            let inner = el.getElementsByClassName('inner-hook')[0];
            inner.style.webkitTransform = `translate3d(${x}px,0,0)`;
            inner.style.transform = `translate3d(${x}px,0,0)`;
          }
        }
      },
      dropping(el, done) {
        /* eslint-disable no-unused-vars */
        let rf = el.offsetHeight;//主动触发浏览器重绘。加上注释才不会报错
        this.$nextTick(() => {
          el.style.webkitTransform = 'translate3d(0,0,0)';
          el.style.transform = 'translate3d(0,0,0)';
          let inner = el.getElementsByClassName('inner-hook')[0];
          inner.style.webkitTransform = 'translate3d(0,0,0)';
          inner.style.transform = 'translate3d(0,0,0)';
          el.addEventListener('transitionend', done);
        });
      },
      afterDrop(el) {
        let ball = this.dropBalls.shift();
        if (ball) {
          ball.show = false;
          el.style.display = 'none';
        }
      },
      //点击购物车展开或者折叠
      toggleList(){
        if (!this.totalCount) {
          return
        }
        this.fold = !this.fold
        // console.log(this.fold);
      },
      clearAll(){
          this.selectFoods.forEach((food)=>{
              food.count = 0
          })
      },
      hideList(){
         this.fold = true;
      },
      pay(){
          if(this.totalPrice<this.minPrice){
              return
          }
          window.alert(`支付${this.totalPrice}元`)
      }
    },
    computed: {
      totalPrice(){
        let total = 0;
        this.selectFoods.forEach((food) => {
          total += food.count * food.price
        });
        return total
      },
      totalCount(){
        let count = 0;
        this.selectFoods.forEach((food) => {
          count += food.count
        });
        return count
      },
      payDesc(){
        if (this.totalPrice === 0) {
          return `￥${this.minPrice}元起送`
        } else if (this.totalPrice < this.minPrice) {
          let diff = this.minPrice - this.totalPrice
          return `还差￥${diff}元起送`
        } else {
          return '去结算'
        }
      },
      payClass(){
        if (this.totalPrice < this.minPrice) {
          return 'not-enough'
        } else {
          return 'enough'
        }
      },
      //购物车显示隐藏
      listShow(){
        if (!this.totalCount) {//购物车没有的时候
          this.fold = true;
          // console.log('没有购物车的时候===='+this.fold);
          return false
        }
        let show = !this.fold;
        // console.log(show);
        if (show) {
          //数据变了，dom的变化并没有立即生效
          this.$nextTick(() => {
            if (!this.scroll) {
              this.scroll = new BScroll(this.$refs.listContent, {
                click: true
              })
            } else {
              this.scroll.refresh()
            }

          })
        }
        return show;
      }
    },
    mounted(){
    },
    components: {
      cartControl
    }
  }
</script>
<style scoped lang="stylus" type="text/stylus">
  @import "../../common/stylus/mixin.styl"
  .shopcart
    position: fixed;
    left: 0;
    bottom: 0
    z-index: 50
    width: 100%
    height: 48px
    .content
      display: flex
      background: #141d27
      font-size: 0
      color: rgba(255, 255, 255, .4)
      .content-left
        flex: 1
        .logo-wrapper
          display: inline-block
          vertical-align: top
          position: relative;
          top: -10px
          margin: 0 12px
          padding: 6px
          width: 56px
          height: 56px
          box-sizing: border-box
          border-radius: 50%
          background: #141d27
          .logo
            width: 100%
            height: 100%
            border-radius: 50%
            text-align: center
            background: #2d343c;
            &.highLight
              background: rgb(0, 160, 220)
            .icon-shopping_cart
              line-height: 44px
              font-size: 24px
              color: #80858a
              &.highLight
                color: #fff
          .num
            position: absolute;
            top: 0
            right: 0
            width: 24px
            height: 16px
            line-height: 16px
            text-align: center
            border-radius: 16px
            font-size: 9px
            font-weight: 700
            color: #ffffff
            background: rgb(240, 20, 20)
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4)
        .price
          display: inline-block
          vertical-align: top
          margin-top: 12px
          line-height: 24px
          padding-right: 12px
          box-sizing: border-box
          border-right: 1px solid rgba(255, 255, 255, .1)
          font-size: 16px
          font-weight: 700
          &.highLight
            color: #fff
        .desc
          display: inline-block
          vertical-align: top
          margin-left: 12px
          margin-top: 12px
          line-height: 24px
          font-size: 14px
      .content-right
        flex: 0 0 105px
        width: 105px
        .pay
          height: 48px
          line-height: 48px
          text-align: center
          font-size: 12px
          font-weight: 700
          background: #2b333b
          &.not-enough
            background: #2b333b
          &.enough
            background: #00b43c
            color: #fff
    .ball-container
      .ball
        position: fixed
        left: 32px
        bottom: 22px
        z-index: 200
        transition: all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41)
        .inner
          width: 16px
          height: 16px
          border-radius: 50%
          background: rgb(0, 160, 220)
          transition: all 0.4s linear
    .shopcart-list
      position: absolute
      left: 0
      top: 0
      z-index: -1
      width: 100%
      transform: translate3d(0, -100%, 0)
      &.fold-enter-active, &.fold-leave-active
        transition: all 0.5s
      &.fold-enter, &.fold-leave-active
        transform: translate3d(0, 0, 0)
      .list-header
        height: 40px
        line-height: 40px
        padding: 0 18px
        background: #f3f5f7
        border-bottom: 1px solid rgba(7, 17, 27, .1)
        .title
          float: left
          font-size: 14px
          color: rgb(7, 17, 27)
        .empty
          float: right
          font-size: 12px
          color: rgb(0, 160, 220)

      .list-content
        padding: 0 18px
        max-height: 217px
        overflow: hidden
        background: #ffffff
        .food
          position: relative
          padding: 12px 0
          box-sizing: border-box
          border-1px(rgba(7, 17, 27, .1))
          .name
            line-height: 24px
            font-size: 14px
            color: rgb(7, 17, 27)
          .price
            position: absolute
            right: 90px
            bottom: 12px
            line-height: 24px
            font-size: 14px
            font-weight: 700
            color: rgb(120, 20, 20)
          .cartcontrol-wrapper
            position: absolute
            right: 0
            bottom: 6px


  .list-mark
    position :fixed
    top:0
    left :0
    width :100%
    height :100%
    z-index :40
    background :rgba(7,17,27,.6)
    backdrop-filter:blur(10px)
  .fade-enter-active,.fade-leave-active
    transition:opacity .5s
  .fade-enter,.fade-leave-to
    opacity :0
    background :rgba(7,17,27,0)
</style>
