import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Navbar, Nav } from 'react-bootstrap'
import styled from 'styled-components'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../firebase'
import { Link } from 'react-router-dom'

function Header () {
  const [user] = useAuthState(auth)
  const handleSignOut = () => {
    auth.signOut()
  }
  return (
    <Navbar bg='primary' expand='lg'>
      <Container>
        <Navbar.Brand>
          <Logo src='./assets/logo.png' alt='logo' loading='lazy' />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav>
            <Nav.Link>
              <Link
                style={{
                  color: 'white',
                  fontSize: '1.1rem',
                  textDecoration: 'none'
                }}
                to='/'
              >
                Home
              </Link>
            </Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link style={{ color: 'white', fontSize: '1.1rem' }}>
              Note
            </Nav.Link>
          </Nav>
          {user?.displayName && (
            <RighContent>
              <Nav>
                <HeaderAvartar
                  onClick={handleSignOut}
                  alt={user?.displayName}
                  src={user?.photoURL || './assets/emptyimg.png'}
                />
              </Nav>
              <Nav>
                <Nav.Link
                  style={{ color: 'white', fontSize: '1.1rem' }}
                  onClick={() => auth.signOut()}
                >
                  Logout
                </Nav.Link>
              </Nav>
            </RighContent>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header
const Logo = styled.img`
  width: 3.8rem;
  height: 3.8rem;
  border-radius: 50%;
  object-fit: cover;
  object-position: center;
`
const RighContent = styled.div`
  position: absolute;
  display: flex;
  align-items: flex-end;
  right: 6rem;
  color: white;
  @media (max-width: 768px) {
    position: unset;
  }
`
const HeaderAvartar = styled.img`
  cursor: pointer;
  height: 2.4rem;
  width: 2.4rem;
  margin-right: 0.2rem;
  border-radius: 50%;
  :hover {
    opacity: 0.8;
  }
`
