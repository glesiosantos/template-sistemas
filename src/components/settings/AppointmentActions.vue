<script setup lang="ts">
import DropdownMenu from '../ui/DropdownMenu.vue'
import type { Appointment } from '../../types/appointment'
defineProps<{ appointment: Appointment }>()
const emit = defineEmits<{ action: [action: string] }>()
const items = [{ label: 'Editar', value: 'edit' }, { label: 'Duplicar', value: 'duplicate' }, { label: 'Desativar', value: 'deactivate' }, { label: 'Excluir', value: 'delete', destructive: true }]
</script>
<template><DropdownMenu :items="items" @select="emit('action', $event)"><span class="text-xl leading-none">⋮</span></DropdownMenu></template>
