<script setup lang="ts">
import { Menu } from 'lucide-vue-next'
defineEmits<{ menu: [] }>()
</script>
<template><header class="flex h-16 items-center gap-4 border-b border-[var(--color-border)] px-5 lg:hidden"><button aria-label="Abrir menu" class="rounded-lg p-2 hover:bg-neutral-100" @click="$emit('menu')"><Menu :size="21" /></button><span class="font-medium">Atendimentos</span></header></template>
