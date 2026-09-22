<script setup lang="ts">
import { nextTick, onBeforeUnmount, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { X } from 'lucide-vue-next'
import AppSidebar from './AppSidebar.vue'
import SettingsSidebar from './SettingsSidebar.vue'
const props = defineProps<{ open: boolean }>()
const emit = defineEmits<{ close: [] }>()
const route = useRoute()
const closeButton = ref<HTMLButtonElement | null>(null)
function onKeydown(event: KeyboardEvent) { if (event.key === 'Escape') emit('close') }
function closeOnLink(event: MouseEvent) { if ((event.target as HTMLElement).closest('a')) emit('close') }
watch(() => props.open, (open) => {
  if (open) {
    document.addEventListener('keydown', onKeydown)
    nextTick(() => closeButton.value?.focus())
  } else {
    document.removeEventListener('keydown', onKeydown)
  }
}, { immediate: true })
watch(() => route.fullPath, () => { if (props.open) emit('close') })
onBeforeUnmount(() => document.removeEventListener('keydown', onKeydown))
</script>
<template><Teleport to="body"><div v-if="open" class="fixed inset-0 z-50 overflow-hidden lg:hidden" @click="closeOnLink"><div class="absolute inset-0 bg-black/30" aria-hidden="true" @click="emit('close')"></div><aside class="fixed inset-y-0 left-0 flex h-dvh w-[280px] overflow-y-auto bg-white shadow-xl"><button ref="closeButton" aria-label="Fechar menu" class="absolute right-3 top-3 z-10 rounded-lg p-2 hover:bg-neutral-100" @click="emit('close')"><X :size="19" /></button><div class="flex w-full flex-col pt-10"><AppSidebar mobile @navigate="emit('close')" /><SettingsSidebar mobile /></div></aside></div></Teleport></template>
