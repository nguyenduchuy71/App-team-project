import React from 'react'
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem
} from 'cdbreact'
import { auth } from '../firebase'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
const Sidebar = () => {
  const handleSignOut = () => {
    auth.signOut()
  }
  return (
    <div
      style={{
        display: 'flex',
        height: '100vh',
        overflow: 'scroll initial'
      }}
    >
      <CDBSidebar textColor='#fff' backgroundColor='#333'>
        <CDBSidebarHeader>
          <LogoContainer>
            <Logo
              src='https://huy-cvportfolio.netlify.app/images/logo.png'
              alt='logo'
            />
          </LogoContainer>
        </CDBSidebarHeader>
        <CDBSidebarContent className='sidebar-content'>
          <CDBSidebarMenu>
            <NavLink exact to='/' activeClassName='activeClicked'>
              <CDBSidebarMenuItem icon='columns'>Projects</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to='/tables' activeClassName='activeClicked'>
              <CDBSidebarMenuItem icon='table'>Note</CDBSidebarMenuItem>
            </NavLink>
          </CDBSidebarMenu>
        </CDBSidebarContent>
        <CDBSidebarFooter style={{ textAlign: 'center' }}>
          <SideBarFooter onClick={handleSignOut}>
            <ion-icon name='log-out'></ion-icon>
            <span>Logout</span>
          </SideBarFooter>
        </CDBSidebarFooter>
      </CDBSidebar>
    </div>
  )
}
export default Sidebar
const LogoContainer = styled.div`
  display: flex;
`
const Logo = styled.img`
  width: 3.8rem;
  height: 3.8rem;
  border-radius: 50%;
  object-fit: cover;
  object-position: center;
`

const SideBarFooter = styled.div`
  display: flex;
  padding: 0 1rem;
  width: max-content;
  align-items: center;
  cursor: pointer;
  ion-icon {
    height: 2rem;
    width: 2rem;
    margin-right: 0.2rem;
  }
  &:hover {
    opacity: 0.8;
  }
`
