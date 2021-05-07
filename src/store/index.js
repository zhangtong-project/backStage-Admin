import Vue from 'vue'
import Vuex from 'vuex'
import breakTab from './breakTab'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    breakTab
  }
})