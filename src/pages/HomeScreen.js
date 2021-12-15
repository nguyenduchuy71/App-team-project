import React, { useState, useEffect } from 'react'
import { Container, Row, Button, Spinner, Col } from 'react-bootstrap'
import styled from 'styled-components'
import Modal from '../components/Modal'
import { useDispatch, useSelector } from 'react-redux'
import { getProjects } from '../redux/projectSlice'
import CardContent from '../components/CardContent'

function HomeScreen () {
  const [show, setShow] = useState(false)
  const dispatch = useDispatch()
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  const { isLoading, projects } = useSelector(state => state.project)
  useEffect(() => {
    dispatch(getProjects())
  }, [dispatch])
  console.log('Home screen')
  return (
    <Container style={{ padding: '1rem 0' }}>
      <Row className='justify-content-center'>
        <ButtonContainer>
          <Button variant='primary' onClick={handleShow}>
            Create new project
          </Button>
        </ButtonContainer>
        <Modal
          show={show}
          handleClose={handleClose}
          setShow={setShow}
          type='newproject'
        />
      </Row>
      {isLoading ? (
        <SpinnerContainer>
          <Spinner animation='border' variant='primary' />
        </SpinnerContainer>
      ) : (
        <Row className='justify-content-stretch'>
          {projects?.map(project => (
            <Col key={project.projectId} xs={12} md={4} lg={3}>
              <CardContent project={project} />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  )
}

export default HomeScreen
const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`
const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
`
