import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/configuracoes/atendimentos' },
    { path: '/configuracoes/atendimentos', component: () => import('../views/settings/AppointmentsView.vue') },
    { path: '/configuracoes/:section', component: () => import('../views/settings/AppointmentsView.vue') },
  ],
})

export default router
