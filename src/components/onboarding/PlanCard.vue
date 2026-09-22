<script setup lang="ts">
import type { Plan } from '../../services/plans.service'
defineProps<{ plan: Plan; selected: boolean }>()
const emit = defineEmits<{ select: [id: string] }>()
</script>
<template><button type="button" class="rounded-2xl border p-5 text-left transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-lime-500" :class="selected ? 'border-neutral-900 bg-neutral-900 text-white' : 'border-neutral-300 hover:border-neutral-500'" :aria-pressed="selected" @click="emit('select', plan.id)"><div class="flex items-start justify-between gap-3"><div><p class="text-xs font-semibold uppercase tracking-widest" :class="selected ? 'text-lime-200' : 'text-neutral-500'">{{ plan.name }}</p><p class="mt-3 text-2xl font-medium">{{ plan.price }}</p></div><span v-if="selected" aria-label="Selecionado">✓</span></div><p class="mt-3 text-sm" :class="selected ? 'text-neutral-200' : 'text-neutral-600'">{{ plan.description }}</p><ul class="mt-4 space-y-2 text-sm"><li v-for="feature in plan.features" :key="feature" :class="selected ? 'text-neutral-200' : 'text-neutral-600'">✓ {{ feature }}</li></ul></button></template>
