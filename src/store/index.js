import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 存放状态
  },
  mutations: {
    // mutations是操作state数据的方法的集合，比如对该数据的修改、增加、删除等等
  },
  getters: {
    // 可以对state中的成员加工后传递给外界
  },
  actions: {
    // 由于直接在mutation方法中进行异步操作，将会引起数据失效。
    // 所以提供了Actions来专门进行异步操作，最终提交mutation方法。
  },
  modules: {
  }
})
