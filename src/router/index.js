import Vue from 'vue'
import Router from 'vue-router'
import FormSumbit from '@/components/views/formsumbit'
import HelloWorld from '@/components/views/HelloWorld'
import Note from '@/components/note/Note'
import BaseInfo from '@/components/manager/BaseInfo'



Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/frist',
      name: 'formsumbit',
      component: FormSumbit
    },
    {
      path: '/note',
      name: 'note',
      component: Note
    }
    ,
    {
      path: '/info',
      name: 'info',
      component: BaseInfo
    }
  ]
})
