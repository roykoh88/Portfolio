/**
 * 만 나이: 올해 생일이 아직 안 지났으면 1을 뺌 (브라우저 로컬 날짜 기준)
 * @param {number} year
 * @param {number} month 1–12
 * @param {number} day
 */
export function getManAge(year, month, day) {
  const now = new Date()
  let age = now.getFullYear() - year
  const hadBirthdayThisYear =
    now.getMonth() + 1 > month ||
    (now.getMonth() + 1 === month && now.getDate() >= day)
  if (!hadBirthdayThisYear) age -= 1
  return age
}
