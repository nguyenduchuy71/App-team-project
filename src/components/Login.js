import React from 'react'
import styled from 'styled-components'
import { Button } from 'react-bootstrap'
import { auth, provider } from '../firebase'
import { useHistory } from 'react-router-dom'
function Login () {
  const history = useHistory()
  const signIn = e => {
    e.preventDefault()
    auth.signInWithPopup(provider).catch(error => {
      alert(error.message)
    })
    history.push('/')
  }
  return (
    <LoginContainer>
      <LoginInnerContainer>
        <img
          src='https://huy-cvportfolio.netlify.app/images/logo.png'
          alt='login_img'
        />
        <h1>Welcome to HUY's web</h1>
        <Button variant='primary' onClick={signIn}>
          Sign in with Google
        </Button>
      </LoginInnerContainer>
    </LoginContainer>
  )
}

export default Login
const LoginContainer = styled.div`
  background-color: #f8f8f8;
  height: 100vh;
  display: grid;
  place-items: center;
`
const LoginInnerContainer = styled.div`
  padding: 100px;
  text-align: center;
  border-color: white;
  border-radius: 10px;
  > img {
    object-fit: contain;
    height: 200px;
    margin-bottom: 40px;
    border-radius: 50%;
  }
  > button {
    margin-top: 50px;
    text-transform: inherit !important;
    background-color: #0a8d48 !important;
    color: white;
  }
`
