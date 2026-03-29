import { useCallback, useState } from 'react'
import { OWNER_PASSWORD } from '../config/owner'

function isLocalhost() {
  if (typeof window === 'undefined') return false
  return /^localhost$|^127\.0\.0\.1$/.test(window.location.hostname)
}

export function useOwnerMode() {
  const [ownerMode] = useState(() => {
    if (typeof window === 'undefined') return false
    return isLocalhost() || sessionStorage.getItem('portfolioOwner') === '1'
  })

  const toggleOwnerMode = useCallback(() => {
    if (ownerMode) {
      sessionStorage.removeItem('portfolioOwner')
      window.location.reload()
      return
    }
    if (isLocalhost()) {
      sessionStorage.setItem('portfolioOwner', '1')
      window.location.reload()
      return
    }
    const pw = window.prompt('비밀번호를 입력하세요.')
    if (pw === OWNER_PASSWORD) {
      sessionStorage.setItem('portfolioOwner', '1')
      window.location.reload()
    } else if (pw !== null) {
      window.alert('비밀번호가 올바르지 않습니다.')
    }
  }, [ownerMode])

  return { ownerMode, toggleOwnerMode }
}
