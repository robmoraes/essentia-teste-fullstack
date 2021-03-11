<template>
  <q-page padding>
    <div class="q-pa-md" style="max-width:800px;">
      <q-table
        title="Lista de Perfis"
        :loading="loadingTable"
        :data="roles"
        :columns="columns"
        row-key="name"
        :filter="filter"
      >
        <template v-slot:top-right>
          <q-input borderless dense debounce="300" v-model="filter" placeholder="Buscar">
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
              <q-btn class="q-mr-sm" size="sm" color="accent" round dense icon="edit" @click="editClick(props.row)"></q-btn>
              <q-btn size="sm" color="red" round dense icon="remove" @click="destroyClick(props.row)"></q-btn>
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </div>

    <q-dialog
      v-model="isCreate"
      transition-show="scale"
      transition-hide="scale"
      >
      <RoleCreatePage></RoleCreatePage>
    </q-dialog>
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn fab icon="add" color="accent" @click="addClick" />
      <q-btn fab icon="refresh" color="primary" @click="listRoles()" />
    </q-page-sticky>
  </q-page>
</template>

<script>
import { mapActions } from 'vuex'
import RoleCreatePage from './Create.vue'

export default {
  name: 'RolesListPage',
  components: {
    RoleCreatePage: RoleCreatePage
  },
  data () {
    return {
      isCreate: false,
      loadingTable: false,
      roles: [],
      filter: '',
      columns: [
        { name: 'name', field: 'name', required: true, label: 'Nome', align: 'left', sortable: true },
        { name: 'label', field: 'label', align: 'left', label: 'Rótulo', sortable: true }
      ]
    }
  },
  methods: {
    ...mapActions('roles', ['list', 'destroy']),
    listRoles () {
      this.loadingTable = true
      this.list()
        .then(res => {
          this.roles = res.data
          this.loadingTable = false
        })
        .catch(err => {
          this.$q.notify({
            color: 'negative',
            message: `Ocorreu algum problema ao tentar exibir a lista. [${err.status} ${err.data.message}]`,
            icon: 'report_problem',
            position: 'top'
          })
          this.loadingTable = false
        })
    },
    addClick () {
      this.isCreate = true
      // this.$router.push('/admin/security/roles/create')
    },
    destroyClick (row) {
      this.$q.dialog({
        title: 'Confirm',
        message: `Confirma a exclusão do registro: [${row.label}] ?`,
        color: 'negative',
        ok: 'Sim, confirmo!',
        cancel: true
      })
        .onOk(() => this.destroyRole(row.id))
    },
    destroyRole (id) {
      this.destroy(id)
        .then(res => {
          this.$q.notify({
            color: 'positive',
            message: 'Registro excluído.',
            icon: 'delete_forever',
            position: 'top'
          })
          this.listRoles()
        })
        .catch(err => {
          if (err) {
            this.$q.notify({
              color: 'negative',
              message: `Ocorreu algum problema ao tentar excluir o registro. [${err}]`,
              icon: 'report_problem',
              position: 'top'
            })
          }
        })
    },
    editClick (row) {
      this.$router.push(`/admin/security/roles/${row.id}/edit`)
    }
  },
  mounted () {
    this.listRoles()
  }
}
</script>
