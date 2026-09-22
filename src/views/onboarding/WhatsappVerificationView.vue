<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import BaseButton from '../../components/ui/BaseButton.vue'
import OtpInput from '../../components/onboarding/OtpInput.vue'
import { useCompanyOnboardingStore } from '../../stores/companyOnboarding'
import { maskWhatsapp } from '../../utils/validation'
const router = useRouter(); const store = useCompanyOnboardingStore(); const code = ref(''); const error = ref(''); const loading = ref(false); const resendIn = ref(30)
const phone = computed(() => maskWhatsapp(store.state.owner.whatsapp))
function verify(value = code.value) { if (value.length !== 6) { error.value = 'Informe os 6 dígitos.'; return }; error.value = ''; store.state.verification.whatsappVerified = true; store.nextStep(); router.push('/cadastro/empresa') }
function resend() { if (resendIn.value) return; error.value = ''; code.value = ''; resendIn.value = 30 }
let countdown: number | undefined
onMounted(() => { countdown = window.setInterval(() => { if (resendIn.value > 0) resendIn.value -= 1 }, 1000) })
onBeforeUnmount(() => { if (countdown) window.clearInterval(countdown) })
</script>
<template><section class="text-center"><h1 class="text-3xl font-medium tracking-tight sm:text-4xl">Confirme seu WhatsApp</h1><p class="mx-auto mt-5 max-w-md leading-7 text-neutral-600">Enviamos um código de 6 dígitos para <strong class="font-medium text-neutral-900">{{ phone }}</strong>.</p><div class="mt-10"><OtpInput v-model="code" :disabled="loading" @complete="verify" /><p v-if="error" class="mt-4 text-sm text-red-600">{{ error }}</p></div><BaseButton class="mt-8 min-h-[56px] w-full text-base sm:min-h-[68px] sm:text-lg" :disabled="loading" @click="verify">{{ loading ? 'Validando...' : 'Confirmar WhatsApp' }}</BaseButton><div class="mt-6 space-y-3 text-sm text-neutral-600"><button type="button" class="block w-full underline underline-offset-2" :disabled="resendIn > 0" @click="resend">{{ resendIn ? `Reenviar em 0:${String(resendIn).padStart(2, '0')}` : 'Reenviar código' }}</button><button type="button" class="underline underline-offset-2" @click="router.push('/cadastro')">Corrigir número</button></div></section></template>
