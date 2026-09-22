<script setup lang="ts">
import { Clock, MapPin, Video } from 'lucide-vue-next'
import AppointmentActions from './AppointmentActions.vue'
import type { Appointment } from '../../types/appointment'
defineProps<{ appointments: Appointment[] }>()
const emit = defineEmits<{ action: [appointment: Appointment, action: string] }>()
const modalityLabels = { online: 'Online', in_person: 'Presencial' }
const recurrenceLabels = { none: 'Sem recorrência', weekly: 'Semanal', biweekly: 'Quinzenal', monthly: 'Mensal' }
</script>
<template><div class="space-y-3 md:hidden"><article v-for="appointment in appointments" :key="appointment.id" class="rounded-2xl border border-[var(--color-border)] p-4"><div class="mb-4 flex items-start justify-between gap-3"><h3 class="font-medium">{{ appointment.name }}</h3><AppointmentActions :appointment="appointment" @action="emit('action', appointment, $event)" /></div><div class="grid grid-cols-2 gap-x-3 gap-y-4 text-sm"><div><p class="mb-1 text-xs text-neutral-400">Modalidade</p><span class="flex items-center gap-2 text-neutral-600"><Video v-if="appointment.modality === 'online'" :size="15" /><MapPin v-else :size="15" />{{ modalityLabels[appointment.modality] }}</span></div><div><p class="mb-1 text-xs text-neutral-400">Duração</p><span class="flex items-center gap-2 text-neutral-600"><Clock :size="15" />{{ appointment.durationMinutes }}m</span></div><div><p class="mb-1 text-xs text-neutral-400">Exibição</p><span class="text-neutral-600">A cada {{ appointment.displayIntervalMinutes }} minutos</span></div><div><p class="mb-1 text-xs text-neutral-400">Recorrência</p><span class="text-neutral-600">{{ recurrenceLabels[appointment.recurrence] }}</span></div></div></article><p v-if="!appointments.length" class="py-12 text-center text-sm text-neutral-500">Nenhum atendimento encontrado.</p></div></template>
