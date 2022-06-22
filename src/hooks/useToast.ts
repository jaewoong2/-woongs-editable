import { useContext, useEffect } from 'react'
import { ToastActionContext } from '../context/ToastProvider'

export type ToastOptionType = {
  delay?: number
  position?: 'top' | 'bottom'
  distance?: number
  width?: number
}

export const useToast = (message?: string, options?: ToastOptionType) => {
  const { setMessage, setDelay, setPosition, setDistance, setWidth, show, hide } = useContext(ToastActionContext)

  useEffect(() => {
    setMessage(message)
    setDelay(options?.delay)
    setPosition(options?.position ?? 'bottom')
    setDistance(options?.distance)
    setWidth(options?.width)
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
