<template>
  <q-card style="max-width:600px; width:100%;">
    <q-card-section>
      <div class="text-h6">Criar Perfil</div>
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
  name: 'RoleCreatePage',
  data () {
    return {
      blank: {
        id: '',
        name: '',
        label: ''
      },
      record: {}
    }
  },
  methods: {
    ...mapActions('roles', ['insert']),
    onSubmit () {
      this.insert(this.record)
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
              message: 'Ocorreu algum problema ao tentar excluir o registro.',
              icon: 'report_problem',
              position: 'top'
            })
            console.error(err)
          }
        })
    },
    onReset () {
      console.log('onReset')
    }
  },
  mounted () {
    this.record = this.blank
  }
}
</script>
