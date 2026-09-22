import { beforeEach, describe, expect, it } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { useCompanyOnboardingStore } from './companyOnboarding'

const storage = new Map<string, string>()
Object.defineProperty(globalThis, 'localStorage', { configurable: true, value: { getItem: (key: string) => storage.get(key) ?? null, setItem: (key: string, value: string) => storage.set(key, value), removeItem: (key: string) => storage.delete(key) } })

describe('company onboarding store', () => {
  beforeEach(() => { storage.clear(); setActivePinia(createPinia()) })
  it('navigates forward and backward without losing values', () => { const store = useCompanyOnboardingStore(); store.updateOwner({ name: 'Ana' }); store.nextStep(); expect(store.state.currentStep).toBe(2); store.previousStep(); expect(store.state.currentStep).toBe(1); expect(store.state.owner.name).toBe('Ana') })
  it('persists selected plan and hydrates a new store instance', () => { const store = useCompanyOnboardingStore(); store.selectPlan('pro'); expect(JSON.parse(storage.get('company-onboarding') ?? '{}').plan.id).toBe('pro'); expect(useCompanyOnboardingStore().state.plan.id).toBe('pro') })
  it('resets the session', () => { const store = useCompanyOnboardingStore(); store.updateOwner({ name: 'Ana' }); store.selectPlan('pro'); store.reset(); expect(store.state.owner.name).toBe(''); expect(store.state.plan.id).toBeNull(); expect(storage.has('company-onboarding')).toBe(false) })
})
