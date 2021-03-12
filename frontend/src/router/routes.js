const routes = [
  {
    path: '/',
    component: () => import('layouts/DesktopLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: 'admin/security/permissions', component: () => import('pages/admin/security/Permissions.vue') },
      { path: 'admin/security/roles', component: () => import('pages/admin/security/roles/List.vue') },
      { path: 'admin/security/roles/create', component: () => import('pages/admin/security/roles/Create.vue') },
      { path: 'admin/security/roles/:id/edit', component: () => import('pages/admin/security/roles/Edit.vue') },
      { path: 'admin/security/users', component: () => import('pages/admin/security/users/List.vue') },
      { path: 'admin/security/users/:id/edit', component: () => import('pages/admin/security/users/Edit.vue') },
      { path: 'admin/security/users/create', component: () => import('pages/admin/security/users/Create.vue') }
    ],
    meta: { requiresAuth: true }
  },

  {
    path: '/login',
    component: () => import('layouts/LoginLayout.vue'),
    meta: { requiresAuth: false }
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
