<template>
  <q-page padding>
    <div class="q-pa-md" style="max-width: 400px">
      <div class="q-pa-md q-gutter-sm">
        <q-dialog v-model="isEdit" persistent transition-show="scale" transition-hide="scale">
          <q-card style="width: 300px">
            <q-card-section>
              <div class="text-h6">Permissão</div>
            </q-card-section>

            <q-card-section class="q-pt-none">
              <q-form
                @submit="onSubmit"
                @reset="onReset"
                class="q-gutter-md"
              >
                <q-input
                  filled
                  v-model="data.permission.id"
                  label="ID"
                  hint="UUID"
                  disable
                  readonly
                />

                <q-input
                  filled
                  v-model="data.permission.name"
                  label="Nome *"
                  hint="Apenas letras minúsculas e caracteres (._-)"
                  lazy-rules
                  :rules="[ val => val && val.length > 0 || 'Please type something']"
                />

                <q-input
                  filled
                  v-model="data.permission.label"
                  label="Rótulo *"
                  hint=""
                  lazy-rules
                  :rules="[ val => val && val.length > 0 || 'Please type something']"
                />

                <q-input
                  filled
                  v-model="data.permission.category"
                  label="Categoria"
                  hint="Informe uma categoria para agrupar e organizar permissões aproximadas"
                />

                <div>
                  <q-btn label="Submit" type="submit" color="primary" />
                  <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
                  <q-btn flat label="Cancelar" v-close-popup color="primary" />
                </div>
              </q-form>
            </q-card-section>
          </q-card>
        </q-dialog>
      </div>
    </div>

    <div class="q-pa-md">
      <q-table
        title="Permissões"
        :data="data.list"
        :columns="columns"
        row-key="name"
        :filter="filter"
      >
        <template v-slot:top-right>
          <q-input borderless dense debounce="300" v-model="filter" placeholder="Search">
            <q-icon slot="append" name="search" />
          </q-input>
        </template>

        <template v-slot:no-data="{ icon, message, filter }">
          <div class="full-width row flex-center text-accent q-gutter-sm">
            <q-icon size="2em" name="sentiment_dissatisfied" />
            <span>
              Well this is sad... {{ message }}
            </span>
            <q-icon size="2em" :name="filter ? 'filter_b_and_w' : icon" />
          </div>
        </template>

        <template v-slot:header="props">
          <q-tr :props="props">
            <q-th
              v-for="col in props.cols"
              :key="col.name"
              :props="props"
            >
              {{ col.label }}
            </q-th>
            <q-th></q-th>
          </q-tr>
        </template>

        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td
              v-for="col in props.cols"
              :key="col.name"
              :props="props"
            >
              {{ col.value }}
            </q-td>
            <q-td align="center">
              <q-btn class="q-mr-sm" size="sm" color="accent" round dense @click="editRow(props.row)" icon="edit"></q-btn>
              <q-btn size="sm" color="red" round dense @click="destroyClick(props.row)" icon="remove"></q-btn>
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </div>
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn fab icon="add" color="accent" @click="addClick" />
    </q-page-sticky>
  </q-page>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'PagePermissions',
  data () {
    return {
      loading: false,
      isEdit: false,
      data: {
        list: [],
        blank: {
          id: '',
          name: '',
          label: '',
          category: ''
        },
        permission: {}
      },
      filter: '',

      columns: [
        {
          name: 'name',
          required: true,
          label: 'Nome',
          align: 'left',
          field: row => row.name,
          format: val => `${val}`,
          sortable: true
        },
        { name: 'label', align: 'left', label: 'Rótulo', field: 'label', sortable: true },
        { name: 'category', align: 'left', label: 'Categoria', field: 'category', sortable: true }
      ]
    }
  },
  methods: {
    ...mapActions('permissions', ['setList', 'post', 'put', 'destroy']),
    editRow (row) {
      this.data.permission = Object.assign({}, this.permission, row)
      this.isEdit = true
    },
    addClick () {
      this.data.permission = this.data.blank
      this.isEdit = true
    },
    listPermissions () {
      this.loading = true

      this.setList()
        .then((res) => {
          this.data.list = res.data
          this.loading = false
        })
        .catch((err) => {
          this.loading = false
          if (err) {
            this.$q.notify({
              color: 'negative',
              message: `Ocorreu algum problema ao tentar exibir a lista. [${err.status} ${err.data.message}]`,
              icon: 'report_problem',
              position: 'top'
            })
          }
        })
    },
    destroyClick (row) {
      this.$q.dialog({
        title: 'Confirm',
        message: `Você tem certeza que deseja excluir esse registro: [${row.label}] ?`,
        color: 'negative',
        ok: 'Sim, tenho certeza!',
        cancel: true,
        default: 'cancel'
      })
        .onOk(() => this.destroyPermission(row.id))
    },
    destroyPermission (permissionId) {
      this.$q.loading.show()
      this.destroy(permissionId)
        .then((res) => {
          this.$q.loading.hide()
          this.$q.notify({
            color: 'positive',
            message: 'Registro excluído.',
            icon: 'delete_forever',
            position: 'top'
          })
          this.listPermissions()
        })
        .catch((err) => {
          this.$q.loading.hide()
          if (err) {
            this.$q.notify({
              color: 'negative',
              message: `Ocorreu um erro no sistema. [${err.status}]`,
              icon: 'report_problem',
              position: 'top'
            })
          }
        })
    },
    onSubmit () {
      this.$q.loading.show()
      if (this.data.permission.id === '') {
        this.postPermission()
        return true
      }
      this.putPermission()
    },
    postPermission () {
      this.post(this.data.permission)
        .then((res) => {
          this.$q.loading.hide()
          this.$q.notify({
            color: 'positive',
            message: 'Registro Adicionado.',
            icon: 'save',
            position: 'top'
          })
          this.data.permission = this.data.blank
          this.isEdit = false
          this.listPermissions()
        })
        .catch((err) => {
          this.$q.loading.hide()
          if (err) {
            this.$q.notify({
              color: 'negative',
              message: `Ocorreu um erro no sistema. [${err.status}]`,
              icon: 'report_problem',
              position: 'top'
            })
          }
        })
    },
    putPermission () {
      this.put(this.data.permission)
        .then((res) => {
          this.$q.loading.hide()
          this.$q.notify({
            color: 'positive',
            message: 'Registro Atualizado.',
            icon: 'save',
            position: 'top'
          })
          this.data.permission = this.data.blank
          this.isEdit = false
          this.listPermissions()
        })
        .catch((err) => {
          this.$q.loading.hide()
          if (err) {
            this.$q.notify({
              color: 'negative',
              message: `Ocorre um erro no sistema. [${err.status}]`,
              icon: 'report_problem',
              position: 'top'
            })
          }
        })
    },
    onReset () {
      // console.log('reset')
    }
  },
  mounted () {
    this.listPermissions()
  }
}
</script>
