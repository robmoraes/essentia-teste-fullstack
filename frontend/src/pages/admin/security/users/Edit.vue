<template>
  <q-page padding>
    <q-card style="max-width:600px; width:100%;">
      <q-card-section>
        <div class="text-h6">Editar Cliente</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-form
          @submit="onSubmit"
          class="q-gutter-md"
        >
          <q-input
            filled
            v-model="record.name"
            label="Nome *"
            lazy-rules
            hint="Máximo 255 caracteres"
            :rules="[
              val => val && val.length > 0 || 'Digite algo',
              val => val.length <= 255 || 'Use no máximo 255 caracteres'
            ]"
          />
          <q-input
            filled
            v-model="record.email"
            label="Email *"
            lazy-rules
            hint="Máximo 255 caracteres"
            :rules="[
              val => val && val.length > 0 || 'Digite algo',
              val => val.length <= 255 || 'Use no máximo 255 caracteres'
            ]"
          />

          <q-input
            filled
            v-model="record.phone"
            label="Telefone"
            mask="(##) #### - #####"
          />

          <q-input
            v-model="password"
            lazy-rules filled
            :type="isPwd ? 'password' : 'text'"
            label="Senha"
            hint="Informe a senha apenas se quiser alterar"
            >
            <template v-slot:append>
              <q-icon
                :name="isPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwd = !isPwd"
              />
            </template>
          </q-input>

          <q-file
            filled
            v-model="photo_upload"
            style="max-width:569px;"
            label="Escolha uma foto"
          />

          <div v-if="(record.photo)">
            <q-img
              :src="record.photo_url"
              style="height: 140px; max-width: 150px"
            >
              <template v-slot:error>
                <div class="absolute-full flex flex-center bg-negative text-white">
                  Cannot load image
                </div>
              </template>
            </q-img>
            <a class="q-ma-md" href="javascript:void(0)" @click="removePhoto">Remover</a>
          </div>

          <div style="border-top: solid 1px #eee;padding-top:15px;">
            <q-btn label="Salvar" type="submit" color="primary" />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'UserEditPage',
  data () {
    return {
      record: {},
      password: null,
      photo_upload: null,
      isPwd: true
    }
  },
  methods: {
    ...mapActions('users', ['show', 'update']),
    loadRecord (id) {
      this.$q.loading.show()
      this.show(id)
        .then(res => {
          this.$q.loading.hide()
          this.record = res.data
          this.photo_upload = null
        })
        .catch(err => {
          this.$q.loading.hide()
          if (err) {
            this.$q.notify({
              color: 'negative',
              message: `Ocorreu algum problema ao tentar exibir o perfil. [${err.data.message}]`,
              icon: 'report_problem',
              position: 'top'
            })
          }
        })
    },
    removePhoto () {
      this.$q.dialog({
        title: 'Confirm',
        message: 'Confirma remoção da foto?',
        color: 'negative',
        ok: 'Sim, confirmo!',
        cancel: true
      })
        .onOk(() => {
          this.record.photo = ''
          this.record.photo_url = null
        })
    },
    onSubmit () {
      this.$q.loading.show()
      const payload = {
        id: this.record.id,
        name: this.record.name,
        email: this.record.email,
        phone: this.record.phone,
        photo: this.record.photo,
        password: (this.password == null) ? '' : this.password,
        photo_upload: this.photo_upload
      }

      this.update(payload)
        .then(res => {
          this.$q.loading.hide()
          this.$q.notify({
            color: 'positive',
            message: 'Cliente atualizado.',
            icon: 'save',
            position: 'top'
          })
          this.loadRecord(payload.id)
        })
        .catch(err => {
          this.$q.loading.hide()
          if (err) {
            if (err.status === 422) {
              Object.keys(err.data.errors).forEach(itemKey => {
                const element = err.data.errors[itemKey]
                element.map((value, index) => {
                  this.$q.notify({ color: 'negative', position: 'top', message: value })
                })
              })
            } else {
              this.$q.notify({
                color: 'negative',
                message: `Ocorreu algum problema ao tentar editar o registro. ${err.data.message}`,
                icon: 'report_problem',
                position: 'top'
              })
            }
          }
        })
    }
  },
  mounted () {
    this.loadRecord(
      this.$route.params.id
    )
  }
}
</script>
