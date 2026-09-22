export interface Plan { id: string; name: string; price: string; description: string; features: string[] }
export async function listPlans(): Promise<Plan[]> {
  const response = await fetch('/api/v1/plans')
  if (!response.ok) throw new Error('Não foi possível carregar os planos.')
  return response.json() as Promise<Plan[]>
}
