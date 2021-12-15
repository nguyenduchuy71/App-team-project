import React from 'react'
import styled from 'styled-components'
import { Toast } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { deleteTask } from '../redux/taskSlice'
function OptionsModel ({ showA, toggleShowA, id, typeTask }) {
  const dispatch = useDispatch()
  const handleDelete = () => {
    dispatch(deleteTask({ id, typeTask }))
  }
  return (
    <IconContainer>
      <Icon>
        {showA ? (
          <ion-icon onClick={toggleShowA} name='close'></ion-icon>
        ) : (
          <ion-icon onClick={toggleShowA} name='menu'></ion-icon>
        )}
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
  )
}

export default OptionsModel
const IconContainer = styled.div`
  position: absolute;
  top: 0.2rem;
  right: 0.2rem;
  ion-icon {
    font-size: 1.2rem;
  }
  color: #111;
`
const Icon = styled.div`
  position: absolute;
  right: 0.2rem;
  top: 0.1rem;
  z-index: 99;
  margin-bottom: 0.2rem;
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
