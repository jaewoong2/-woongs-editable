import { useContext, useEffect } from 'react'
import { ToastActionContext } from '../context/ToastProvider'

export type ToastOptionType = {
  duration?: number
  position?: 'top' | 'bottom'
  subPosition?: 'center' | 'left' | 'right'
  backgroundColor?: string
  distance?: number
  width?: number
  color?: 'black' | 'white'
  className?: string
  borderRadius?: number
}

export const useToast = (message?: string, options?: ToastOptionType) => {
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
