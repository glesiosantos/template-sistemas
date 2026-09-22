import type { CompanyOnboardingState } from '../stores/companyOnboarding'

const request = async <T>(path: string, body?: unknown): Promise<T> => {
  const response = await fetch(`/api/v1/company-onboarding${path}`, { method: body ? 'POST' : 'GET', headers: { 'Content-Type': 'application/json' }, body: body ? JSON.stringify(body) : undefined })
  if (!response.ok) throw new Error('Não foi possível comunicar com o servidor.')
  return response.json() as Promise<T>
}

export const companyOnboardingService = {
  start: (payload: Pick<CompanyOnboardingState, 'owner'>) => request('/start', payload),
  sendWhatsappOtp: () => request('/whatsapp/send', {}),
  verifyWhatsappOtp: (code: string) => request('/whatsapp/verify', { code }),
  sendEmailOtp: () => request('/email/send', {}),
  verifyEmailOtp: (code: string) => request('/email/verify', { code }),
  finish: (payload: CompanyOnboardingState) => request<{ id: string }>('/finish', payload),
}
