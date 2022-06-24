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
  borderRadius: number
  backgroundColor: string
  duration: number
  className: string
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
}) => {
  const mounted = useMounted()
  const ref = useRef<HTMLDivElement>(null)
  const [height, setHeight] = useState<number>(0)

  useEffect(() => {
    setHeight(ref.current?.clientHeight ?? 0)
  }, [height])

  if (!mounted) {
    return <></>
  }

  return (
    <Toast
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
    >
      <Message borderRadius={borderRadius} backgroundColor={backgroundColor}>
        {children}
      </Message>
    </Toast>
  )
}

export { ToastMessage }
