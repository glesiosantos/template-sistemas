<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import BaseButton from '../../components/ui/BaseButton.vue'
import { useCompanyOnboardingStore } from '../../stores/companyOnboarding'
import { isWhatsapp, maskWhatsapp } from '../../utils/validation'
const router = useRouter(); const store = useCompanyOnboardingStore(); const error = ref('')
function submit() {
  error.value = !store.state.owner.name.trim() ? 'Informe seu nome.' : !isWhatsapp(store.state.owner.whatsapp) ? 'Informe um WhatsApp válido.' : ''
  if (error.value) return
  store.nextStep(); router.push('/cadastro/verificar-whatsapp')
}
</script>
<template><section><p class="text-sm font-medium text-neutral-500">Vamos começar</p><h1 class="mt-2 text-3xl font-medium tracking-tight sm:text-4xl">Crie sua empresa em poucos passos</h1><p class="mt-3 max-w-lg text-base leading-6 text-neutral-600">Configure seu espaço de trabalho e deixe tudo pronto para começar.</p><form class="mt-6 space-y-3" @submit.prevent="submit"><label class="block"><span class="text-sm font-medium">Seu nome</span><input v-model="store.state.owner.name" autocomplete="name" class="mt-1.5 h-12 w-full rounded-lg border border-neutral-300 px-4 outline-none focus:border-neutral-900 focus:ring-2 focus:ring-lime-200" /></label><label class="block"><span class="text-sm font-medium">Seu WhatsApp</span><input :value="store.state.owner.whatsapp" inputmode="tel" autocomplete="tel" class="mt-1.5 h-12 w-full rounded-lg border border-neutral-300 px-4 outline-none focus:border-neutral-900 focus:ring-2 focus:ring-lime-200" placeholder="(00) 00000-0000" @input="store.updateOwner({ whatsapp: maskWhatsapp(($event.target as HTMLInputElement).value) })" /></label><p v-if="error" class="text-sm text-red-600">{{ error }}</p><BaseButton type="submit" class="min-h-12 w-full text-base">Continuar</BaseButton></form><p class="mt-4 text-center text-xs leading-5 text-neutral-500">Ao continuar, você concorda com os Termos de Uso e Política de Privacidade.</p></section></template>
