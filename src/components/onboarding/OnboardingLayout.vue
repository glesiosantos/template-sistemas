<script setup lang="ts">
import { computed, onBeforeUnmount, watch } from 'vue'
import { RouterLink, RouterView, useRoute, useRouter } from 'vue-router'
import { ArrowLeft } from 'lucide-vue-next'
import { useCompanyOnboardingStore } from '../../stores/companyOnboarding'
import OnboardingProgress from './OnboardingProgress.vue'

const route = useRoute(); const router = useRouter(); const store = useCompanyOnboardingStore()
const step = computed(() => Number(route.meta.onboardingStep ?? 1))
const previousPaths = ['/cadastro', '/cadastro/verificar-whatsapp', '/cadastro/empresa', '/cadastro/identificacao', '/cadastro/contato', '/cadastro/endereco', '/cadastro/tamanho', '/cadastro/atendimento', '/cadastro/resumo', '/cadastro/plano', '/cadastro/verificar-email', '/cadastro/revisao']
function goBack() { if (step.value <= 1) return; store.previousStep(); router.push(previousPaths[step.value - 2]) }
watch(() => store.state.currentStep, (value) => { document.title = `Cadastro · etapa ${value}` }, { immediate: true })
onBeforeUnmount(() => { document.title = 'Administrative layout' })
</script>
<template>
  <div class="flex h-dvh flex-col overflow-hidden bg-white text-[var(--color-text)]">
    <header class="mx-auto flex h-20 w-full max-w-[620px] shrink-0 items-center justify-between px-5 md:px-8"><RouterLink to="/" class="flex items-center gap-3 text-base font-semibold" aria-label="Voltar ao início"><span class="flex h-10 w-10 items-center justify-center rounded-full bg-lime-100 text-lg">⌖</span><span>Consultório</span></RouterLink><button v-if="step > 1 && step < 14" type="button" class="rounded-lg p-2 text-sm text-neutral-500 hover:bg-neutral-100 lg:hidden" aria-label="Voltar" @click="goBack"><ArrowLeft :size="20" /></button></header>
    <OnboardingProgress v-if="step < 14" :step="step" />
    <main class="min-h-0 flex-1 overflow-y-auto px-5 pb-8 pt-8 md:px-8 md:pt-10"><div class="mx-auto max-w-[500px]"><RouterView /></div></main>
  </div>
</template>
