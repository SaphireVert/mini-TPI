import React from 'react'
import styled from 'styled-components'


const Container = styled.div`
    background-color: grey;
    width: 100vw;
    height: 3vh;
    border-style: solid;
    border-width: 0.2vh;
    border-color: black;
    position: fixed;
    bottom: 0;
`
function Footer() {
  return (
    <Container>
      KataManga - 
      
      Sources
    </Container>
  )
}

export default Footer