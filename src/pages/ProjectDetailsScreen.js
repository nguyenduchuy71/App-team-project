import { useEffect } from 'react'
import styled from 'styled-components'
import ChatInput from '../components/ChatInput'
import { useDispatch, useSelector } from 'react-redux'
import { getProjectById, getProjects } from '../redux/projectSlice'
import { db } from '../firebase'
import { useCollection } from 'react-firebase-hooks/firestore'
import DragList from '../components/DragList'
import Loading from '../components/Loading'
import Chat from '../components/Chat'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../firebase'
import { getTasks } from '../redux/taskSlice'
import { Container, Row, Col } from 'react-bootstrap'

function ProjectDetailsScreen (props) {
  const id = props.match.params.id
  const [user] = useAuthState(auth)
  const { isLoading, tasks } = useSelector(state => state.task)
  const dispatch = useDispatch()
  const { project } = useSelector(state => state.project)
  const [roomMessages, loading] = useCollection(
    id &&
      db
        .collection('messages')
        .doc(id)
        .collection('message')
        .orderBy('createdAt', 'asc')
  )
  useEffect(() => {
    dispatch(getProjects())
    dispatch(getProjectById(id))
    dispatch(getTasks(id))
  }, [dispatch])
  console.log('Project Screen')
  return (
    <Container>
      <Row>
        <Col xs={12} md={12} lg={8} className='px-2'>
          <TaskBoardHead>
            <p>{project?.name}</p>
          </TaskBoardHead>
          <TaskBoardMain>
            {!isLoading ? (
              <DragList id={id} tasks={tasks} user={user} />
            ) : (
              <Loading />
            )}
          </TaskBoardMain>
        </Col>
        <Col xs={12} md={12} lg={4}>
          <ProjectDetailsGroupChatContent>
            <GroupChat>
              <p>Group Chat</p>
              <Chat roomMessages={roomMessages} />
              <ChatInput id={id} />
            </GroupChat>
          </ProjectDetailsGroupChatContent>
        </Col>
      </Row>
    </Container>
  )
}
const ProjectDetailsGroupChatContent = styled.div`
  width: 100%;
  margin-top: 4rem;
  @media (max-width: 768px) {
    margin-top: 1rem;
  }
`
const TaskBoardHead = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 1rem;
  p {
    font-size: 18px;
    font-weight: bold;
  }
`
const GroupChat = styled.div`
  padding: 0 8px;
  border-left: 1px solid #ccc;
  p {
    font-size: 18px;
    font-weight: bold;
  }
  @media (max-width: 1024px) {
    border-left: none;
  }
`

const TaskBoardMain = styled.div`
  margin-top: 0.6rem;
`
export default ProjectDetailsScreen
