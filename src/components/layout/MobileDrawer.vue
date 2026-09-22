<script setup lang="ts">
import { X } from 'lucide-vue-next'
import AppSidebar from './AppSidebar.vue'
import SettingsSidebar from './SettingsSidebar.vue'
defineProps<{ open: boolean }>()
const emit = defineEmits<{ close: [] }>()
</script>
<template><Teleport to="body"><div v-if="open" class="fixed inset-0 z-40 overflow-hidden md:hidden"><div class="absolute inset-0 bg-black/30" aria-hidden="true" @click="emit('close')"></div><aside class="fixed inset-y-0 left-0 flex h-dvh w-[min(88vw,360px)] overflow-hidden bg-white shadow-xl"><button aria-label="Fechar menu" class="absolute right-3 top-3 z-10 rounded-lg p-2 hover:bg-neutral-100" @click="emit('close')"><X :size="19" /></button><div class="flex w-full flex-col overflow-hidden pt-10"><div class="border-b border-[var(--color-border)] pb-4"><AppSidebar mobile /></div><SettingsSidebar mobile /></div></aside></div></Teleport></template>
