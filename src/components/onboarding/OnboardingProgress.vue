<script setup lang="ts">
defineProps<{ step: number }>()
const stages = [{ label: 'Cadastro', start: 1, end: 2 }, { label: 'Empresa', start: 3, end: 9 }, { label: 'Plano', start: 10, end: 13 }]
</script>
<template>
  <nav class="mx-auto flex w-full max-w-[620px] shrink-0 items-start gap-3 px-5 md:px-8" aria-label="Progresso do cadastro">
    <div v-for="stage in stages" :key="stage.label" class="min-w-0 flex-1">
      <div class="mb-2 flex items-center gap-2 text-sm font-medium" :class="step > stage.end ? 'text-green-800' : step >= stage.start ? 'text-neutral-900' : 'text-neutral-400'"><span class="truncate">{{ stage.label }}</span><span v-if="step > stage.end" aria-label="Concluído">✓</span></div>
      <div class="h-1.5 overflow-hidden rounded-full bg-neutral-100"><div class="h-full rounded-full transition-[width,background-color] duration-300" :class="step > stage.end ? 'w-full bg-green-800' : step >= stage.start ? 'w-2/3 bg-[var(--color-primary-hover)]' : 'w-0 bg-neutral-200'" /></div>
    </div>
  </nav>
</template>
