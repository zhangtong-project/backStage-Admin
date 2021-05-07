import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
export default new Router({
  mode: 'history',
  routes: [
    {
      path:"/Login",
      name:"Login",
      component: resolve => require(['@/view/Login'],resolve),
    },
    {
      path: '/',
      redirect:"/index",
      component: () => import('@/view/Home'),
      children: [
        {
          path: '/index',
          name: 'index',
          component: resolve => require(['@/view/index'],resolve),
        },
        {
          path: '/userList',
          name: 'userList',
          component: resolve => require(['@/view/userList'],resolve),
        },
        {
          path: '/Home2',
          name: 'Home2',
          component: resolve => require(['@/view/Home2'],resolve),
        },
        {
          path: '/Home3',
          name: 'Home3',
          component: resolve => require(['@/view/Home3'],resolve),
        },
      ]
    }
  ]
})
