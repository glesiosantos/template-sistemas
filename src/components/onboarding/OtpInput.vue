<script setup lang="ts">
import { nextTick, onMounted, ref, watch } from 'vue'
const props = defineProps<{ modelValue: string; disabled?: boolean }>()
const emit = defineEmits<{ 'update:modelValue': [value: string]; complete: [value: string] }>()
const inputs = ref<HTMLInputElement[]>([])
const digits = ref<string[]>(Array.from({ length: 6 }, (_, index) => props.modelValue[index] ?? ''))
function focus(index: number) { nextTick(() => inputs.value[index]?.focus()) }
function update(index: number, event: Event) {
  const value = (event.target as HTMLInputElement).value.replace(/\D/g, '').slice(-1)
  digits.value[index] = value
  const code = digits.value.join('')
  emit('update:modelValue', code)
  if (value && index < 5) focus(index + 1)
  if (code.length === 6) emit('complete', code)
}
function backspace(index: number, event: KeyboardEvent) { if (event.key === 'Backspace' && !digits.value[index] && index > 0) focus(index - 1) }
function paste(event: ClipboardEvent) { event.preventDefault(); const value = event.clipboardData?.getData('text').replace(/\D/g, '').slice(0, 6) ?? ''; digits.value = value.padEnd(6, ' ').split('').map((item) => item.trim()); emit('update:modelValue', value); focus(Math.min(value.length, 5)); if (value.length === 6) emit('complete', value) }
watch(() => props.modelValue, (value) => { digits.value = Array.from({ length: 6 }, (_, index) => value[index] ?? '') })
onMounted(() => focus(0))
</script>
<template><div class="flex justify-center gap-2 sm:gap-3" aria-label="Código de verificação"><input v-for="(_, index) in digits" :key="index" ref="inputs" :value="digits[index]" inputmode="numeric" autocomplete="one-time-code" maxlength="1" :disabled="disabled" :aria-label="`Dígito ${index + 1}`" class="h-14 w-11 rounded-lg border border-neutral-300 text-center text-xl outline-none transition focus:border-neutral-900 focus:ring-2 focus:ring-lime-200 sm:w-14" @input="update(index, $event)" @keydown="backspace(index, $event)" @paste="paste" /></div></template>
