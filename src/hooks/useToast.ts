import { useContext, useEffect } from 'react'
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
  // ToastMessage distance (px) from position (default: 64px)
  distance?: number
  // ToastMessage width (default: 400px)
  width?: number
  // ToastMessage color ["black(default)" || "white"]
  color?: 'black' | 'white'
  // ToastMessage className
  className?: string
  // ToastMessage border-radius
  borderRadius?: number
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
    show,
    hide,
  } = useContext(ToastActionContext)

  useEffect(() => {
    setMessage(message)
    setDuration(options?.duration)
    setPosition(options?.position ?? 'bottom')
    setDistance(options?.distance)
    setWidth(options?.width)
    setSubPosition(options?.subPosition ?? 'center')
    setClassName(options?.className ?? '')
    setBackgroundColor(options?.backgroundColor ?? '#71a8ec')
    setColor(options?.color ?? 'black')
    setBorderRadius(options?.borderRadius ?? 8)
  }, [])

  const onShow = () => {
    show()
    return {
      top: () => {
        hide()
        setPosition('top')
        show()
      },
    }
  }

  return { show: onShow, hide }
}
