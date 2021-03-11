<template>
  <q-page padding>
    <q-card style="max-width:600px; width:100%;">
      <q-card-section>
        <div class="text-h6">Editar Perfil</div>
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
            hint="Apenas letras minúsculas, números e os caracteres: Ponto (.), Sublinhado (_) e Hífen (-)"
            lazy-rules
            :rules="[val => val && val.length > 0 || 'Informe um nome']"
          />

          <q-input
            filled
            v-model="record.label"
            label="Rótulo *"
            hint="Um nome amigável"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Informe um rótulo']"
          />

          <div class="q-pa-lg">
            Permissões:
            <q-option-group
              v-model="permissionsSelecteds"
              :options="permissionsOptions"
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
  name: 'RoleEditPage',
  data () {
    return {
      record: {},
      permissionsOptions: [],
      permissionsSelecteds: []
    }
  },
  methods: {
    ...mapActions('roles', ['show', 'update']),
    loadRecord (id) {
      this.show(id)
        .then(res => {
          this.record = res.data
          // console.log(this.record)
          this.record.permissions.forEach(el => {
            this.permissionsSelecteds.push(el.id)
          })
        })
        .catch(err => console.error(err))
    },
    onSubmit () {
      const payload = {
        id: this.record.id,
        name: this.record.name,
        label: this.record.label,
        permissions: this.permissionsSelecteds
      }
      console.log(payload)
      this.update(payload)
        .then(res => {
          this.$q.notify({
            color: 'positive',
            message: 'Registro Adicionado.',
            icon: 'save',
            position: 'top'
          })
          // this.$router.push('/admin/security/roles')
        })
        .catch(err => {
          if (err) {
            this.$q.notify({
              color: 'negative',
              message: 'Ocorreu algum problema ao tentar editar o registro.',
              icon: 'report_problem',
              position: 'top'
            })
            console.error(err)
          }
        })
    },
    loadPermissions () {
      this.$store.dispatch('permissions/setList')
        .then(res => { this.preparePermissionsOptions(res.data) })
        .catch(err => { console.error(err) })
    },
    preparePermissionsOptions (collection) {
      collection.forEach(element => {
        let category = ''
        if (element.category) {
          category = `${element.category}:`
        }
        this.permissionsOptions.push({
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
    this.loadPermissions()
  }
}
</script>
