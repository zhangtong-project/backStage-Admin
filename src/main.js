// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import less from 'less'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/css/reset.css'/*引入公共样式*/
import store from './store' 
import * as echarts from 'echarts';
import mock from './mock';

Vue.use(ElementUI)
Vue.use(less)
Vue.config.productionTip = false
Vue.prototype.$echarts = echarts

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
