import { useCallback, useMemo, useState } from 'react'

interface UseToggleResponse {
  value: boolean
  toggle: () => void
  on: () => void
  off: () => void
  open: () => void
  close: () => void
  doAndClose: (callback: () => void | Promise<void>) => () => void
  doAndOpen: (callback: () => void | Promise<void>) => () => void
}

export const useToggle = (initialValue = false): UseToggleResponse => {
  const [value, setValue] = useState(initialValue)
  const open = useCallback(() => setValue(true), [])
  const close = useCallback(() => setValue(false), [])
  const toggle = useCallback(() => setValue((p) => !p), [])
  const doAndSet = useCallback(
    (value: boolean) => (callback: () => void | Promise<void>) => () => {
      const result = callback()

      if (result instanceof Promise) {
        result.finally(() => {
          setValue(value)
        })

        return
      }

      setValue(value)
    },
    []
  )

  const hook = useMemo(
    () => ({
      value,
      toggle,
      open,
      close,
      on: open,
      off: close,
      doAndClose: doAndSet(false),
      doAndOpen: doAndSet(true),
    }),
    [value, toggle, open, close, doAndSet]
  )

  return hook
}
