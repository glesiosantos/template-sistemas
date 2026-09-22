<script setup lang="ts">
import { onBeforeUnmount, onMounted } from 'vue'
defineProps<{ open: boolean; title: string }>()
const emit = defineEmits<{ close: [] }>()
function onKeydown(event: KeyboardEvent) { if (event.key === 'Escape') emit('close') }
onMounted(() => document.addEventListener('keydown', onKeydown))
onBeforeUnmount(() => document.removeEventListener('keydown', onKeydown))
</script>
<template>
  <Teleport to="body"><div v-if="open" class="fixed inset-0 z-50 flex items-center justify-center bg-black/25 p-4" @click.self="emit('close')">
    <section role="dialog" aria-modal="true" :aria-label="title" class="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-6 shadow-xl"><div class="mb-6 flex items-center justify-between"><h2 class="text-lg font-medium">{{ title }}</h2><button class="rounded-full p-2 text-neutral-500 hover:bg-neutral-100" aria-label="Fechar" @click="emit('close')">×</button></div><slot /></section>
  </div></Teleport>
</template>
