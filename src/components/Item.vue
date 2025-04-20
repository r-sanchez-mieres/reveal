<template>
  <li>
    <span
      v-if="typeof element === 'string'"
    >
      {{ element }} <button @click="$store.dispatch('deleteItemMenu', {id: 'element', parentId: 0})">-</button>
    </span>
    <ul v-else-if="Array.isArray(element)">
      <Item
        v-for="(x,index) in element"
        :key="x.id"
        :has-child="!!x[index + 1]"
        :element="x"
      />
    </ul>
    <template v-else>
      <span>{{ element.label }} <button>-</button></span>
      <span v-if="element.menu.length > 0" />
      <ul v-if="element.menu.length > 0">
        <Item
          v-for="(x,index) in element.menu"
          :key="x.id || Math.random()"
          :has-child="!!x[index + 1]"
          :element="x"
        />
      </ul>
    </template>
  </li>
</template>

<script>
/* eslint-disable vue/multi-word-component-names */

import { defineComponent } from 'vue'
// import Item from '@/components/Item.vue'
export default defineComponent({
  name: 'Item',
  props: {
    element: {
      type: [String, Array, Object],
      default: () => ([])
    },
    menus: {
      type: [Array],
      default: () => ([])
    },
    hasChild: {
      type: Boolean,
      default: null
    }
  },
  data: function () {
    return {
    }
  }
})
</script>
<style scoped>
  ul.tree {
    list-style-type: disc;
  }
  ul.tree li {
    margin-left: 50px !important;
  }
</style>
