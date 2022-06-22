import { css, keyframes } from '@emotion/react'
import styled from '@emotion/styled'
import React, { useEffect, useRef, useState } from 'react'
import useMounted from '../../../hooks/useMounted'

type Props = {
  width?: number
  height?: number
  hiding?: boolean
  children?: React.ReactNode
  distance?: number
  position?: 'top' | 'bottom'
  backgroundColor?: string
  delay?: number
}

type ToastProps = {
  width: number
  height: number
  hiding: boolean
  children: React.ReactNode
  distance: number
  position: 'top' | 'bottom'
  delay: number
}

type MessageProps = {
  backgroundColor: string
}

const getPosition = (position: Props['position']) => {
  switch (position) {
    case 'bottom':
    case 'top':
      return 'left'
  }
}

const popup = (postion: Props['position'], distance: number, height: number) => keyframes`
    0% {
      ${`${postion}: -${distance + height}px`}
    }

    50% {
      ${`${postion}: ${distance + 8}px`}
    }

    100% {
      ${`${postion}: ${distance}px`}
    }
`

const popdown = (postion: Props['position'], distance: number, height: number) => keyframes`
    50% {
      ${`${postion}: ${distance}px`}
    }
    100% {
      ${`${postion}: -${distance + height}px`}
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
  width: ${({ width }) => width}px;
  min-height: 40px;
  display: flex;
  position: absolute;
  ${({ position, distance }) => `${position}: ${distance}px`};
  align-items: center;
  ${({ position }) => getPosition(position)}: 50%;
  transform: translate(-50%, 0);
  animation: ${({ position, distance, height }) => popup(position, distance, height)}
    ${({ delay }) => (delay ? delay / 4 : 250)}ms ease-out;

  ${({ hiding, delay, position, distance, height }) =>
    hiding &&
    css`
      animation: ${popdown(position, distance, height)} ${delay / 2}ms;
    `}
`

const Message = styled.div<MessageProps>`
  border-radius: 8px;
  display: flex;
  width: 100%;
  background-color: ${({ backgroundColor }) => backgroundColor};
  ${getTypoStyle()};
`

const ToastMessage: React.FC<Props> = ({
  children,
  hiding,
  distance,
  delay = 2000,
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
      height={height ?? 0}
      distance={distance ?? 64}
      delay={delay}
      hiding={hiding ?? false}
      width={width}
      position={position}
    >
      <Message backgroundColor={backgroundColor}>{children}</Message>
    </Toast>
  )
}

export { ToastMessage }
