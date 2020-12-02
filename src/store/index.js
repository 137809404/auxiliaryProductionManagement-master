import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 存放状态
    user: {
      // userId: window.localStorage.getItem('user') == null ? '' : JSON.parse(window.localStorage.getItem('user')).value.userId,
      // username: window.localStorage.getItem('user') == null ? '' : JSON.parse(window.localStorage.getItem('user')).value.username,
      // role: window.localStorage.getItem('user') == null ? '' : JSON.parse(window.localStorage.getItem('user')).value.role
    },
    routes: [],
    noticeConferring: false
  },
  mutations: {
    // mutations是操作state数据的方法的集合，比如对该数据的修改、增加、删除等等
    setUser (state, value) {
      state.user = value
      const maxAgeTime = new Date().getTime() + 1000 * 3600 // 当前时间的+1小时->过期时间
      try {
        var data = { value, maxAge: maxAgeTime }
        window.localStorage.setItem('user', JSON.stringify(data))
      } catch (err) {
      }
      // window.localStorage.setItem('user', JSON.stringify(user))
    },
    removeUser (state) {
      // sessionStorage.removeItem('user')
      window.localStorage.removeItem('user')
      state.routes = []
    },
    noticeConferring (state) {
      state.noticeConferring = true
    },
    noticeConferred (state) {
      state.noticeConferring = false
    }
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
