<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { Search } from 'lucide-vue-next'
import SettingsLayout from '../../layouts/SettingsLayout.vue'
import BaseButton from '../../components/ui/BaseButton.vue'
import Pagination from '../../components/ui/Pagination.vue'
import AppointmentsTable from '../../components/settings/AppointmentsTable.vue'
import AppointmentsMobileList from '../../components/settings/AppointmentsMobileList.vue'
import AppointmentFormModal from '../../components/settings/AppointmentFormModal.vue'
import { useAppointmentsStore } from '../../stores/appointments'
import type { Appointment, AppointmentInput } from '../../types/appointment'
const store = useAppointmentsStore()
const modalOpen = ref(false)
const editingAppointment = ref<Appointment | null>(null)
const visibleFrom = computed(() => store.filteredAppointments.length ? (store.currentPage - 1) * store.perPage + 1 : 0)
const visibleTo = computed(() => Math.min(store.currentPage * store.perPage, store.filteredAppointments.length))
onMounted(() => store.load())
function openCreate() { editingAppointment.value = null; modalOpen.value = true }
function openEdit(appointment: Appointment) { editingAppointment.value = appointment; modalOpen.value = true }
async function save(input: AppointmentInput) { if (editingAppointment.value) await store.updateAppointment(editingAppointment.value.id, input); else await store.createAppointment(input); modalOpen.value = false }
async function handleAction(appointment: Appointment, action: string) { if (action === 'edit') openEdit(appointment); if (action === 'duplicate') await store.createAppointment({ ...appointment, name: `${appointment.name} (cópia)` }); if (action === 'delete' && window.confirm(`Excluir ${appointment.name}?`)) await store.deleteAppointment(appointment.id); if (action === 'deactivate') await store.updateAppointment(appointment.id, { ...appointment, active: false }) }
</script>
<template><SettingsLayout><main class="min-h-0 min-w-0 flex-1 overflow-x-hidden overflow-y-auto px-5 py-7 sm:px-8 lg:px-10 lg:py-8"><div class="mx-auto max-w-[1400px]"><header><h1 class="text-xl font-medium">Atendimentos</h1><p class="mt-3 max-w-2xl text-sm leading-6 text-neutral-600 sm:text-[15px]">Crie tipos de atendimento definindo duração e recorrência. Personalize formatos como consultas rápidas, sessões longas ou atendimentos semanais.</p></header><div class="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"><label class="relative block w-full sm:w-[245px]"><span class="sr-only">Buscar atendimentos</span><Search :size="17" class="pointer-events-none absolute left-3 top-3 text-neutral-400" /><input :value="store.search" class="h-[42px] w-full rounded-lg border border-[var(--color-border)] pl-9 pr-3 text-sm placeholder:text-neutral-400" placeholder="Buscar" @input="store.setSearch(($event.target as HTMLInputElement).value)" /></label><BaseButton class="w-full sm:w-auto" @click="openCreate">Novo tipo de atendimento</BaseButton></div><section class="mt-8"><AppointmentsTable :appointments="store.paginatedAppointments" @action="handleAction" /><AppointmentsMobileList :appointments="store.paginatedAppointments" @action="handleAction" /><Pagination :current-page="store.currentPage" :total-pages="store.totalPages" :from="visibleFrom" :to="visibleTo" :total="store.filteredAppointments.length" @change="store.currentPage = $event" /></section></div></main><AppointmentFormModal :open="modalOpen" :appointment="editingAppointment" @close="modalOpen = false" @save="save" /></SettingsLayout></template>
