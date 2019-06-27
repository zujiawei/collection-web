import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Formsumbit from '@/components/views/formsumbit'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/frist',
      name: 'formsumbit',
      component: Formsumbit
    }
  ]
})
