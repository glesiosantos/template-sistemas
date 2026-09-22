import { createRouter, createWebHistory } from 'vue-router'
import { useCompanyOnboardingStore } from '../stores/companyOnboarding'

const onboardingPaths = ['/cadastro', '/cadastro/verificar-whatsapp', '/cadastro/empresa', '/cadastro/identificacao', '/cadastro/contato', '/cadastro/endereco', '/cadastro/tamanho', '/cadastro/atendimento', '/cadastro/resumo', '/cadastro/plano', '/cadastro/verificar-email', '/cadastro/revisao', '/cadastro/termos']

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/configuracoes/atendimentos' },
    {
      path: '/cadastro', component: () => import('../components/onboarding/OnboardingLayout.vue'),
      children: [
        { path: '', name: 'onboarding-start', component: () => import('../views/onboarding/StartView.vue'), meta: { onboardingStep: 1 } },
        { path: 'verificar-whatsapp', name: 'onboarding-whatsapp', component: () => import('../views/onboarding/WhatsappVerificationView.vue'), meta: { onboardingStep: 2 } },
        { path: 'empresa', name: 'onboarding-business', component: () => import('../views/onboarding/BusinessTypeView.vue'), meta: { onboardingStep: 3 } },
        { path: 'identificacao', name: 'onboarding-identification', component: () => import('../views/onboarding/CompanyIdentificationView.vue'), meta: { onboardingStep: 4 } },
        { path: 'contato', name: 'onboarding-contact', component: () => import('../views/onboarding/CompanyContactView.vue'), meta: { onboardingStep: 5 } },
        { path: 'endereco', name: 'onboarding-address', component: () => import('../views/onboarding/AddressView.vue'), meta: { onboardingStep: 6 } },
        { path: 'tamanho', name: 'onboarding-size', component: () => import('../views/onboarding/CompanySizeView.vue'), meta: { onboardingStep: 7 } },
        { path: 'atendimento', name: 'onboarding-service-mode', component: () => import('../views/onboarding/ServiceModeView.vue'), meta: { onboardingStep: 8 } },
        { path: 'resumo', name: 'onboarding-summary', component: () => import('../views/onboarding/ProfileSummaryView.vue'), meta: { onboardingStep: 9 } },
        { path: 'plano', name: 'onboarding-plans', component: () => import('../views/onboarding/PlansView.vue'), meta: { onboardingStep: 10 } },
        { path: 'verificar-email', name: 'onboarding-email', component: () => import('../views/onboarding/EmailVerificationView.vue'), meta: { onboardingStep: 11 } },
        { path: 'revisao', name: 'onboarding-review', component: () => import('../views/onboarding/ReviewView.vue'), meta: { onboardingStep: 12 } },
        { path: 'termos', name: 'onboarding-terms', component: () => import('../views/onboarding/TermsView.vue'), meta: { onboardingStep: 13 } },
        { path: 'concluido', name: 'onboarding-completed', component: () => import('../views/onboarding/CompletedView.vue'), meta: { onboardingStep: 14, onboardingCompleted: true } },
      ],
    },
    { path: '/configuracoes/atendimentos', component: () => import('../views/settings/AppointmentsView.vue') },
    { path: '/configuracoes/:section', component: () => import('../views/settings/AppointmentsView.vue') },
  ],
})

router.beforeEach((to) => {
  if (!to.meta.onboardingStep || to.meta.onboardingCompleted) return true
  const store = useCompanyOnboardingStore()
  const step = Number(to.meta.onboardingStep)
  if (step <= store.state.currentStep) return true
  return onboardingPaths[Math.max(0, store.state.currentStep - 1)]
})

export default router
