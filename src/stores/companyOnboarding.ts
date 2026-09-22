import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'
import { companyOnboardingService } from '../services/companyOnboarding.service'

export interface CompanyOnboardingState {
  currentStep: number
  owner: { name: string; whatsapp: string; email: string }
  verification: { whatsappVerified: boolean; emailVerified: boolean }
  company: { name: string; documentType: 'cnpj' | 'cpf'; document: string; tradeName: string; phone: string; email: string }
  address: { zipCode: string; street: string; number: string; complement: string; neighborhood: string; city: string; state: string }
  profile: { businessType: string; customBusinessType: string; companySize: string; employees: string; serviceMode: string }
  plan: { id: string | null }
  termsAccepted: boolean
}

const storageKey = 'company-onboarding'
const initialState = (): CompanyOnboardingState => ({
  currentStep: 1,
  owner: { name: '', whatsapp: '', email: '' },
  verification: { whatsappVerified: false, emailVerified: false },
  company: { name: '', documentType: 'cnpj', document: '', tradeName: '', phone: '', email: '' },
  address: { zipCode: '', street: '', number: '', complement: '', neighborhood: '', city: '', state: '' },
  profile: { businessType: '', customBusinessType: '', companySize: '', employees: '', serviceMode: '' },
  plan: { id: null },
  termsAccepted: false,
})

export const useCompanyOnboardingStore = defineStore('companyOnboarding', () => {
  const state = reactive<CompanyOnboardingState>(initialState())
  const submitting = ref(false)
  const submitError = ref('')
  function persist() { localStorage.setItem(storageKey, JSON.stringify(state)) }
  function hydrate() {
    const saved = localStorage.getItem(storageKey)
    if (!saved) return
    try { Object.assign(state, initialState(), JSON.parse(saved)) } catch { localStorage.removeItem(storageKey) }
  }
  function nextStep() { state.currentStep = Math.min(13, state.currentStep + 1); persist() }
  function previousStep() { state.currentStep = Math.max(1, state.currentStep - 1); persist() }
  function goToStep(step: number) { state.currentStep = Math.min(13, Math.max(1, step)); persist() }
  function updateOwner(input: Partial<CompanyOnboardingState['owner']>) { Object.assign(state.owner, input); persist() }
  function updateCompany(input: Partial<CompanyOnboardingState['company']>) { Object.assign(state.company, input); persist() }
  function updateAddress(input: Partial<CompanyOnboardingState['address']>) { Object.assign(state.address, input); persist() }
  function updateProfile(input: Partial<CompanyOnboardingState['profile']>) { Object.assign(state.profile, input); persist() }
  function selectPlan(id: string) { state.plan.id = id; persist() }
  function reset() { Object.assign(state, initialState()); submitting.value = false; submitError.value = ''; localStorage.removeItem(storageKey) }
  async function submit() {
    if (submitting.value) return
    submitting.value = true; submitError.value = ''
    try { const result = await companyOnboardingService.finish(structuredClone(state)); localStorage.removeItem(storageKey); return result }
    catch (error) { submitError.value = error instanceof Error ? error.message : 'Não foi possível criar a empresa.'; throw error }
    finally { submitting.value = false }
  }
  hydrate()
  return { state, submitting, submitError, nextStep, previousStep, goToStep, updateOwner, updateCompany, updateAddress, updateProfile, selectPlan, reset, submit }
})
