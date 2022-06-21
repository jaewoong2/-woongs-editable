import { css } from '@emotion/react'
import styled from '@emotion/styled'
import React from 'react'
import { Divider } from '../../Atom/Divider'

const getNotUl = () => {
  return css`
    list-style: none;
    margin-block-start: 0;
    margin-block-end: 0;
    margin-inline-start: 0;
    margin-inline-end: 0;
    padding-inline-start: 0;
  `
}

const Container = styled.section`
  width: 100%;
`

const MenuContainer = styled.ul`
  ${getNotUl()};
  display: flex;
  min-width: 800px;
  width: 100%;

  .list {
    display: flex;
    margin-right: 10px;
    font-size: 0.87em;
    cursor: pointer;
  }

  @media screen and (max-width: 800px) {
    .list {
      font-size: 0.85em;
    }
  }
`

type ReactElements = React.ReactElement | React.ReactNode | JSX.Element

type Props = { menu?: ReactElements[] }

const Header: React.FC<Props> = ({ menu }) => {
  return (
    <Container>
      <MenuContainer>
        {menu?.map((node, index) => (
          <li className="list" key={'header-' + index}>
            {node}
          </li>
        ))}
      </MenuContainer>
      <Divider size="normal" />
    </Container>
  )
}

export { Header }
