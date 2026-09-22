<script setup lang="ts">
defineProps<{ label: string; value: string; selected: boolean; description?: string; disabled?: boolean; multiple?: boolean }>()
const emit = defineEmits<{ select: [value: string] }>()
</script>
<template>
  <button type="button" :disabled="disabled" :aria-pressed="selected" class="min-h-[72px] rounded-xl border p-4 text-left transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-500 disabled:cursor-not-allowed disabled:opacity-50" :class="selected ? 'border-neutral-900 bg-neutral-900 text-white' : 'border-neutral-300 bg-white text-neutral-800 hover:border-neutral-500'" @click="emit('select', value)"><span class="block font-medium">{{ label }}</span><span v-if="description" class="mt-1 block text-sm" :class="selected ? 'text-neutral-200' : 'text-neutral-500'">{{ description }}</span></button>
</template>
