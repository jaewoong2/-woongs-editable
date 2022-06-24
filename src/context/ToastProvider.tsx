import React, { createContext, useCallback, useMemo, useState } from 'react'
import { ToastMessage } from '../components/Block/ToastMessage'

type Props = {
  children?: React.ReactNode
}

type SubPosition = 'center' | 'left' | 'right'
type Position = 'top' | 'bottom'

type ToastActionType = {
  // Show Toast Message which You can handle
  show: () => void
  // Hide Toast Message which You can handle
  hide: () => void | null
  // Set it`s border-radius
  setBorderRadius: (r: number) => void
  // Set it`s Message that is actually children in ToastMessage.tsx
  setMessage: (msg: string) => void
  // Set it`s background-color (default: #71A8EC)
  setBackgroundColor: (bg: string) => void
  // Set it`s duration
  setDuration: (ms?: number) => void
  // Set it`s Text Color ["black(default)" || "white"]
  setColor: (color: 'black' | 'white') => void
  // Set it`s Position ["bottom(default)" || "top"]
  setPosition: (position: Position) => void
  // Set it`s SubPosition ["center(default)" || "left" || "right" ]
  setSubPosition: (position: SubPosition) => void
  // Set it`s className
  setClassName: (className: string) => void
  // Set it`s Distance from Position
  setDistance: (distance?: number) => void
  // Set it`s Width
  setWidth: (px?: number) => void
}

const initalToastAction = {} as ToastActionType

export const ToastActionContext = createContext({ ...initalToastAction })

const ToastProvider: React.FC<Props> = ({ children }) => {
  const [isShow, setIsShow] = useState(false)
  const [isHiding, setIsHiding] = useState(false)
  const [message, setMessage] = useState('')
  const [duration, setDuration] = useState(1000)
  const [backgroundColor, setBackgroundColor] = useState('#71a8ec')
  const [color, setColor] = useState<'white' | 'black'>('black')
  const [position, setPosition] = useState<Position>('bottom')
  const [subPosition, setSubPosition] = useState<SubPosition>('center')
  const [distance, setDistance] = useState(64)
  const [width, setWidth] = useState(400)
  const [className, setClassName] = useState('')
  const [borderRadius, setBorderRadius] = useState(8)

  const setShow = useCallback(() => {
    if (!isHiding) {
      setIsShow(true)
    }
  }, [isHiding])

  const setHide = () => {
    setIsShow(false)
    setIsHiding(false)
  }

  const actions = useMemo(() => {
    return {
      show: setShow,
      hide: setHide,
      setMessage: (msg: string) => setMessage(msg),
      setBorderRadius: (radius: number) => setBorderRadius(radius),
      setDuration: (ms?: number) => setDuration(ms ?? 2000),
      setPosition: (pos: Position) => setPosition(pos),
      setBackgroundColor: (c: string) => setBackgroundColor(c),
      setColor: (c: 'white' | 'black') => setColor(c),
      setSubPosition: (pos: SubPosition) => setSubPosition(pos),
      setDistance: (px?: number) => setDistance(px ?? 64),
      setWidth: (px?: number) => setWidth(px ?? 400),
      setClassName: (name: string) => setClassName(name),
    }
  }, [])

  return (
    <ToastActionContext.Provider value={actions}>
      {children}
      {isShow && (
        <ToastMessage
          color={color}
          borderRadius={borderRadius}
          backgroundColor={backgroundColor}
          subPosition={subPosition}
          width={width}
          distance={distance}
          position={position}
          hiding={isHiding}
          duration={duration}
          className={className}
          setHide={setHide}
          setIsHiding={(bool: boolean) => setIsHiding(bool)}
        >
          {message}
        </ToastMessage>
      )}
    </ToastActionContext.Provider>
  )
}

export { ToastProvider }
