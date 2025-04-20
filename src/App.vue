<template>
  <div id="app">
    <nav-bar />
    <aside-menu :menu="menus" />
    <router-view />
    <footer-bar />
  </div>
</template>

<script>
import { defineComponent } from 'vue'
// import menu from '@/menu.js'
import NavBar from '@/components/NavBar.vue'
import AsideMenu from '@/components/AsideMenu.vue'
import FooterBar from '@/components/FooterBar.vue'
import { mapState } from 'vuex'

export default defineComponent({
  name: 'AppComponent',
  components: {
    FooterBar,
    AsideMenu,
    NavBar
  },
  data () {
    return {
      menu: []
    }
  },
  computed: {
    ...mapState(['items']),
    menus () {
      return this.items
    }
  },
  mounted () {
    this.$store.dispatch('getAllItemMenu', {})
  },
  created () {
    this.$store.commit('user', {
      name: 'John Doe',
      email: 'john@example.com',
      avatar: 'https://avatars.dicebear.com/v2/gridy/John-Doe.svg'
    })
  }
})
</script>
