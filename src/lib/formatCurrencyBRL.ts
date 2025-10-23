export function formatCurrencyBRL(value: number | string, withSymbol = true): string {
  if (value === null || value === undefined || isNaN(Number(value))) {
    return withSymbol ? "R$ 0,00" : "0,00"
  }

  const formatted = Number(value).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  })

  return withSymbol ? formatted : formatted.replace(/^R\$\s?/, "")
}
