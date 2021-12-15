import React, { useState } from 'react'
import { Draggable, Droppable } from 'react-beautiful-dnd'
import styled from 'styled-components'
import { Button, Form } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import uuid from 'uuid/v4'
import { addTask } from '../redux/taskSlice'
import OptionsModel from './OptionsModel'

function DragElement ({ columnId, column, id, user }) {
  const [openModal, setOpenModal] = useState(false)
  const [taskContent, setTaskContent] = useState('')
  const dispatch = useDispatch()
  const [showA, setShowA] = useState(false)
  const toggleShowA = () => setShowA(!showA)
  const handelAddTask = () => {
    const task = {
      createdAt: new Date().toISOString(),
      content: taskContent,
      userEmailCreator: user.displayName,
      userImageCreator: user.photoURL,
      typeTask: column.name,
      project_ID: id,
      id: uuid()
    }
    dispatch(addTask(task))
  }
  return (
    <Container>
      <HeaderContainer>
        <h4>{column.name}</h4>
      </HeaderContainer>
      <div style={{ margin: 8, backgroundColor: '#34b7eb' }}>
        <Droppable droppableId={columnId} key={columnId}>
          {(provided, snapshot) => {
            return (
              <Element
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={{
                  background: snapshot.isDraggingOver ? 'lightblue' : '#34b7eb'
                }}
              >
                <AddContent className='my-2'>
                  <ion-icon
                    onClick={() => setOpenModal(!openModal)}
                    name={
                      openModal ? 'close-circle-outline' : 'add-circle-outline'
                    }
                  ></ion-icon>
                  {openModal && (
                    <>
                      <Form.Control
                        className='mt-2'
                        type='text'
                        placeholder='...'
                        value={taskContent}
                        onChange={e => setTaskContent(e.target.value)}
                      />
                      <Button
                        onClick={handelAddTask}
                        className='mt-3 button'
                        variant='primary'
                      >
                        Add
                      </Button>
                    </>
                  )}
                </AddContent>
                {column.items?.map((item, index) => {
                  return (
                    <Draggable
                      key={item.id}
                      draggableId={item.id}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <ElementDetail
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={{
                            userSelect: 'none',
                            padding: 16,
                            margin: '0 0 8px 0',
                            minHeight: '50px',
                            backgroundColor: snapshot.isDragging
                              ? '#34b7eb'
                              : '#47cfed',
                            color: 'white',
                            ...provided.draggableProps.style
                          }}
                        >
                          {item.content}
                          <OptionsModel
                            showA={showA}
                            toggleShowA={toggleShowA}
                            id={item.id}
                            typeTask={column.name}
                          />
                        </ElementDetail>
                      )}
                    </Draggable>
                  )
                })}
                {provided.placeholder}
              </Element>
            )
          }}
        </Droppable>
      </div>
    </Container>
  )
}

export default DragElement
const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`
const HeaderContainer = styled.div`
  padding-left: 0.4rem;
  padding-top: 0.4rem;
  width: 220px;
  border-radius: 0.4rem;
  background-color: #ede0df;
  h4 {
    font-size: 1rem;
  }
  @media (max-width: 768px) {
    width: 340px;
  }
`
const Element = styled.div`
  padding: 4px;
  width: 220px;
  min-height: 500px;
  @media (max-width: 768px) {
    width: 340px;
  }
`

const ElementDetail = styled.div`
  border-radius: 0.4rem;
  position: relative;
`

const AddContent = styled.div`
  width: 96%;
  position: relative;
  margin: 0 auto;
  background-color: #fff;
  padding: 0.9rem;
  border-radius: 0.4rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .button {
    width: 6rem;
  }
  ion-icon {
    position: absolute;
    top: 0.2rem;
    right: 0.2rem;
    cursor: pointer;
    font-size: 1.2rem;
  }
`
