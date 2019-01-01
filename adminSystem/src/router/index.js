import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login/login'
import Main from '@/components/main/main'
import Goods from '@/components/main/goods/goods'
import GoodsDetail from '@/components/main/goods/goodsDetail'
import Order from '@/components/main/order/order'
import User from '@/components/main/user/user'
import UserDetail from '@/components/main/user/userDetail'
import Rights from '@/components/main/rights/rights'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/main',
      name: 'main',
      component: Main,
      children: [
        {
          path: '/main/goods',
          name: 'goods',
          component: Goods
        }, {
          path: '/main/goodsDetail',
          name: 'goodsDetail',
          component: GoodsDetail
        },{
          path: '/main/order',
          name: 'order',
          component: Order
        },{
          path: '/main/user',
          name: 'user',
          component: User
        },{
          path: '/main/userDetail',
          name: 'userDetail',
          component: UserDetail
        },{
          path: '/main/rights',
          name: 'rights',
          component: Rights
        }
      ]
    }
  ]
})
