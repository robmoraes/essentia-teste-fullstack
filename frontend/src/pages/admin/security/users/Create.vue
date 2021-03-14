<template>
  <q-card class="q-ma-md" style="max-width:600px; width:100%;">
    <q-card-section>
      <div class="text-h6">Cadastro de Clientes</div>
    </q-card-section>

    <q-card-section class="q-pt-none">
      <q-form
        @submit="onSubmit"
        @reset="onReset"
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
            bottom-slots
            error-message="Falta número aí..."
            :error="!isInvalid"
          />

        <q-input
          v-model="record.password"
          lazy-rules filled :type="isPwd ? 'password' : 'text'"
          label="Senha *"
          hint="Use pelo menos 8 e máximo de 255 caracteres"
          :rules="[
            val => val && val.length > 7 || 'Digite pelo menos 8 caracteres',
            val => val.length <= 255 || 'Use no máximo 255 caracteres'
          ]"
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
            v-model="record.photo"
            style="max-width:569px;"
            label="Escolha uma foto"
          />

        <div>
          <q-btn label="Salvar" type="submit" color="primary" />
          <q-btn label="Limpar" type="reset" color="primary" flat class="q-ml-sm" />
        </div>
      </q-form>
    </q-card-section>
  </q-card>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'UserCreatePage',
  data () {
    return {
      record: {
        name: null,
        email: null,
        phone: '',
        photo: null,
        password: null
      },
      isPwd: true
    }
  },
  methods: {
    ...mapActions('users', ['insert']),
    removedFn (file) {
      this.record.photo = ''
      console.log(file)
    },
    onSubmit () {
      return this.insertRecord()
    },
    onReset () {
      this.record = []
    },
    insertRecord () {
      this.$q.loading.show()
      const formData = new FormData()
      formData.append('name', this.record.name)
      formData.append('email', this.record.email)
      formData.append('phone', this.record.phone)
      formData.append('photo', this.record.photo)
      formData.append('password', this.record.password)

      this.insert(formData)
        .then(res => {
          this.$q.loading.hide()
          this.$q.notify({ color: 'positive', position: 'top', message: 'Cliente incluído!' })
          this.$router.push('/admin/security/users')
        })
        .catch(err => {
          this.$q.loading.hide()
          if (err) {
            if (err.status === 422) {
              console.log(err.data.errors)
              Object.keys(err.data.errors).forEach(itemKey => {
                const element = err.data.errors[itemKey]
                element.map((value, index) => {
                  this.$q.notify({ color: 'negative', position: 'top', message: value })
                })
              })
            } else {
              this.$q.notify({ color: 'negative', position: 'top', message: 'Erro ao tentar incluir cliente!' })
            }
          }
        })
    }
  },
  computed: {
    isInvalid () {
      const p = this.record.phone
      switch (p) {
        case null:
        case undefined:
          return false
      }
      return (p.length === 0 || p.length >= 16)
    }
  }
}
</script>
