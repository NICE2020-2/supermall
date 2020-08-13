import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    cartList: []
  },
  mutations: {
    addCount(state, payload) {
      payload.count++
    },
    addToCart(state, payload) {
      payload.checked = true
      state.cartList.push(payload)

    }
  },
  actions: {
    addCart(context, payload) {
      return new Promise((resolve, reject) => {
        let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)

        if (oldProduct) {
          context.commit('addCount', oldProduct)
          resolve("成功添加到购物车")
        } else {
          payload.count = 1
          context.commit('addToCart', payload)
          resolve("成功添加到购物车")
        }
      })


    }
  },
  getters: {
    cartLength(state) {
      return state.cartList.length;
    },
    cartList(state) {
      return state.cartList
    }
  }
}
)

export default store