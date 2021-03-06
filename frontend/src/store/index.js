import Vue from 'vue'
import Vuex from 'vuex'

import auth from './auth'
import permissions from './admin/security/permissions'
import roles from './admin/security/roles'
import users from './admin/security/users'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      auth,
      permissions,
      roles,
      users
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV
  })

  return Store
}
