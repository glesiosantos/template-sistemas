export interface Appointment {
  id: string
  name: string
  modality: 'online' | 'in_person'
  durationMinutes: number
  displayIntervalMinutes: number
  recurrence: 'none' | 'weekly' | 'biweekly' | 'monthly'
  active: boolean
}

export type AppointmentInput = Omit<Appointment, 'id' | 'active'> & { active?: boolean }
