<template>
  <b-modal
    :active.sync="isModalActive"
    has-modal-card
  >
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">
          Confirm action
        </p>
        <button
          type="button"
          class="delete"
          @click="cancel"
        />
      </header>
      <section class="modal-card-body">
        <p>
          This will permanently delete <b>{{ trashObjectName }}</b>
        </p>
        <p>Action can not be undone.</p>
      </section>
      <footer class="modal-card-foot">
        <b-button
          native-type="button"
          type="is-danger"
          outlined
          @click="cancel"
        >
          Cancel
        </b-button>
        <b-button
          type="is-danger"
          @click="confirm()"
        >
          Delete
        </b-button>
      </footer>
    </div>
  </b-modal>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ModalBox',
  props: {
    isActive: Boolean,
    trashObjectName: {
      type: String,
      default: null
    },
    item: {
      default: null,
      type: Object
    }
  },
  emits: ['cancel', 'confirm'],
  computed: {
    isModalActive: {
      get: function () {
        return this.isActive
      },
      set: function (value) {
        if (!value) {
          this.cancel()
        }
      }
    }
  },
  methods: {
    confirm () {
      const { id } = this.item
      console.log('id', id)
      this.$emit('confirm', id)
    },
    cancel () {
      this.$emit('cancel')
    }
  }
})
</script>
