import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import menu from '../menu'

const api = process.env.VUE_APP_API_URL
const api_ = process.env.VUE_APP_API_URL_2

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    /* User */
    userName: null,
    userEmail: null,
    userAvatar: null,

    /* NavBar */
    isNavBarVisible: true,

    /* FooterBar */
    isFooterBarVisible: true,

    /* Aside */
    isAsideVisible: true,
    isAsideMobileExpanded: false,

    /* Sample data (commonly used) */
    clients: [],

    users: [],

    //
    items: [],
    ajaxError: null,

    contacts: [],

    isLoading: false,

    errorGetContacts: null
  },
  mutations: {
    /* A fit-them-all commit */
    basic (state, payload) {
      state[payload.key] = payload.value
    },

    users (state, payload) {
      state.users = payload
    },

    /* User */
    user (state, payload) {
      if (payload.name) {
        state.userName = payload.name
      }
      if (payload.email) {
        state.userEmail = payload.email
      }
      if (payload.avatar) {
        state.userAvatar = payload.avatar
      }
    },

    /* Aside Mobile */
    asideMobileStateToggle (state, payload = null) {
      const htmlClassName = 'has-aside-mobile-expanded'

      let isShow

      if (payload !== null) {
        isShow = payload
      } else {
        isShow = !state.isAsideMobileExpanded
      }

      if (isShow) {
        document.documentElement.classList.add(htmlClassName)
      } else {
        document.documentElement.classList.remove(htmlClassName)
      }

      state.isAsideMobileExpanded = isShow
    },

    /* Full Page mode */
    fullPage (state, payload) {
      state.isNavBarVisible = !payload
      state.isAsideVisible = !payload
      state.isFooterBarVisible = !payload
    },
    fullItems (state, payload) {
      state.items = payload
    },
    error (state, payload) {
      state.ajaxError = payload
    },
    contacts (state, payload) {
      state.contacts = payload
    },

    isLoading (state, payload) {
      state.isLoading = payload
    },

    errorGetContacts (state, payload) {
      state.errorGetContacts = payload
    }
  },
  actions: {
    asideDesktopOnlyToggle (store, payload = null) {
      let method

      switch (payload) {
        case true:
          method = 'add'
          break
        case false:
          method = 'remove'
          break
        default:
          method = 'toggle'
      }
      document.documentElement.classList[method]('has-aside-desktop-only-visible')
    },
    toggleFullPage ({ commit }, payload) {
      commit('fullPage', payload)

      document.documentElement.classList[!payload ? 'add' : 'remove']('has-aside-left', 'has-navbar-fixed-top')
    },
    fetch ({ commit }, payload) {
      axios
        .get(`data-sources/${payload}.json`)
        .then((r) => {
          if (r.data && r.data.data) {
            commit('basic', {
              key: payload,
              value: r.data.data
            })
          }
        })
        .catch(error => {
          alert(error.message)
        })
    },
    fetchUsers ({ commit }, payload) {
      axios
        .get(`${api}/whatsapp/messages`)
        .then(r => {
          commit('users', r.data.data)
        }).catch(err => {
          console.error(err)
        })
    },
    deleteRevealConfirm ({ commit, dispatch }, payload) {
      axios.delete(`${api}/whatsapp/reveal/${payload.id}`)
        .then(response => {
          commit('error', null)
          dispatch('fetchUsers', {})
        }).catch(error => {
          console.error(error)
          commit('error', error)
        })
    },
    deleteItemMenu ({ commit }, payload) {
      axios
        .delete(`${api}/${payload.parentId}/${payload.id}`)
        .then(r => {
          console.log(r.data)
        }).catch(err => {
          console.error(err)
        })
    },
    getAllItemMenu ({ commit }, payload) {
      commit('fullItems', menu)
      /* axios.get('http://bag-sys.py:8084/api/v1/menu')
        .then(response => {
          console.log('data', JSON.stringify(response))
          commit('fullItems', response.data)
        }).catch(error => {
          console.error('Error al obtener los datos:', error)
        })
      */
    },
    getContacts ({ commit }) {
      axios.get(`${api_}/contacts`)
        .then(response => {
          console.log('ok contacts', JSON.stringify(response.data))
          commit('contacts', response.data.response)
        }).catch(error => {
          console.error('error contacts', error)
          commit('errorGetContacts', 'Error al obtener contactos')
        })
    }
  }
})

export default store

export function useStore () {
  return store
}
