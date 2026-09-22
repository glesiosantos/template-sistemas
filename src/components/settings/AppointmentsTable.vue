<script setup lang="ts">
import { Clock, MapPin, Video } from 'lucide-vue-next'
import AppointmentActions from './AppointmentActions.vue'
import DataTable from '../ui/DataTable.vue'
import type { Appointment } from '../../types/appointment'
defineProps<{ appointments: Appointment[] }>()
const emit = defineEmits<{ action: [appointment: Appointment, action: string] }>()
const modalityLabels = { online: 'Online', in_person: 'Presencial' }
const recurrenceLabels = { none: 'Sem recorrência', weekly: 'Semanal', biweekly: 'Quinzenal', monthly: 'Mensal' }
const columns = [
  { key: 'name', label: 'Nome', class: 'w-[19%]' },
  { key: 'modality', label: 'Modalidade', class: 'w-[17%]' },
  { key: 'duration', label: 'Duração', class: 'w-[12%]' },
  { key: 'display', label: 'Exibição', class: 'w-[21%]' },
  { key: 'recurrence', label: 'Recorrência', class: 'w-[21%]' },
  { key: 'actions', label: 'Ações', class: 'w-[10%] text-right' },
]
</script>
<template><div class="hidden min-w-0 max-w-full md:block"><DataTable :columns="columns" :has-rows="appointments.length > 0"><template #body><tr v-for="appointment in appointments" :key="appointment.id" class="border-b border-neutral-100 last:border-0"><td class="break-words py-5 pr-4 align-top font-medium text-neutral-800">{{ appointment.name }}</td><td class="break-words py-5 pr-4 align-top"><span class="inline-flex max-w-full items-center gap-2 text-neutral-600"><Video v-if="appointment.modality === 'online'" :size="16" /><MapPin v-else :size="16" />{{ modalityLabels[appointment.modality] }}</span></td><td class="break-words py-5 pr-4 align-top"><span class="inline-flex max-w-full items-center gap-2 text-neutral-600"><Clock :size="16" />{{ appointment.durationMinutes }}m</span></td><td class="break-words py-5 pr-4 align-top text-neutral-600">A cada {{ appointment.displayIntervalMinutes }} minutos</td><td class="break-words py-5 pr-4 align-top text-neutral-600">{{ recurrenceLabels[appointment.recurrence] }}</td><td class="py-5 align-top text-right"><AppointmentActions :appointment="appointment" @action="emit('action', appointment, $event)" /></td></tr></template><template #empty>Nenhum atendimento encontrado.</template></DataTable></div></template>
