import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cartList:[]
  },
  getters: {
    cartList(state) {
      return state.cartList
    },
    cartCount(state, getters) {
      return getters.cartList.length
    },
  },
  mutations: {
    
    addCounter(state, payload) {
      payload.count++
    },
    addToCart(state, payload) {
      payload.checked = true
      state.cartList.push(payload)
    }
  },
  actions: {
    addCart(context, payload) {
      return new Promise((resolve, reject)=>{
        // 1.查看是否添加过
      const oldInfo = context.state.cartList.find(item => item.iid === payload.iid)

      // 2.+1或者新添加
      if (oldInfo) {
        // oldInfo.count += 1
        context.commit('addCounter',oldInfo)
        resolve("再购买一件")
      } else {
        payload.count = 1
        // payload.checked = true
        context.commit('addToCart',payload)
        // console.log('+1');
        resolve("添加至购物车")
      }

      })
      
    }
  },
  modules: {
  }
})
