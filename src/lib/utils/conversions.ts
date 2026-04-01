export type UnitCategory = 'mass' | 'length' | 'temp'

export const UNITS: Record<UnitCategory, { id: string; label: string }[]> = {
  mass: [
    { id: 'mg', label: 'Miligramas (mg)' },
    { id: 'g', label: 'Gramas (g)' },
    { id: 'kg', label: 'Quilogramas (kg)' },
    { id: 'ton', label: 'Toneladas (ton)' },
    { id: 'lb', label: 'Libras (lb)' },
    { id: 'oz', label: 'Onças (oz)' },
  ],
  length: [
    { id: 'mm', label: 'Milímetros (mm)' },
    { id: 'cm', label: 'Centímetros (cm)' },
    { id: 'm', label: 'Metros (m)' },
    { id: 'km', label: 'Quilômetros (km)' },
    { id: 'in', label: 'Polegadas (in)' },
    { id: 'ft', label: 'Pés (ft)' },
  ],
  temp: [
    { id: 'C', label: 'Celsius (°C)' },
    { id: 'F', label: 'Fahrenheit (°F)' },
  ],
}

const MASS_FACTORS: Record<string, number> = {
  mg: 0.001,
  g: 1,
  kg: 1000,
  ton: 1000000,
  lb: 453.59237,
  oz: 28.34952,
}

const LENGTH_FACTORS: Record<string, number> = {
  mm: 0.001,
  cm: 0.01,
  m: 1,
  km: 1000,
  in: 0.0254,
  ft: 0.3048,
}

export function convertUnit(
  value: number,
  category: UnitCategory,
  from: string,
  to: string,
): number {
  if (value === undefined || value === null || isNaN(value) || from === to) return value

  if (category === 'mass') {
    const baseGrams = value * (MASS_FACTORS[from] || 1)
    return baseGrams / (MASS_FACTORS[to] || 1)
  }

  if (category === 'length') {
    const baseMeters = value * (LENGTH_FACTORS[from] || 1)
    return baseMeters / (LENGTH_FACTORS[to] || 1)
  }

  if (category === 'temp') {
    if (from === 'C' && to === 'F') return (value * 9) / 5 + 32
    if (from === 'F' && to === 'C') return ((value - 32) * 5) / 9
  }

  return value
}
