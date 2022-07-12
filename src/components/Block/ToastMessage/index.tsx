import React, { useEffect, useRef, useState } from 'react'
import useMounted from '../../../hooks/useMounted'
import { Message, Toast } from './ToastMessage.styles'

type ToastMessageProps = {
  children?: React.ReactNode | string
  height?: number
  width: number
  hiding: boolean
  distance: number
  position: 'top' | 'bottom'
  color: 'white' | 'black'
  subPosition: 'left' | 'right' | 'center'
  type?: 'success' | 'error' | 'warn' | 'normal'
  borderRadius: number
  backgroundColor: string
  duration: number
  className: string
  setHide: () => void
  setIsHiding: (bool: boolean) => void
}

const ToastMessage: React.FC<ToastMessageProps> = ({
  children,
  className,
  hiding,
  distance,
  color,
  backgroundColor,
  borderRadius,
  subPosition,
  duration,
  width,
  position,
  setHide,
  type,
  setIsHiding,
}) => {
  const mounted = useMounted()
  const ref = useRef<HTMLDivElement>(null)
  const [height, setHeight] = useState<number>(0)

  useEffect(() => {
    setHeight(ref.current?.clientHeight ?? 0)
  }, [ref.current])

  useEffect(() => {
    let hideTimer: null | NodeJS.Timeout = null
    const hidingTimer = setTimeout(() => {
      setIsHiding(true)
      hideTimer = setTimeout(() => {
        setHide()
      }, 500)
    }, duration)

    return () => {
      clearTimeout(hidingTimer)
      if (hideTimer) {
        clearTimeout(hideTimer)
      }
    }
  }, [duration])

  const ariaLive = type === 'error' || 'warn' ? 'assertive' : 'polite'

  if (!mounted) {
    return <></>
  }

  return (
    <Toast
      role="alert"
      ref={ref}
      color={color}
      className={className}
      subPosition={subPosition}
      height={height}
      distance={distance}
      duration={duration}
      hiding={hiding}
      width={width}
      position={position}
      aria-live={ariaLive}
    >
      <Message type={type} borderRadius={borderRadius} backgroundColor={backgroundColor}>
        {children}
      </Message>
    </Toast>
  )
}

export { ToastMessage }
