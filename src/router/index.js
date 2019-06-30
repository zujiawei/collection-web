import Vue from 'vue'
import Router from 'vue-router'
import Formsumbit from '@/components/views/formsumbit'
import Menu from '@/components/views/manager/menu'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'menu',
      component: Menu
    },
    {
      path: '/frist',
      name: 'formsumbit',
      component: Formsumbit
    }
  ]
})
