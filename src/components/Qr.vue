<template>
  <article
    v-if="isLoading"
    class="notification"
  >
  <!--b-loading
      v-model="isLoading"
      :is-full-page="false"
      :can-cancel="true"
    >
      <b-icon
        pack="mdi"
        icon="reload"
        size="is-large"
        class="spin"
        custom-class="spin"
      />
    </-b-loading>
    <hr> -->
    <qrcode-vue
      v-if="qr"
      ref="qr"
      :value="qr"
      :size="300"
      level="H"
    />
  </article>
</template>
<script>
import { defineComponent } from 'vue'
import QrcodeVue from 'qrcode.vue'
import { io } from 'socket.io-client'
import { mapState } from 'vuex'
export default defineComponent({
  name: 'QrContainer',
  components: {
    QrcodeVue
  },
  data () {
    return {
      value: 'https://example.com',
      qr: null
    }
  },
  computed: {
    ...mapState(['isLoading', 'errorGetContacts'])
  },
  mounted () {
    const socket = io('http://localhost:3001')
    this.$store.commit('isLoading', true)
    socket.on('qr', (data) => {
      this.qr = data
      this.$store.commit('isLoading', false)
    })
    socket.on('ready', data => {
      this.$store.commit('isLoading', !data)
    })
  }
})
</script>
<style scoped>
  .spin {
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }

    to {
      transform: rotate(360deg);
    }
  }
</style>
