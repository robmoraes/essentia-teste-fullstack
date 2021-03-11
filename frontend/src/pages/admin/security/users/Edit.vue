<template>
  <q-page padding>
    <q-card style="max-width:600px; width:100%;">
      <q-card-section>
        <div class="text-h6">Editar Usuário</div>
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

          <div class="q-pa-lg">
            Perfis:
            <q-option-group
              v-model="rolesSelecteds"
              :options="rolesOptions"
              color="primary"
              type="toggle"
            />
          </div>

          <div>
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
      rolesOptions: [],
      rolesSelecteds: []
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
          this.record.roles.forEach(el => {
            this.rolesSelecteds.push(el.id)
          })
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
    onSubmit () {
      this.$q.loading.show()
      const payload = {
        id: this.record.id,
        name: this.record.name,
        email: this.record.email,
        password: this.record.password,
        roles: this.rolesSelecteds
      }
      this.update(payload)
        .then(res => {
          this.$q.loading.hide()
          this.$q.notify({
            color: 'positive',
            message: 'Usuário atualizado.',
            icon: 'save',
            position: 'top'
          })
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
              this.$q.notify({
                color: 'negative',
                message: `Ocorreu algum problema ao tentar editar o registro. ${err.data.message}`,
                icon: 'report_problem',
                position: 'top'
              })
            }
          }
        })
    },
    loadRoles () {
      this.$store.dispatch('roles/list')
        .then(res => { this.prepareRolesOptions(res.data) })
        .catch(err => {
          if (err) {
            this.$q.notify({
              color: 'negative',
              message: `Ocorreu algum problema ao tentar exibir os perfis. [${err.status} ${err.data.message}]`,
              icon: 'report_problem',
              position: 'top'
            })
          }
        })
    },
    prepareRolesOptions (collection) {
      collection.forEach(element => {
        let category = ''
        if (element.category) {
          category = `${element.category}:`
        }
        this.rolesOptions.push({
          label: `${category} ${element.label}`,
          value: element.id
        })
      })
    }
  },
  mounted () {
    this.loadRecord(
      this.$route.params.id
    )
    this.loadRoles()
  }
}
</script>
