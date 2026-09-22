<script setup lang="ts">
import { useRouter } from 'vue-router'; import BaseButton from '../../components/ui/BaseButton.vue'; import { useCompanyOnboardingStore } from '../../stores/companyOnboarding'
const router = useRouter(); const store = useCompanyOnboardingStore()
</script>
<template><section class="text-center"><div class="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[var(--color-primary)] text-2xl">✓</div><h1 class="mt-8 text-3xl font-medium tracking-tight sm:text-4xl">Pronto, {{ store.state.owner.name.split(' ')[0] || 'tudo certo' }}!</h1><p class="mt-5 leading-7 text-neutral-600">Sua empresa foi criada com sucesso.</p><ul class="mx-auto mt-8 max-w-xs space-y-3 text-left text-sm text-neutral-700"><li>✓ Espaço criado</li><li>✓ Administrador configurado</li><li>✓ Plano selecionado</li></ul><BaseButton class="mt-10 min-h-[56px] w-full text-base sm:min-h-[68px] sm:text-lg" @click="router.push('/')">Acessar minha empresa</BaseButton></section></template>
