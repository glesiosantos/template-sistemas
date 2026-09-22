import { computed, ref, watch } from 'vue'
import { defineStore } from 'pinia'
import { appointmentsService } from '../services/appointments.service'
import type { Appointment, AppointmentInput } from '../types/appointment'

export const useAppointmentsStore = defineStore('appointments', () => {
  const appointments = ref<Appointment[]>([])
  const search = ref('')
  const currentPage = ref(1)
  const perPage = ref(8)
  const selectedAppointment = ref<Appointment | null>(null)

  const filteredAppointments = computed(() => {
    const term = search.value.trim().toLocaleLowerCase()
    return term ? appointments.value.filter(({ name }) => name.toLocaleLowerCase().includes(term)) : appointments.value
  })
  const totalPages = computed(() => Math.max(1, Math.ceil(filteredAppointments.value.length / perPage.value)))
  const paginatedAppointments = computed(() => filteredAppointments.value.slice((currentPage.value - 1) * perPage.value, currentPage.value * perPage.value))
  watch(totalPages, (pages) => { if (currentPage.value > pages) currentPage.value = pages })
  function setSearch(value: string) { search.value = value; currentPage.value = 1 }
  function selectAppointment(appointment: Appointment | null) { selectedAppointment.value = appointment }
  async function load() { appointments.value = await appointmentsService.list() }
  async function createAppointment(input: AppointmentInput) { appointments.value.push(await appointmentsService.create(input)) }
  async function updateAppointment(id: string, input: AppointmentInput) {
    const updated = await appointmentsService.update(id, input)
    const index = appointments.value.findIndex((item) => item.id === id)
    if (index >= 0) appointments.value[index] = updated
  }
  async function deleteAppointment(id: string) { await appointmentsService.remove(id); appointments.value = appointments.value.filter((item) => item.id !== id) }
  return { appointments, search, currentPage, perPage, selectedAppointment, filteredAppointments, paginatedAppointments, totalPages, setSearch, selectAppointment, load, createAppointment, updateAppointment, deleteAppointment }
})
