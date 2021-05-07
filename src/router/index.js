import Vue from 'vue'
import VueRouter from 'vue-router'
import Router from 'vue-router'

Vue.use(Router)

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {//去除浏览器警告
  return originalPush.call(this, location).catch(err => err)
}
const router = new Router({
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
          path: '/infomation',
          name: 'infomation',
          component: resolve => require(['@/view/infomation'],resolve),
        },
      ]
    }
  ]
});
router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    next();
  } else {
    let token = sessionStorage.getItem('token');
    if (token === null || token === '') {
      next('/login');
    } else {
      next();
    }
  }
});
export default router;
