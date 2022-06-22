import React, { createContext, useCallback, useEffect, useMemo, useState } from 'react'
import { ToastMessage } from '../components/Block/ToastMessage'

type Props = {
  children?: React.ReactNode
}

type Position = 'top' | 'bottom'

type ToastActionType = {
  show: () => void
  hide: () => void | null
  setMessage: (msg?: string) => void
  setDelay: (ms?: number) => void
  setPosition: (position: Position) => void
  setDistance: (distance?: number) => void
  setWidth: (px?: number) => void
}

const initalToastAction = {} as ToastActionType

export const ToastActionContext = createContext({ ...initalToastAction })

const ToastProvider: React.FC<Props> = ({ children }) => {
  const [isShow, setIsShow] = useState(false)
  const [isHiding, setIsHiding] = useState(false)
  const [message, setMessage] = useState('')
  const [delay, setDelay] = useState(1000)
  const [position, setPosition] = useState<Position>('bottom')
  const [distance, setDistance] = useState(64)
  const [width, setWidth] = useState(400)

  const setShow = useCallback(() => {
    if (!isHiding) {
      setIsShow(true)
    }
  }, [isHiding])

  const setHide = () => {
    setIsShow(false)
    setIsHiding(false)
  }

  const handleMessage = (msg?: string) => {
    setMessage(msg ?? '')
  }

  useEffect(() => {
    if (isShow) {
      const hidingTimer = setTimeout(() => {
        setIsHiding(true)
      }, delay / 2)

      const hideTimer = setTimeout(() => {
        setHide()
      }, delay)

      return () => {
        clearTimeout(hidingTimer)
        clearTimeout(hideTimer)
      }
    }
  }, [delay, isShow])

  const actions = useMemo(() => {
    return {
      show: setShow,
      hide: setHide,
      setMessage: handleMessage,
      setDelay: (ms?: number) => setDelay(ms ?? 2000),
      setPosition: (pos: Position) => setPosition(pos),
      setDistance: (px?: number) => setDistance(px ?? 64),
      setWidth: (px?: number) => setWidth(px ?? 400),
    }
  }, [])

  return (
    <ToastActionContext.Provider value={actions}>
      {children}
      {isShow && (
        <ToastMessage width={width} distance={distance} position={position} delay={delay} hiding={isHiding}>
          {message}
        </ToastMessage>
      )}
    </ToastActionContext.Provider>
  )
}

export { ToastProvider }
