import React, { useCallback, useEffect, useRef, useState } from 'react'
import useMounted from '../../../hooks/useMounted'
import { Button, Message, Toast } from './ToastMessage.styles'

type ToastMessageProps = {
  children?: React.ReactNode | string
  height?: number
  width: number
  isFadeOutStart: boolean
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
  setIsFadeOutStart: (bool: boolean) => void
}

const ToastMessage: React.FC<ToastMessageProps> = ({
  children,
  className,
  isFadeOutStart,
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
  setIsFadeOutStart,
}) => {
  const mounted = useMounted()
  const ref = useRef<HTMLDivElement>(null)

  const [height, setHeight] = useState<number>(0)
  const [ariaLive, setAriaLive] = useState<'polite' | 'assertive' | 'off'>(
    type === 'error' || 'warn' ? 'assertive' : 'polite',
  )

  const handleFadeOut = useCallback(() => {
    let hideTimer: null | NodeJS.Timeout = null

    const fadeOutTimer = setTimeout(() => {
      setIsFadeOutStart(true)
      setAriaLive('off')
      hideTimer = setTimeout(() => {
        setHide()
      }, 500)
    }, duration)

    return () => {
      clearTimeout(fadeOutTimer)
      if (hideTimer) {
        clearTimeout(hideTimer)
      }
    }
  }, [duration])

  useEffect(() => {
    setHeight(ref.current?.clientHeight ?? 0)
  }, [ref.current])

  useEffect(() => {
    return handleFadeOut()
  }, [handleFadeOut])

  if (!mounted) {
    return <></>
  }

  return (
    <Toast
      tabIndex={0}
      role="alert"
      ref={ref}
      color={color}
      className={className}
      subPosition={subPosition}
      height={height}
      distance={distance}
      duration={duration}
      isFadeOutStart={isFadeOutStart}
      width={width}
      position={position}
      aria-live={ariaLive}
    >
      <Message tabIndex={0} type={type} borderRadius={borderRadius} backgroundColor={backgroundColor}>
        {children}
      </Message>
      <Button onClick={setHide} type="button" aria-label="close button">
        &times;
      </Button>
    </Toast>
  )
}

export { ToastMessage }
