<template>
  <div>
    <title-bar :title-stack="titleStack" />
    <hero-bar>
      Forms
      <router-link
        slot="right"
        to="/"
        class="button"
      >
        Dashboard
      </router-link>
    </hero-bar>
    <section class="section is-main-section">
      <card-component
        title="Forms"
        icon="ballot"
      >
        <form @submit.prevent="formAction">
          <b-field
            label="Enter some numbers"
            horizontal
          >
            <b-taginput
              ref="taginput"
              v-model="tags"
              :data="filteredTags"
              :allow-new="true"
              autocomplete
              icon="label"
              placeholder="Add a tag"
              @typing="getFilteredTags"
              @input="onTagInput"
            >
              <template slot-scope="props">
                <strong>{{ props.option.number }}</strong>: {{ props.option.name }}
              </template>

              <template #empty>
                There are no items
              </template>

              <template #selected="props">
                <b-tag
                  v-for="(tag, index) in props.tags"
                  :key="index"
                  rounded
                  :tabstop="false"
                  ellipsis
                  closable
                  @close="$refs.taginput.removeTag(index, $event)"
                >
                  {{ tag.name ? tag.name : tag }}
                </b-tag>
              </template>
            </b-taginput>
            <!-- <pre style="max-height: 400px"><b>Tags:</b>{{ tags }}</pre> -->
          </b-field>
          <hr>
          <b-field
            label="Message"
            message="Your message. Max 500 characters"
            horizontal
          >
            <b-input
              v-model="form.question"
              type="textarea"
              placeholder="Message"
              maxlength="500"
              required
            />
          </b-field>
          <hr>
          <b-field
            label="Media"
            horizontal
          >
            <file-picker
              v-model="customElementsForm.file"
              type="is-info"
            />
            <b-image
              v-if="urlfile"
              :src="urlfile"
              alt="A random image"
              ratio="6by4"
              :rounded="rounded"
            />
          </b-field>
          <hr>
          <b-field
            horizontal
          >
            <b-field grouped>
              <div class="control">
                <b-button
                  native-type="submit"
                  type="is-info"
                >
                  Send
                </b-button>
              </div>
            </b-field>
          </b-field>
          <b-field
            horizontal
          >
            <qr-code />
          </b-field>
        </form>
      </card-component>
    </section>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import TitleBar from '@/components/TitleBar.vue'
import CardComponent from '@/components/CardComponent.vue'
import FilePicker from '@/components/FilePicker.vue'
import HeroBar from '@/components/HeroBar.vue'
import QrCode from '@/components/Qr.vue'
import { mapState } from 'vuex'
// import CheckboxRadioPicker from '@/components/CheckboxRadioPicker.vue'

export default defineComponent({
  name: 'FormsView',
  components: {
    HeroBar,
    FilePicker,
    CardComponent,
    TitleBar,
    QrCode
  },
  data () {
    return {
      titleStack: ['Admin', 'Forms'],
      departments: ['Business Development', 'Marketing', 'Sales'],
      form: {
        name: null,
        email: null,
        phone: null,
        department: null,
        subject: null,
        question: null
      },
      customElementsForm: {
        checkbox: ['lorem'],
        radio: 'one',
        switch: true,
        file: null
      },
      filteredTags: [],
      isSelectOnly: false,
      tags: [],
      imageUrl: null,
      isLoading: true,
      isFullPage: false
    }
  },
  computed: {
    ...mapState(['contacts']),
    urlfile () {
      return this.customElementsForm.file ? URL.createObjectURL(this.customElementsForm.file) : ''
    }
  },
  mounted () {
    this.$store.dispatch('getContacts')
  },
  methods: {
    formAction () {
      this.$buefy.snackbar.open({
        message: 'Demo only',
        queue: false
      })
    },
    getFilteredTags (text) {
      this.filteredTags = this.contacts.filter((option) => {
        let { name = '', number } = option

        name = name.toString().toLowerCase()
        number = number.toString().toLowerCase()

        return name.indexOf(text.toLowerCase()) >= 0 || number.indexOf(text.toLowerCase()) >= 0
      })
    },
    onTagInput (newTags) {
      // console.log('Tags actualizados:', newTags)
    },
    previewImage (event) {
      const file = event.target.files[0]
      if (file) {
        this.imageUrl = URL.createObjectURL(file)
      }
    }
  }
})
</script>
