import type { Appointment, AppointmentInput } from '../types/appointment'

const initialAppointments: Appointment[] = [
  ['Atendimento online', 'online', 'none'], ['Atendimento online mensal', 'online', 'monthly'],
  ['Atendimento online quinzenal', 'online', 'biweekly'], ['Atendimento online semanal', 'online', 'weekly'],
  ['Atendimento presencial', 'in_person', 'none'], ['Atendimento presencial mensal', 'in_person', 'monthly'],
  ['Atendimento presencial quinzenal', 'in_person', 'biweekly'], ['Atendimento presencial semanal', 'in_person', 'weekly'],
].map(([name, modality, recurrence], index) => ({
  id: String(index + 1), name, modality: modality as Appointment['modality'], durationMinutes: 60,
  displayIntervalMinutes: 30, recurrence: recurrence as Appointment['recurrence'], active: true,
}))

let records = structuredClone(initialAppointments)

export const appointmentsService = {
  list: async () => structuredClone(records),
  create: async (input: AppointmentInput) => {
    const appointment = { ...input, id: crypto.randomUUID(), active: input.active ?? true }
    records = [...records, appointment]
    return structuredClone(appointment)
  },
  update: async (id: string, input: AppointmentInput) => {
    const index = records.findIndex((item) => item.id === id)
    if (index < 0) throw new Error('Appointment not found')
    records[index] = { ...records[index], ...input }
    return structuredClone(records[index])
  },
  remove: async (id: string) => { records = records.filter((item) => item.id !== id) },
}
