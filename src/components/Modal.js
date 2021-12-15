import React, { useState } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../firebase'
import { useHistory } from 'react-router-dom'
import { addProject } from '../redux/projectSlice'
import { useDispatch } from 'react-redux'

function ModalComponent ({ show, handleClose, setShow, project, type }) {
  const history = useHistory()
  const dispatch = useDispatch()
  const [projectName, setProjectName] = useState('')
  const [projectPassword, setProjectPassword] = useState('')
  const [user] = useAuthState(auth)
  const passwordHash = require('password-hash')

  const handleSubmitForCreatNewProject = e => {
    e.preventDefault()
    if (projectName.length > 1 && projectPassword.length > 1) {
      dispatch(
        addProject({
          projectId: Date.now().toString(),
          name: projectName,
          timestamp: Date(Date.now()).toString(),
          user: user.displayName,
          userAvatar: user.photoURL,
          password: passwordHash.generate(projectPassword)
        })
      )
      setShow(false)
    }
  }
  const handelJoinProject = e => {
    e.preventDefault()
    if (passwordHash.verify(projectPassword, project.password))
      history.push(`/project/${project.projectId}`)
    else alert('Passwords are not same')
  }
  return (
    <>
      {type === 'newproject' ? (
        <Modal show={show} onHide={handleClose} backdrop='static'>
          <Modal.Header closeButton>
            <Modal.Title>New project</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className='mb-3' controlId='formBasicEmail'>
                <Form.Label>Name project</Form.Label>
                <Form.Control
                  type='text'
                  value={projectName}
                  placeholder='Enter name project'
                  onChange={e => setProjectName(e.target.value)}
                />
              </Form.Group>
              <Form.Group className='mb-3' controlId='formBasicPassword'>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type='password'
                  placeholder='Password'
                  value={projectPassword}
                  onChange={e => setProjectPassword(e.target.value)}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant='danger' onClick={handleClose}>
              Close
            </Button>
            <Button
              type='submit'
              variant='primary'
              onClick={handleSubmitForCreatNewProject}
            >
              Create
            </Button>
          </Modal.Footer>
        </Modal>
      ) : (
        <Modal show={show} onHide={handleClose} backdrop='static'>
          <Modal.Header closeButton>
            <Modal.Title>Project's password?</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className='mb-3' controlId='formBasicPassword'>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type='password'
                  placeholder='Password'
                  value={projectPassword}
                  onChange={e => setProjectPassword(e.target.value)}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant='danger' onClick={handleClose}>
              Close
            </Button>
            <Button onClick={handelJoinProject} variant='primary'>
              Join
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  )
}

export default ModalComponent
