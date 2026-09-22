<script setup lang="ts">
import { ref } from 'vue'; import { useRouter } from 'vue-router'; import BaseButton from '../../components/ui/BaseButton.vue'; import PlanCard from '../../components/onboarding/PlanCard.vue'; import type { Plan } from '../../services/plans.service'; import { useCompanyOnboardingStore } from '../../stores/companyOnboarding'
const router = useRouter(); const store = useCompanyOnboardingStore(); const error = ref('')
const plans: Plan[] = [
  { id: 'demo-essencial', name: 'Essencial', price: 'R$ 49/mês', description: 'Para começar a organizar seus atendimentos.', features: ['Agenda online', 'Cadastro de pacientes', 'Suporte por e-mail'] },
  { id: 'demo-profissional', name: 'Profissional', price: 'R$ 99/mês', description: 'Recursos para acompanhar o crescimento da sua empresa.', features: ['Tudo do Essencial', 'Relatórios de gestão', 'Lembretes de atendimento'] },
  { id: 'demo-clinica', name: 'Clínica', price: 'R$ 199/mês', description: 'Para equipes que atendem em conjunto.', features: ['Tudo do Profissional', 'Múltiplos profissionais', 'Gestão de equipe'] },
]
function next() { if (!store.state.plan.id) { error.value = 'Escolha um plano para continuar.'; return }; store.nextStep(); router.push('/cadastro/verificar-email') }
</script>
<template><section><h1 class="text-3xl font-medium tracking-tight sm:text-4xl">Escolha seu plano</h1><p class="mt-3 leading-7 text-neutral-600">Você poderá alterar seu plano posteriormente.</p><p class="mt-2 text-xs text-neutral-500">Planos demonstrativos para visualização do layout.</p><div class="mt-5 space-y-3"><PlanCard v-for="plan in plans" :key="plan.id" :plan="plan" :selected="store.state.plan.id === plan.id" @select="store.selectPlan" /></div><p v-if="error" class="mt-3 text-sm text-red-600">{{ error }}</p><BaseButton class="mt-5 min-h-[48px] w-full text-base" @click="next">Continuar</BaseButton></section></template>
