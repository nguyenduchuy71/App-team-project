import React, { useState } from 'react'
import { Card, Button, Toast } from 'react-bootstrap'
import styled from 'styled-components'
import Modal from '../components/Modal'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../firebase'
import { deleteProject } from '../redux/projectSlice'
import { useDispatch } from 'react-redux'
function CardContent ({ project }) {
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  const [user] = useAuthState(auth)
  const toggleShowA = () => setShowA(!showA)
  const [showA, setShowA] = useState(false)
  const dispatch = useDispatch()
  const handleDelete = () => {
    dispatch(deleteProject(project.projectId))
  }
  return (
    <Container>
      <Card>
        <TopContainer>
          <ImageContainer>
            <Image src={project?.userAvatar} alt='card-img' />
          </ImageContainer>
          <IconContainer>
            <Icon>
              {user.displayName === project?.user &&
                (showA ? (
                  <ion-icon
                    onClick={toggleShowA}
                    name='close-circle-outline'
                  ></ion-icon>
                ) : (
                  <ion-icon
                    onClick={toggleShowA}
                    name='menu-outline'
                  ></ion-icon>
                ))}
            </Icon>
            <Toast
              style={{ width: '6rem', height: '4.6rem' }}
              show={showA}
              onClose={toggleShowA}
              className='mt-0.5'
              animation={false}
            >
              <Toast.Body>
                <ToastIcon onClick={handleDelete}>
                  <ion-icon name='trash-outline'></ion-icon>
                  <span>Delete</span>
                </ToastIcon>
                <ToastIcon>
                  <ion-icon name='hammer-outline'></ion-icon>
                  <span>Update</span>
                </ToastIcon>
              </Toast.Body>
            </Toast>
          </IconContainer>
        </TopContainer>
        <Card.Body>
          <Card.Title>{project?.name}</Card.Title>
          <Button
            onClick={handleShow}
            variant='primary'
            style={{ width: '120px' }}
          >
            Join
          </Button>
        </Card.Body>
      </Card>
      <Modal
        show={show}
        handleClose={handleClose}
        setShow={setShow}
        project={project}
        type='joinproject'
      />
    </Container>
  )
}

export default CardContent
const Container = styled.div`
  width: 100%;
  margin-top: 1rem;
  text-align: center;
`
const TopContainer = styled.div`
  position: relative;
`
const IconContainer = styled.div`
  position: absolute;
  top: 0.2rem;
  right: 0.2rem;
  ion-icon {
    font-size: 1.2rem;
  }
`
const Icon = styled.div`
  position: absolute;
  right: 0.2rem;
  top: 0.1rem;
  ion-icon {
    cursor: pointer;
    font-size: 1.4rem;
  }
`
const ToastIcon = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 0.2rem;
  margin: 0.1rem 0;
  span {
    margin-left: 0.1rem;
  }
  &:hover {
    opacity: 0.6;
  }
`
const ImageContainer = styled.div`
  width: 100%;
`
const Image = styled.img`
  height: 8rem;
  border-radius: 1px;
  padding: 1rem;
  border-radius: 50%;
`
