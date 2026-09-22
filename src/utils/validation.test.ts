import { describe, expect, it } from 'vitest'
import { isCnpj, isCpf, isEmail, isWhatsapp } from './validation'

describe('onboarding document validation', () => {
  it('validates CPF and rejects repeated digits', () => { expect(isCpf('529.982.247-25')).toBe(true); expect(isCpf('111.111.111-11')).toBe(false) })
  it('validates CNPJ and rejects malformed documents', () => { expect(isCnpj('04.252.011/0001-10')).toBe(true); expect(isCnpj('04.252.011/0001-11')).toBe(false) })
  it('validates contact fields', () => { expect(isEmail('owner@example.com')).toBe(true); expect(isEmail('invalid')).toBe(false); expect(isWhatsapp('(11) 99999-9999')).toBe(true); expect(isWhatsapp('123')).toBe(false) })
})
