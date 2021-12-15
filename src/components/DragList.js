import React, { useState } from 'react'
import { DragDropContext } from 'react-beautiful-dnd'
import DragElement from './DragElement'
import styled from 'styled-components'
import { updateTasks } from '../redux/taskSlice'
import { useDispatch } from 'react-redux'

function DragList ({ tasks, id, user }) {
  const [columns, setColumns] = useState(tasks)
  const dispatch = useDispatch()
  const onDragEnd = async (result, columns, setColumns, id) => {
    if (!result.destination) return
    const { source, destination } = result
    if (source.droppableId !== destination.droppableId) {
      let sourceColumn = columns[source.droppableId]
      const sourceItems = [...sourceColumn.items]
      let [removed] = sourceItems.splice(source.index, 1)
      removed = { ...removed, typeTask: destination.droppableId }
      /*       
      let destColumn = columns[destination.droppableId]
      const destItems = [...destColumn.items, removed]
      sourceColumn = { ...sourceColumn, items: sourceItems }
      destColumn = { ...destColumn, items: destItems }
      const data = {
        ...columns,
        [source.droppableId]: sourceColumn,
        [destination.droppableId]: destColumn
      } */
      dispatch(
        updateTasks({
          data: removed,
          prevTypeTask: source.droppableId
        })
      )
    } /* else {
      const column = columns[source.droppableId]
      const copiedItems = [...column.items]
      const [removed] = copiedItems.splice(source.index, 1)
      copiedItems.splice(destination.index, 0, removed)
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems
        }
      })
      console.log(columns)
    } */
  }
  return (
    <Content>
      <DragDropContext
        onDragEnd={result => onDragEnd(result, columns, setColumns, id)}
      >
        <ListElement>
          {Object.entries(columns).map(([columnId, column], index) => {
            return (
              <DragElement
                key={columnId}
                columnId={columnId}
                column={column}
                id={id}
                user={user}
              />
            )
          })}
        </ListElement>
      </DragDropContext>
    </Content>
  )
}

export default DragList
const Content = styled.div`
  width: 100%;
`
const ListElement = styled.div`
  display: flex;
  justify-content: center;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`
