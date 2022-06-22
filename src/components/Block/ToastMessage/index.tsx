import { css, keyframes } from '@emotion/react'
import styled from '@emotion/styled'
import React, { useEffect, useRef, useState } from 'react'
import useMounted from '../../../hooks/useMounted'

type Props = {
  width?: number
  height?: number
  hiding?: boolean
  children?: React.ReactNode | string
  distance?: number
  position?: 'top' | 'bottom'
  color?: 'white' | 'black'
  subPosition?: 'left' | 'right' | 'center'
  borderRadius?: number
  backgroundColor?: string
  duration?: number
  className?: string
}

type ToastProps = {
  width: number
  color?: 'white' | 'black'
  height: number
  hiding: boolean
  children: React.ReactNode
  distance: number
  subPosition: 'left' | 'right' | 'center'
  position: 'top' | 'bottom'
  duration: number
}

type MessageProps = {
  backgroundColor: string
  borderRadius: number
}

const getSubPositionStyle = (subPosition: Props['subPosition']) => {
  if (subPosition === 'center') {
    return css`
      left: 50%;
      transform: translate(-50%, 0);
    `
  }
  if (subPosition === 'left') {
    return css`
      left: 10px;
    `
  }
  if (subPosition === 'right') {
    return css`
      right: 10px;
    `
  }
}

const fadeIn = (postion: Props['position'], distance: number, height: number) => keyframes`
    0% {
      ${`${postion}: -${distance + height}px`}
    }

    50% {
      ${`${postion}: ${distance + 8}px`}
    }

    100% {
      ${`${postion}: ${distance}px`}
    }

    from {
      opacity: 0;
    }

    to {
      opacity: 1;
    }
`

const fadeOut = (postion: Props['position'], distance: number, height: number) => keyframes`
    50% {
      ${`${postion}: ${distance}px`}
    }

    100% {
      ${`${postion}: -${distance + height}px`}
    }

    50% {
      opacity: 0.5;
    }

    to {
      opacity: 0;
    }
`

const getTypoStyle = () => {
  return css`
    padding: 16px 24px;
    font-size: 14px;
    font-weight: 400;
    line-height: 1.6;
    letter-spacing: 0px;
    text-align: left;
    justify-content: center;
  `
}

const Toast = styled.div<ToastProps>`
  z-index: 9999;
  width: ${({ width }) => width}px;
  min-height: 40px;
  display: flex;
  position: absolute;
  align-items: center;
  color: ${({ color }) => color};
  ${({ position, distance }) => `${position}: ${distance}px`};
  ${({ subPosition }) => getSubPositionStyle(subPosition)};
  animation: ${({ position, distance, height }) => fadeIn(position, distance, height)}
    ${({ duration }) => (duration ? duration / 4 : 250)}ms ease-out;
  ${({ hiding, duration, position, distance, height }) =>
    hiding &&
    css`
      animation: ${fadeOut(position, distance, height)} ${duration / 2}ms ease-in;
    `}
`

const Message = styled.div<MessageProps>`
  border-radius: ${({ borderRadius }) => borderRadius}px;
  display: flex;
  width: 100%;
  background-color: ${({ backgroundColor }) => backgroundColor};
  ${getTypoStyle()};
`

const ToastMessage: React.FC<Props> = ({
  children,
  className,
  hiding,
  distance,
  color,
  borderRadius = 8,
  subPosition = 'center',
  duration = 2000,
  backgroundColor = '#777777',
  width = 400,
  position = 'bottom',
}) => {
  const mounted = useMounted()
  const ref = useRef<HTMLDivElement>(null)
  const [height, setHeight] = useState<number | undefined>(0)

  useEffect(() => {
    setHeight(ref.current?.clientHeight)
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
      height={height ?? 0}
      distance={distance ?? 64}
      duration={duration}
      hiding={hiding ?? false}
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
