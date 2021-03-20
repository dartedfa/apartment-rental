export function isLatitude(num) {
  return isFinite(num) && Math.abs(num) <= 90
}

export function isLongitude(num) {
  return isFinite(num) && Math.abs(num) <= 180
}
