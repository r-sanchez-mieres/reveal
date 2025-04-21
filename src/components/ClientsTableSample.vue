<template>
  <div>
    <modal-box
      :is-active="isModalActive"
      :trash-object-name="trashObject ? trashObject.nick : null "
      :item="trashObject"
      @confirm="trashConfirm"
      @cancel="trashCancel"
    />
    <b-table
      :checked-rows.sync="checkedRows"
      :checkable="false"
      :paginated="paginated"
      :per-page="perPage"
      :data="users"
      default-sort="name"
      striped
      hoverable
    >
      <b-table-column
        v-slot="props"
        label="Name"
        field="contact_name"
        sortable
      >
        {{ props.row.contact_name }}
      </b-table-column>
      <b-table-column
        v-slot="props"
        label="Numero"
        field="numero"
        sortable
      >
        {{ props.row.number }}
      </b-table-column>
      <b-table-column
        v-slot="props"
        label="Nick"
        field="nick"
        sortable
      >
        {{ props.row.nick }}
      </b-table-column>
      <b-table-column
        v-slot="props"
        label="Confirmado"
        field="confirm"
        sortable
      >
        {{ props.row.confirm }}
      </b-table-column>
      <b-table-column
        v-slot="props"
        label="Fecha Confirmacion"
      >
        <small
          class="has-text-grey is-abbr-like"
          :title="props.row.created_at"
        >{{ props.row.created_at }}</small>
      </b-table-column>
      <b-table-column
        v-slot="props"
        custom-key="actions"
        cell-class="is-actions-cell"
      >
        <div class="buttons is-right no-wrap">
          <router-link
            :to="{name:'client.edit', params: {id: props.row.id}}"
            class="button is-small is-info"
          >
            <b-icon
              icon="account-edit"
              size="is-small"
            />
          </router-link>
          <b-button
            type="is-danger"
            size="is-small"
            @click.prevent="trashModalOpen(props.row)"
          >
            <b-icon
              icon="trash-can"
              size="is-small"
            />
          </b-button>
        </div>
      </b-table-column>

      <section
        slot="empty"
        class="section"
      >
        <div class="content has-text-grey has-text-centered">
          <p>
            <b-icon
              icon="emoticon-sad"
              size="is-large"
            />
          </p>
          <p>Nothing's here&hellip;</p>
        </div>
      </section>
    </b-table>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { mapState } from 'vuex'
import ModalBox from '@/components/ModalBox.vue'

export default defineComponent({
  name: 'ClientsTableSample',
  components: { ModalBox },
  props: {
    checkable: Boolean,
    isEmpty: Boolean,
    perPage: {
      type: Number,
      default: 10
    }
  },
  data () {
    return {
      checkedRows: [],
      isModalActive: false,
      trashObject: null
    }
  },
  computed: {
    paginated () {
      return this.users.length > this.perPage
    },
    ...mapState([
      'users', 'error'
    ])
  },
  watch: {
    error (newVal, oldVal) {
      if (newVal) {
        this.$buefy.snackbar.open({
          message: 'Confirmed',
          queue: false
        })
      }
    }
  },
  mounted () {
    this.$store.dispatch('fetchUsers', {})
  },
  methods: {
    trashModalOpen (obj) {
      this.trashObject = obj
      this.isModalActive = true
    },
    trashConfirm (id) {
      this.isModalActive = false
      console.log('id2', id)
      this.$store.dispatch('deleteRevealConfirm', { id })
    },
    trashCancel () {
      this.isModalActive = false
    }
  }
})
</script>
