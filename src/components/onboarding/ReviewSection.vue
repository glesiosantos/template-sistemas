<script setup lang="ts">
defineProps<{ title: string; lines: string[]; step: number }>()
const emit = defineEmits<{ edit: [step: number] }>()
</script>
<template><section class="border-b border-neutral-200 py-5 last:border-0"><div class="flex items-start justify-between gap-4"><h2 class="font-medium">{{ title }}</h2><button type="button" class="text-sm underline underline-offset-2" @click="emit('edit', step)">Editar</button></div><p v-for="line in lines" :key="line" class="mt-2 text-sm text-neutral-600">{{ line }}</p></section></template>
