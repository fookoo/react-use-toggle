import { useCallback, useState } from 'react'

interface UseToggleResponse {
  value: boolean
  toggle: () => void
  on: () => void
  off: () => void
  open: () => void
  close: () => void
}

export const useToggle = (initialValue = false): UseToggleResponse => {
  const [value, setValue] = useState(initialValue)
  const open = useCallback(() => setValue(true), [])
  const close = useCallback(() => setValue(false), [])
  const toggle = useCallback(() => setValue((p) => !p), [])

  return {
    value,
    toggle,
    open,
    close,
    on: open,
    off: close,
  }
}
