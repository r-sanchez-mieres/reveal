
<template>
  <div>
    <title-bar :title-stack="titleStack" />
    <hero-bar>
      Menu
      <router-link
        slot="right"
        to="/"
        class="button"
      >
        Dashboard
      </router-link>
    </hero-bar>
    <section class="section is-main-section">
      <tiles-block>
        <card-component
          title="Menu"
          icon="menu"
          class="tile is-child"
        >
          <ul class="tree">
            <item
              v-for="(item, index) in items"
              :key="item.id || Math.random()"
              :has-child="!!item[index + 1]"
              :element="item"
            />
          </ul>
        </card-component>
      </tiles-block>
    </section>
  </div>
</template>

<script>
/* eslint-disable */
import { defineComponent, Vue } from 'vue'
import { mapState } from 'vuex'
import CardComponent from '@/components/CardComponent.vue'
import TitleBar from '@/components/TitleBar.vue'
import HeroBar from '@/components/HeroBar.vue'
import TilesBlock from '@/components/TilesBlock.vue'
import TreeItem from '@/components/TreeItem.vue'
import Item from '@/components/Item.vue'
import api from '@/helpers/api.js'

export default defineComponent({
  name: 'MenuView',
  components: {
    TilesBlock,
    HeroBar,
    TitleBar,
    CardComponent,
    'tree-item': TreeItem,
    Item
  },
  data () {
    return {
      titleStack: ['Admin', 'Menu'],
      items: []
    }
  },
  computed: {
    ...mapState([
      'userName',
      'userEmail'
    ])
  },
  mounted () {
    fetch('http://bag-sys.py:8084/api/v1/menu')
      .then(response => response.json())
      .then(data => {
        //console.log(JSON.stringify(data))
        //this.items = data
      }).catch(error => {
        console.error('Error al obtener los datos:', error)
      })

  },
  methods: {
    makeFolder: function (item) {
      Vue.set(item, 'children', [])
      this.addItem(item)
    },
    addItem: function (item) {
      item.children.push({
        name: 'new stuff'
      })
    }
  }
})
</script>

<style scoped>
  ul.tree {
    list-style-type: none;
  }
  ul.tree li {
    margin-left: '50px' !important;
  }
</style>
