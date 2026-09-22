<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
const props = withDefaults(defineProps<{ items: { label: string; value: string; destructive?: boolean }[]; ariaLabel?: string }>(), { ariaLabel: 'Abrir ações' })
const emit = defineEmits<{ select: [value: string] }>()
const open = ref(false)
const trigger = ref<HTMLButtonElement>()
const menu = ref<HTMLElement>()
function close() { open.value = false }
function toggle() { open.value = !open.value; if (open.value) nextTick(() => menu.value?.querySelector('button')?.focus()) }
function onDocumentClick(event: MouseEvent) { if (!menu.value?.contains(event.target as Node) && !trigger.value?.contains(event.target as Node)) close() }
function onKeydown(event: KeyboardEvent) { if (event.key === 'Escape') { close(); trigger.value?.focus() } }
onMounted(() => { document.addEventListener('click', onDocumentClick); document.addEventListener('keydown', onKeydown) })
onBeforeUnmount(() => { document.removeEventListener('click', onDocumentClick); document.removeEventListener('keydown', onKeydown) })
</script>
<template><div class="relative"><button ref="trigger" :aria-label="props.ariaLabel" :aria-expanded="open" class="rounded-lg p-2 text-neutral-500 hover:bg-neutral-100" @click.stop="toggle"><slot>⋮</slot></button><div v-if="open" ref="menu" role="menu" class="absolute right-0 top-10 z-20 min-w-36 rounded-xl border border-[var(--color-border)] bg-white p-1.5 shadow-lg"><button v-for="item in items" :key="item.value" role="menuitem" class="block w-full rounded-lg px-3 py-2 text-left text-sm hover:bg-neutral-100" :class="item.destructive ? 'text-red-600' : 'text-neutral-700'" @click="emit('select', item.value); close()">{{ item.label }}</button></div></div></template>
