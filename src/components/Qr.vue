<template>
  <div>
    <qrcode-vue
      v-if="qr"
      ref="qr"
      :value="qr"
      :size="300"
      level="H"
    />
    <div v-else>
      <p>Esperando código QR...</p>
    </div>
  </div>
</template>
<script>
import { defineComponent } from 'vue'
import QrcodeVue from 'qrcode.vue'
import { io } from 'socket.io-client'
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
  mounted () {
    const socket = io('http://localhost:3001')// Asegurate que sea la URL correcta de tu backend
    socket.on('qr', (data) => {
      this.qr = data
    })
  }
})
</script>
