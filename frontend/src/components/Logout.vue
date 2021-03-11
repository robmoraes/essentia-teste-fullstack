<template>
  <q-list>
    <q-item clickable v-ripple @click="logoutClick">
      <q-item-section avatar>
        <q-icon color="primary" name="logout" />
      </q-item-section>

      <q-item-section>Encerrar Sessão</q-item-section>
    </q-item>
  </q-list>
</template>

<script>
export default {
  name: 'logout',
  data () {
    return {}
  },
  methods: {
    logoutClick () {
      this.$store.dispatch('auth/logout')
      this.$router.push('/login')
    }
  }
}
</script>
