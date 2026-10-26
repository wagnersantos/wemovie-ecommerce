import { describe, it, expect } from 'vitest'
import { formatCurrencyBRL } from '@/lib/formatCurrencyBRL'

describe('formatCurrencyBRL', () => {
  it('formats a standard price', () => {
    const result = formatCurrencyBRL(29.99)
    expect(result).toMatch(/R\$\s?29,99/)
  })

  it('formats zero', () => {
    const result = formatCurrencyBRL(0)
    expect(result).toMatch(/R\$\s?0,00/)
  })

  it('returns R$ 0,00 for null', () => {
    const result = formatCurrencyBRL(null as unknown as number)
    expect(result).toMatch(/R\$\s?0,00/)
  })

  it('returns R$ 0,00 for undefined', () => {
    const result = formatCurrencyBRL(undefined as unknown as number)
    expect(result).toMatch(/R\$\s?0,00/)
  })

  it('returns R$ 0,00 for NaN string', () => {
    const result = formatCurrencyBRL('abc' as unknown as number)
    expect(result).toMatch(/R\$\s?0,00/)
  })

  it('formats without symbol when withSymbol is false', () => {
    const result = formatCurrencyBRL(29.99, false)
    expect(result).not.toContain('R$')
    expect(result).toContain('29,99')
  })

  it('formats a string number correctly', () => {
    const result = formatCurrencyBRL('49.90')
    expect(result).toMatch(/R\$\s?49,90/)
  })

  it('formats large numbers with thousand separator', () => {
    const result = formatCurrencyBRL(1234.56)
    expect(result).toMatch(/1[.]?234,56/)
  })
})
