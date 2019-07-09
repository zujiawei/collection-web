import Vue from 'vue'
import Router from 'vue-router'
import FormSumbit from '@/components/views/formsumbit'
import Note from '@/components/note/Note'
import BaseInfo from '@/components/manager/BaseInfo'
import HelloWorld from "@/components/views/HelloWorld";
import App from '@/App'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  routes: [
    {
      path: '/frist',
      name: 'formsumbit',
      component: FormSumbit
    },
    {
      path: '/app',
      component: HelloWorld,
      children: [
        {
          path: '/note',
          name: 'note',
          component: Note
        },
        {
          path: '/info',
          name: 'info',
          component: BaseInfo
        }
      ]
    }
  ]
})
