<script setup lang="ts">
import type { LucideIcon } from 'lucide-vue-next'
import { RouterLink } from 'vue-router'

const props = defineProps<{ icon: LucideIcon; label: string; route: string; expanded: boolean }>()
const emit = defineEmits<{ navigate: [] }>()
</script>

<template>
  <div class="group relative">
    <RouterLink
      :to="props.route"
      :aria-label="props.label"
      class="flex h-10 w-full items-center rounded-full text-sm text-neutral-600 transition-colors hover:bg-neutral-100 hover:text-neutral-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-500"
      :class="props.expanded ? 'justify-start gap-3 px-4' : 'justify-center px-0'"
      active-class="bg-[var(--color-surface-selected)] text-neutral-900"
      @click="emit('navigate')"
    >
      <component :is="props.icon" :size="19" stroke-width="1.8" class="shrink-0" />
      <span class="overflow-hidden whitespace-nowrap transition-[opacity] duration-150" :class="props.expanded ? 'visible opacity-100 delay-100' : 'invisible w-0 opacity-0'">{{ props.label }}</span>
    </RouterLink>
    <span v-if="!props.expanded" role="tooltip" class="pointer-events-none absolute left-[calc(100%+8px)] top-1/2 z-50 hidden -translate-y-1/2 whitespace-nowrap rounded-md bg-neutral-900 px-2.5 py-1.5 text-xs text-white shadow-lg group-hover:block group-focus-within:block">{{ props.label }}</span>
  </div>
</template>
