import React from 'react'
import './Navbar.css'
import styled from 'styled-components'
import { Link } from "react-router-dom";

const Container = styled.div`
    background-color: grey;
    width: 100vw;
    height: 7vh;
    border-style: solid;
    border-width: 0.2vh;
    border-color: black;
`
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const Icon = styled.h1`
  writing-mode: vertical-rl;
  flex: 1;
`

const Title = styled.h1`
  flex: 1;
`

const Links = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const Empty = styled.div`
  flex: 3;
`

function Navbar() {
  return (
    <Container>
      <Wrapper>
        <Icon>
          漫画
        </Icon>
        <Title>
          Kata Manga
        </Title>
        <Links>
          <Link to="/home">Home</Link>
          <Link to="/mangas">Mangas</Link>
          <Link to="/API">API</Link>
        </Links>
        <Empty></Empty>
      </Wrapper>
    </Container>
  )
}

export default Navbar