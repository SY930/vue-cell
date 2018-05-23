<template>
    <div class="cartcontrol">
      <transition name="move">
      <div class="cart-decrease" v-show="food.count>0" @click.stop.prevent="decreaseCart($event)">

        <i class="inner icon-remove_circle_outline"></i>

      </div>
      </transition>
      <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
      <div class="cart-add icon-add_circle" @click.stop.prevent="addCart($event)"></div>
    </div>
</template>
<script>
  import Vue from 'vue'
    export default {
        props:{
            food:{
                type:Object
            }
        },
        data(){
            return {}
        },
        created(){
         // console.log(this.food);
        },
        methods: {
          addCart(event){

            if(!event._constructed){
                  return
              }
              if(!this.food.count){
                Vue.set(this.food,'count',1);
              }else {
                 this.food.count++
              }
            this.$root.eventHub.$emit('cart.add',event);

                        },
          decreaseCart(event){
              if(!event._constructed){
                  return
              }
              if(this.food.count){
                this.food.count--;
              }
          }
        },
        computed: {},
        mounted(){

        }
    }
</script>
<style scoped type="text/stylus" lang="stylus">
  .cartcontrol
    font-size :0
    .move-enter-active,.move-leave-active
      opacity :1
      transform :translate3D(0,0,0)
      transition: all .4s linear;
    .inner
      transform :rotate(0)
    .cart-decrease
       display :inline-block
       padding :6px
       .inner
         display :inline-block
         line-height :24px
         font-size :24px
         color:rgb(0,160,220)
         transition :all 0.4s linear
    .move-enter, .move-leave-to
      opacity: 0;
      transform: translate3D(24px,0,0) ;
      .inner
        transform :rotate(180deg)
    .cart-count
       display :inline-block
       vertical-align :top
       width :12px
       padding-top :6px
       line-height :24px
       text-align :center
       font-size :10px
      color:rgb(147,153,159)
    .cart-add
       display :inline-block
       padding :6px
       line-height :24px
       font-size :24px
       color:rgb(0,160,220)

</style>
