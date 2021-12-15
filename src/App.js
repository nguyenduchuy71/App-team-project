import React from 'react'
import './App.css'
import Sidebar from './components/Sidebar'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from './firebase'
import Login from './components/Login'
import Spinner from 'react-spinkit'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import styled from 'styled-components'
import HomeScreen from './pages/HomeScreen'
import ProjectDetailsScreen from './pages/ProjectDetailsScreen'

function App () {
  const [user, loading] = useAuthState(auth)
  if (loading) {
    return (
      <AppLoading>
        <AppLoadingContents>
          <Spinner name='ball-spin-fade-loader' color='blue' fadeIn='none' />
        </AppLoadingContents>
      </AppLoading>
    )
  }
  return (
    <div className='App'>
      <Router>
        {!user ? (
          <Login />
        ) : (
          <Container>
            <Sidebar />
            <div className='container'>
              <Switch>
                <Route path='/project/:id' component={ProjectDetailsScreen} />
                <Route path='/' component={HomeScreen} exact />
              </Switch>
            </div>
          </Container>
        )}
      </Router>
    </div>
  )
}

export default App
const AppLoading = styled.div`
  display: grid;
  place-items: center;
  height: 100vh;
  width: 100%;
`
const AppLoadingContents = styled.div`
  text-align: center;
  padding-bottom: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
const Container = styled.div`
  display: flex;
  .container {
    flex: 1;
  }
`
