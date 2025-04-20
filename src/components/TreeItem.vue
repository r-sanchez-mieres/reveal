<template>
  <li>
    <div
      :class="{bold: isFolder}"
      @click="toggle"
      @dblclick="makeFolder"
    >
      {{ item.name }}
      <span
        v-if="isFolder"
        :class="{ item:isFolder }"
      >
        [{{ isOpen ? '-' : '+' }}]
      </span>
    </div>
    <ul
      v-show="isOpen"
      v-if="isFolder"
    >
      <tree-item
        v-for="(child, index) in item.children"
        :key="index"
        class="item2"
        :item="child"
        @make-folder="$emit('make-folder', $event)"
        @add-item="$emit('add-item', $event)"
      />
      <li
        class="add"
        @click="$emit('add-item', item)"
      >
        +
      </li>
    </ul>
  </li>
</template>
<script>
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'TreeItem',
  props: {
    item: {
      type: Object,
      default: () => ({})
    }
  },
  data: function () {
    return {
      isOpen: false
    }
  },
  computed: {
    isFolder: function () {
      return this.item.children && this.item.children.length
    }
  },
  methods: {
    toggle: function () {
      if (this.isFolder) {
        this.isOpen = !this.isOpen
      }
    },
    makeFolder: function () {
      if (!this.isFolder) {
        this.$emit('make-folder', this.item)
        this.isOpen = true
      }
    }
  }
})
</script>

<style scoped>
  body {
    font-family: Menlo, Consolas, monospace;
    color: #444;
  }
  .item {
    cursor: pointer;
  }
  .bold {
    font-weight: bold;
  }
  ul {
    padding-left: 1em;
    line-height: 1.5em;
    list-style-type: dot;
  }
</style>
