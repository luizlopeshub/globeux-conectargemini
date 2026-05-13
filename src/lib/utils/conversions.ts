export const UNITS = {
  mass: [
    { id: 'kg', label: 'kg' },
    { id: 'g', label: 'g' },
    { id: 'lb', label: 'lb' },
    { id: 'oz', label: 'oz' },
  ],
  length: [
    { id: 'm', label: 'm' },
    { id: 'cm', label: 'cm' },
    { id: 'mm', label: 'mm' },
    { id: 'km', label: 'km' },
    { id: 'in', label: 'in' },
    { id: 'ft', label: 'ft' },
    { id: 'yd', label: 'yd' },
    { id: 'mi', label: 'mi' },
  ],
  temp: [
    { id: 'C', label: '°C' },
    { id: 'F', label: '°F' },
    { id: 'K', label: 'K' },
  ],
  volume: [
    { id: 'm3', label: 'm³ (Metros Cúbicos)' },
    { id: 'l', label: 'L' },
    { id: 'ml', label: 'ml' },
    { id: 'gal', label: 'gal' },
  ],
}

const factors: Record<string, Record<string, number>> = {
  mass: { kg: 1, g: 0.001, lb: 0.453592, oz: 0.0283495 },
  length: { m: 1, cm: 0.01, mm: 0.001, km: 1000, in: 0.0254, ft: 0.3048, yd: 0.9144, mi: 1609.34 },
  volume: { m3: 1, l: 0.001, ml: 0.000001, gal: 0.00378541 },
}

export function convertUnit(
  value: number,
  category: keyof typeof UNITS,
  source: string,
  target: string,
): number {
  if (source === target) return value

  if (category === 'temp') {
    let c = value
    if (source === 'F') c = ((value - 32) * 5) / 9
    if (source === 'K') c = value - 273.15

    if (target === 'C') return c
    if (target === 'F') return (c * 9) / 5 + 32
    if (target === 'K') return c + 273.15
  }

  const catFactors = factors[category]
  if (!catFactors || !catFactors[source] || !catFactors[target]) return value

  const inBase = value * catFactors[source]
  return inBase / catFactors[target]
}
