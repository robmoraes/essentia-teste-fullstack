<template>
  <q-layout view="hHh Lpr lff" container style="height: 100vh" class="shadow-2">
    <q-page-container>
        <q-page class="bg-primary window-height window-width row justify-center items-center">
            <div class="column">
            <div class="row">
                <h5 class="text-h5 text-white q-my-md">Essentia Teste Full Stack</h5>
            </div>
            <div class="row">
                <q-form class="q-gutter-md" @submit="submit">
                <q-card square bordered class="q-pa-lg shadow-1">
                <q-card-section>
                    <q-input square filled clearable v-model="credentials.username" type="email" label="e-mail" />
                    <q-input square filled clearable v-model="credentials.password" type="password" label="senha" />
                </q-card-section>
                <q-card-actions class="q-px-md">
                    <q-btn unelevated color="primary" size="lg" class="full-width" label="Login" type="submit" />
                </q-card-actions>
                <q-card-section class="text-center q-pa-none">
                    <p class="text-grey-6">
                      Sem cadastro? <a @click="openRegister=true" href="javascript:void(0)">Crie sua conta</a>
                    </p>
                </q-card-section>
                </q-card>
                </q-form>
            </div>
            </div>
        </q-page>
    </q-page-container>
    <q-dialog id="registerDialog" persistent :maximized="$q.platform.is.mobile" v-model="openRegister">
      <Register/>
    </q-dialog>
  </q-layout>
</template>

<script>
import Register from 'components/Register.vue'
export default {
  name: 'LoginLayout',
  components: {
    Register
  },
  data () {
    return {
      credentials: {
        username: '',
        password: ''
      },
      openRegister: false
    }
  },
  methods: {
    submit () {
      this.$q.loading.show()
      this.$store.dispatch('auth/login', this.credentials)
        .then((res) => {
          this.$q.loading.hide()
          this.$router.push('/')
        })
        .catch((error) => {
          this.$q.loading.hide()
          if (error) {
            this.$q.notify({
              color: 'negative',
              message: 'Você digitou alguma coisa errada!',
              icon: 'report_problem',
              position: 'top'
            })
          }
        })
    },
    hideDialogRegisterCallback () {
      this.openRegister = false
    }
  },
  created () {
    this.$root.$on('hideDialogRegister', this.hideDialogRegisterCallback)
  }
}
</script>

<style>
.q-card {
  width: 360px;
}
</style>
