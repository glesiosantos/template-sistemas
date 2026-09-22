<script setup lang="ts">
export interface DataTableColumn {
  key: string
  label: string
  class?: string
}

defineProps<{
  columns: DataTableColumn[]
  hasRows: boolean
}>()
</script>

<template>
  <div class="min-w-0 max-w-full overflow-x-auto overflow-y-hidden">
    <table class="w-full min-w-[780px] table-fixed text-left text-sm">
      <thead>
        <tr class="border-b border-[var(--color-border)] text-xs font-medium uppercase tracking-wide text-neutral-400">
          <th v-for="column in columns" :key="column.key" :class="['pb-4 pr-4', column.class]">
            {{ column.label }}
          </th>
        </tr>
      </thead>
      <tbody>
        <slot name="body" />
      </tbody>
    </table>

    <p v-if="!hasRows" class="py-12 text-center text-sm text-neutral-500">
      <slot name="empty">Nenhum registro encontrado.</slot>
    </p>
  </div>
</template>
