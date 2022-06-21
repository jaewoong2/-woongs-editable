import styled from '@emotion/styled'
import React from 'react'

type Props = { size?: 'thin' | 'bold' | 'normal' }

const getBorderSize = (size: Props['size']) => {
  switch (size) {
    case 'thin':
      return `1px`
    case 'normal':
      return `2px`
    case 'bold':
      return '7px'
    default:
      return `2px`
  }
}

const DividerContainer = styled.hr<Props>`
  width: 100%;
  height: unset;
  border-width: 0px 0px ${({ size }) => getBorderSize(size)};
  border-radius: 8px;
  border-color: #f3f5f7;
`

const Divider: React.FC<Props> = ({ size }) => {
  return <DividerContainer size={size} />
}

export { Divider }
