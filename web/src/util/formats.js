export const { format: formatMoney } = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

export function getFormatMoney() {
  return formatMoney(0)
    .replace(/\d/g, '')
    .replace('.', ' ')
    .replace(',', ' ')
    .trim();
}
