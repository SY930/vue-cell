<template>
  <div class="goods">
    <div class="menu-wrapper" ref="menuWrapper">
      <ul>
        <li v-for="item in goods" class="menu-item">
          <span class="text border_1px">
           <span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span> {{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref="foodsWrapper">
      <ul>
        <li v-for="item in goods" class="food-list food-list-hook">
          <h1 class="title">{{item.name}}</h1>
          <ul>
            <li v-for="food in item.foods" class="food-item border_1px">
              <div class="icon">
                <img width="57" height="57" :src="food.icon" alt="">
              </div>
              <div class="content">
                <h2 class="name"> {{food.name}}</h2>
                <p class="desc">{{food.description}}</p>
                <div class="extra">
                  <span class="count">月售{{food.sellCount}}</span><span>好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class="now">￥{{food.price}}</span><span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>

</template>
<script>
  import {getGoods} from '../../api'
  import BScroll from 'better-scroll'
  const ERR_OK = 0;
  export default{
      props:{
          seller:{
              type:Object
          }
      },
      data(){
        return {
            goods:[],
            listHeight:[],//每一个li区块的高度
            scrollY:0
        }
      },
    computed:{
      currentIndex(){
        for (let i = 0; i < this.listHeight.length; i++) {
           let height1 = this.listHeight[i];
           let height2 = this.listHeight[i+1];
            if(!height2 || (this.scrollY>height1&&this.scrollY<height2)){
                return i;
            }
            return 0
        }
      }
    },
      created(){
        this.getDate();
        this.classMap = ['decrease', 'discount', 'guarantee', 'invoice', 'special']

      },
      methods:{
          getDate(){
              getGoods().then((res)=>{
                if(res.errno===ERR_OK){
                    this.goods = res.data;
                    this.$nextTick(()=>{
                      //实现滚动效果
                      this._initScroll();
                      //实现联动效果
                      this._calculateHeight();
                    });

                }
              }).catch((err)=>{
                console.log(err);
              })
          },
          _initScroll(){
              //接收两个参数一个是dom对象，一个是option对象（json）
              this.meunScroll = new BScroll(this.$refs.menuWrapper,{});
            this.foodScroll = new BScroll(this.$refs.foodsWrapper,{
                probeTYpe:3//希望bscroll在滚动的时候，能实时告诉我们位置
            });
            this.foodScroll.on('scroll',(pos)=>{
              console.log(pos.y);
              this.scrollY = Math.abs(Math.round(pos.y));
            })
          },
        _calculateHeight(){
          let foodList = this.$refs.foodWrapper.getElementsByClassName('food-list-hook');
          let height = 0;
          this.listHeight.push(height);
          for (let i = 0; i < foodList.length; i++) {
            let item = foodList[i];
            height+=item.clientHeight;
            this.listHeight.push(height);

          }
        }

      }
  }
</script>
<style type="text/stylus" lang="stylus">
  @import "../../common/stylus/mixin.styl"
.goods
   display :flex
   position :absolute
   top:174px;
   bottom :46px
   width :100%
   overflow :hidden
   .menu-wrapper
     flex :0 0 80px //flex的三个属性1:是等分 2:缩放情况 3:占位空间
     width :80px //如果不写会在安卓浏览器上有问题
     background :#f3f5f7
     .menu-item
       display :table
       height :54px
       width :56px
       line-height :14px
       padding: 0 12px;
       .icon
           display :inline-block
           width :12px
           height :12px
           vertical-align :top
           margin-right :2px
           background-size :12px 12px
           background-repeat :no-repeat
           &.decrease
             bg-image('./img/decrease_3')
           &.discount
             bg-image('./img/discount_3')
           &.guarantee
             bg-image('./img/guarantee_3')
           &.invoice
             bg-image('./img/invoice_3')
           &.special
             bg-image('./img/special_3')
       .text
          display :table-cell
          width :56px
          vertical-align :middle
          border-1px(rgba(7,17,27,.1))
          font-size :12px
   .foods-wrapper
     flex :1
     .title
       padding-left :14px
       height :26px
       line-height :26px
       border-left :2px solid #d9dde1
       font-size :12px
       color :rgb(147,153,159)
       background :#f3f5f7
     .food-item
       display :flex
       margin :18px
       padding-bottom :18px
       border-1px(rgba(7,17,27,.1))
       &:last-child
        border-none()
        margin-bottom :0
       .icon
         flex :0 0 57px
         margin-right :10px
       .content
         flex :1
         .name
          margin :2px 0 8px 0
          height :14px
          line-height :14px
          font-size :14px
          color :rgb(7,17,27)
         .desc,.extra
           line-height :10px
           font-size :10px
           color:rgb(147,153,159)
         .desc
           line-height :14px
           margin-bottom :8px
         .extra
           .count
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


</style>
