export interface AddressResult { street: string; neighborhood: string; city: string; state: string }
export async function lookupAddress(zipCode: string): Promise<AddressResult> {
  const response = await fetch(`/api/v1/address/${zipCode.replace(/\D/g, '')}`)
  if (!response.ok) throw new Error('Não foi possível consultar o CEP.')
  return response.json() as Promise<AddressResult>
}
