<script setup lang="ts">
withDefaults(defineProps<{ variant?: 'primary' | 'secondary' | 'ghost'; type?: 'button' | 'submit' }>(), { variant: 'primary', type: 'button' })
</script>
<template><button :type="type" class="rounded-lg px-4 py-2.5 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50" :class="{ 'bg-[var(--color-primary)] text-neutral-900 hover:bg-[var(--color-primary-hover)]': variant === 'primary', 'border border-[var(--color-border)] bg-white hover:bg-[var(--color-surface-subtle)]': variant === 'secondary', 'hover:bg-neutral-100': variant === 'ghost' }"><slot /></button></template>
