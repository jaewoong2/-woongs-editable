import { useCallback, useContext, useEffect } from 'react'
import { ToastActionContext } from '../context/ToastProvider'

export type ToastOptionType = {
  // ToastMessage Duration (dfault: 2000ms)
  duration?: number
  // ToastMessage position (default: bottom)
  position?: 'top' | 'bottom'
  // ToastMessage subPosition (default: center)
  subPosition?: 'center' | 'left' | 'right'
  // ToastMessage background-color (default: #71A8EC)
  backgroundColor?: string
  // ToastMessage distance (px) from position (default: 32px)
  distance?: number
  // ToastMessage width (default: 200px)
  width?: number
  // ToastMessage color ["black(default)" || "white"]
  color?: 'black' | 'white'
  // ToastMessage className
  className?: string
  // ToastMessage border-radius
  borderRadius?: number
  // ToastMessage Type [defulat: normal]
  type: 'success' | 'error' | 'warn' | 'normal'
}

export const useToast = (message: string, options?: ToastOptionType) => {
  const {
    setMessage,
    setDuration,
    setPosition,
    setDistance,
    setWidth,
    setSubPosition,
    setClassName,
    setBackgroundColor,
    setColor,
    setBorderRadius,
    setType,
    show,
    hide,
  } = useContext(ToastActionContext)

  const onRest = useCallback(() => {
    setMessage(message)
    setDuration(options?.duration)
    setDistance(options?.distance)
    setWidth(options?.width)
    setSubPosition(options?.subPosition ?? 'center')
    setClassName(options?.className ?? '')
    setBackgroundColor(options?.backgroundColor ?? '#71a8ec')
    setColor(options?.color ?? 'black')
    setBorderRadius(options?.borderRadius ?? 4)
    setPosition(options?.position ?? 'bottom')
    setType(options?.type ?? 'normal')
  }, [])

  useEffect(() => {
    onRest()
  }, [])

  const onShowCallback = useCallback((callback: () => void) => {
    hide()
    callback()
    show()
  }, [])

  const onShow = useCallback(() => {
    onRest()
    show()
    return {
      top: () => onShowCallback(() => setPosition('top')),
      success: () => onShowCallback(() => setType('success')),
      error: () => onShowCallback(() => setType('error')),
      warn: () => onShowCallback(() => setType('warn')),
      normal: () => onShowCallback(() => setType('normal')),
    }
  }, [])

  return { show: onShow, hide }
}
