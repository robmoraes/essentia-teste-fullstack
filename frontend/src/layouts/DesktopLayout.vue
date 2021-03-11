<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated>
      <q-bar>
        <q-btn dense flat round icon="menu" @click="left = !left" />
        <q-separator spaced vertical dark />
        <img src="~/assets/icon-512x512.png" style="max-width: 18px;position:relative;top:0px;">
        <div class="desktop-only">Essentia Teste Full Stack</div>
        <q-space />
        <q-separator spaced vertical dark />
        <q-btn v-if="!$q.dark.isActive" flat icon="nights_stay" label="" @click="changeMode">
          <q-tooltip>
            Modo Escuro
          </q-tooltip>
        </q-btn>
        <q-btn v-if="$q.dark.isActive" flat icon="wb_incandescent" label="" @click="changeMode">
          <q-tooltip>
            Modo Claro
          </q-tooltip>
        </q-btn>
      </q-bar>
    </q-header>

    <q-drawer :show-if-above="false" v-model="left" side="left" bordered>
      <q-img class="absolute-top" src="https://cdn.quasar.dev/img/material.png" style="height: 150px">
        <div class="absolute-bottom bg-transparent">
          <q-avatar size="56px" class="q-mb-sm">
            <img :src="auth.userGravatar" alt="" srcset="">
          </q-avatar>
          <div class="text-weight-bold">{{ auth.user.name }}</div>
          <div style="font-size: 12px;">{{ auth.user.email }}</div>
          <router-link tag="a" class="item item-link" to="/profile">
            <a href="javascript:void(0)" class="text-white" style="font-size:12px;">Veja seu perfil</a>
          </router-link>
        </div>
      </q-img>
      <q-scroll-area class="q-pa-sm" style="height: calc(100% - 150px); margin-top: 150px;">
        <q-list>
          <q-item clickable v-ripple to="/admin/security/users">
            <q-item-section>Usuários</q-item-section>
          </q-item>
          <!-- <q-item clickable v-ripple to="/admin/security/roles">
            <q-item-section>Perfis</q-item-section>
          </q-item> -->
          <!-- <q-item clickable v-ripple to="/admin/security/permissions">
            <q-item-section>Permissões</q-item-section>
          </q-item> -->
          <q-separator />
          <q-item clickable v-ripple to="/admin/activities">
            <q-item-section>Log de atividades</q-item-section>
          </q-item>
        </q-list>
        <q-separator />
        <logout></logout>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer elevated class="bg-grey-8 text-white">
      <q-toolbar>
        <img
          src="~/assets/icon-512x512.png"
          style="max-width: 18px;margin-right: 5px;position:relative;top:0px;"
        >
        <span style="font-size: 18px;">Essentia Teste Full Stack</span>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>
<script>
// import MenuSup from 'components/MenuSup.vue'
import Logout from 'components/Logout.vue'
import crypto from 'crypto'
export default {
  name: 'DesktopLayout',
  components: {
    Logout
    // MenuSup,
  },
  data () {
    return {
      left: true,
      auth: {
        user: {},
        userGravatar: ''
      }
    }
  },
  methods: {
    changeMode () {
      this.$q.dark.toggle()
    }
  },
  mounted () {
    const a = this.$auth.get()
    const gt = crypto.createHash('md5').update(a.user.email).digest('hex')
    this.auth.user = a.user
    this.auth.userGravatar = `https://www.gravatar.com/avatar/${gt}`
  }
}
</script>
