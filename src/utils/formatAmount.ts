export const formatAmount = (amount: number): string => {
  const sign = amount > 0 ? '+' : '-'
  const absAmount = Math.abs(amount)
  const formatted = absAmount.toLocaleString('ru-RU')
  return `${sign} ${formatted} ₽`
}