export const calculateInsulin = (
  targetGlucose: number,
  glucose: number,
  carbs: number,
  carbRatio: number,
  sensitivity: number
) => {
  if (carbRatio === 0 || sensitivity === 0) {
    throw new Error('Carb ratio and sensitivity cannot be 0')
  }
  const insulin = carbs / carbRatio + (glucose - targetGlucose) / sensitivity
  const roundedInsulin = Math.round(insulin / 0.5) * 0.5
  return roundedInsulin < 0 ? 0 : roundedInsulin
}
