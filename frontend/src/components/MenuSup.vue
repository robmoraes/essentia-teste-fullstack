<template>
  <div class="q-pa-sm q-pl-md row items-center">
    <div>
      <q-btn flat icon="home" label="Início" to="/" />
      <q-btn flat icon="settings" label="Administração">
        <q-icon name="keyboard_arrow_down" />
        <q-menu auto-close>
          <q-list dense style="min-width: 100px">
            <q-item clickable>
              <q-item-section>Perfis</q-item-section>
            </q-item>
            <q-item clickable>
              <q-item-section>Permissões</q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-btn>
      <q-btn flat icon="logout" label="Sair"></q-btn>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MenuSup',
  methods: {
    onHome () {
      console.log('onHome')
    },
  }
}
</script>
