<template>
  <div>
  <div class="goods">
    <div class="menu-wrapper" ref="menuWrapper">
      <ul>
        <li v-for="(item,index) in goods" class="menu-item" :class="{'current':currentIndex===index}" @click="selectMenu(index,$event)">
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
            <li @click="selectFood(food,$event)" v-for="food in item.foods" class="food-item border_1px">
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
              <div class="cartcontrol-wrapper">
                <cartControl @add="addFood" :food="food" ></cartControl>
              </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>

   <shopCart :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice" :select-foods="selectFoods" ref="shopCart"></shopCart>
  </div>

      <Food @add="addFood" :food="selectedFood" ref="food"></Food>

  </div>
</template>
<script>
  import {getGoods} from '../../api'
  import BScroll from 'better-scroll'
  import shopCart from '../../components/shopCart/shopcart.vue'
  import cartControl from '../../components/cartcontrol/cartcontrol.vue'
  import Food from '../../components/food/food.vue'
  const ERR_OK = 0;
  export default{
      props:{
          seller:{
              type:Object
          }
      },
      components:{
        shopCart,
        cartControl,
        Food
      },
      data(){
        return {
            goods:[],
            listHeight:[],//每一个li区块的高度
            scrollY:0,
          selectedFood:{}
        }
      },
    computed:{
          //左侧当前的索引应该在哪  对比scrollY和lineheight的值 返回在哪个区域的索引
      currentIndex(){
        for(let i = 0; i < this.listHeight.length; i++) {
          let height1 = this.listHeight[i];
           let height2 = this.listHeight[i+1];
          if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
            return i;
          }

        }
        return 0;
      },
      selectFoods(){
          let foods=[];
          this.goods.forEach((good)=>{
              good.foods.forEach((food)=>{
                  if(food.count){
                      foods.push(food)
                  }

              })
          });
        return foods
      },

    },
      created(){
        this.getDate();
        this.classMap = ['decrease', 'discount', 'guarantee', 'invoice', 'special'];

      },
      methods:{

          getDate(){
              getGoods().then((res)=>{
                if(res.errno===ERR_OK){
                    this.goods = res.data;
                    this.$nextTick(()=>{
                      //实现滚动效果  滚动时实时记录scrollY的值
                      this._initScroll();
                      //实现联动效果 记录每个区域的高度lineheight
                      this._calculateHeight();
                    });

                 }
              }).catch((err)=>{
                console.log(err);
              })
          },
          _initScroll(){
              //接收两个参数一个是dom对象，一个是option对象（json）
              this.meunScroll = new BScroll(this.$refs.menuWrapper,{
                  //点击没有效果，是因为bscroll监听了一些touchstart和touchend事件，会阻止默认事件，需要传属性click，在pc端是没有阻止的，会触发两次点击事件，解决方法：传入event事件if(!event._constructed){return}
                  click:true
              });
            this.foodsScroll = new BScroll(this.$refs.foodsWrapper,{
              click:true,
                probeType:3//希望bscroll在滚动的时候，能实时告诉我们位置
            });
              this.foodsScroll.on('scroll',(pos)=>{//事件回调函数的参数是一个位置
              //console.log(pos.y);
              this.scrollY = Math.abs(Math.round(pos.y));
            })
          },
        _calculateHeight(){
          let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
          let height = 0;
          this.listHeight.push(height);
          for (let i = 0; i < foodList.length; i++) {
            let item = foodList[i];
            height+=item.clientHeight;
            this.listHeight.push(height);
            //console.log(this.listHeight);
          }

        },
        selectMenu(index,event){
          if(!event._constructed){
             return
         }
         let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
          let el = foodList[index];
          this.foodsScroll.scrollToElement(el,2000);
        },
        //父组件接收到cartcontral传来的cart.add事件，当父组件拿到这个事件之后调用子组件的方法即（shortcart中定义的drop方法）这里处理下落函数
        addFood(target) {
         // console.log(target);
          this._drop(target);
        },
        _drop(target){
        //子组件发射(cart_add)事件，父组件监听到事件之后把target传进来，再调用shopcart的（drop）方法,这样就实现了把cartcontral里面的dom元素(点击的那个元素)传递给了父组件，然后父组件调用子组件shopcart方法，把target传递到子组件，所以子组件就可以拿到这个元素，我们就可以获取这个(cartcontral)元素的位置了
         // console.log(event.target);
          this.$nextTick(()=>{
            this.$refs.shopCart.drop(target)
          })//体验优化，异步执行下落动画

        },
        selectFood(food,event){
          if(!event._constructed){
            return
          }
          this.selectedFood = food;
          this.$refs.food.show()
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
       &.current
         position: relative;
         z-index: 10
         margin-top :-1px
         background :#fff
         font-weight :700
         .text
            border-none()
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


         .cartcontrol-wrapper
           position: absolute;
           right :0
           bottom :12px
</style>
