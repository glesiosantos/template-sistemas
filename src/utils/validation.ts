export function digits(value: string) { return value.replace(/\D/g, '') }
export function isEmail(value: string) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()) }
export function isWhatsapp(value: string) { const number = digits(value); return number.length === 10 || number.length === 11 }
export function maskWhatsapp(value: string) {
  const number = digits(value).slice(0, 11)
  if (number.length <= 2) return number
  if (number.length <= 7) return `(${number.slice(0, 2)}) ${number.slice(2)}`
  return `(${number.slice(0, 2)}) ${number.slice(2, number.length === 11 ? 7 : 6)}-${number.slice(number.length === 11 ? 7 : 6)}`
}
export function maskCep(value: string) { const number = digits(value).slice(0, 8); return number.length > 5 ? `${number.slice(0, 5)}-${number.slice(5)}` : number }
export function maskCpf(value: string) { const number = digits(value).slice(0, 11); return number.replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d{1,2})$/, '$1-$2') }
export function maskCnpj(value: string) { const number = digits(value).slice(0, 14); return number.replace(/(\d{2})(\d)/, '$1.$2').replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d)/, '$1/$2').replace(/(\d{4})(\d{1,2})$/, '$1-$2') }
function checkDigit(source: string, weights: number[]) { const sum = source.split('').reduce((total, digit, index) => total + Number(digit) * weights[index], 0); const remainder = sum % 11; return remainder < 2 ? 0 : 11 - remainder }
export function isCpf(value: string) {
  const number = digits(value)
  if (number.length !== 11 || /^([0-9])\1+$/.test(number)) return false
  const first = checkDigit(number.slice(0, 9), [10, 9, 8, 7, 6, 5, 4, 3, 2])
  const second = checkDigit(number.slice(0, 9) + first, [11, 10, 9, 8, 7, 6, 5, 4, 3, 2])
  return number.endsWith(`${first}${second}`)
}
export function isCnpj(value: string) {
  const number = digits(value)
  if (number.length !== 14 || /^([0-9])\1+$/.test(number)) return false
  const first = checkDigit(number.slice(0, 12), [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2])
  const second = checkDigit(number.slice(0, 12) + first, [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2])
  return number.endsWith(`${first}${second}`)
}
