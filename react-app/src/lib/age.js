/** 만 나이 (생일이 지나기 전이면 1살 차감) */
export function getManAge(year, month, day) {
  const now = new Date()
  let age = now.getFullYear() - year
  const m = now.getMonth() + 1
  if (m < month || (m === month && now.getDate() < day)) {
    age -= 1
  }
  return age
}
