<script setup lang="ts">
import { useRouter } from 'vue-router'; import BaseButton from '../../components/ui/BaseButton.vue'; import { useCompanyOnboardingStore } from '../../stores/companyOnboarding'
const router = useRouter(); const store = useCompanyOnboardingStore()
</script>
<template><section><p class="text-sm font-medium text-neutral-500">{{ store.state.owner.name.split(' ')[0] || 'Tudo certo' }}, estamos quase lá.</p><h1 class="mt-4 text-3xl font-medium tracking-tight sm:text-4xl">Sua empresa está pronta para começar</h1><ul class="mt-10 space-y-4 text-neutral-700"><li>✓ Espaço de trabalho configurado</li><li>✓ Dados da empresa cadastrados</li><li>✓ Usuário administrador preparado</li><li>✓ Configurações iniciais definidas</li></ul><BaseButton class="mt-10 min-h-[56px] w-full text-base sm:min-h-[68px] sm:text-lg" @click="store.nextStep(); router.push('/cadastro/plano')">Ver planos</BaseButton></section></template>
