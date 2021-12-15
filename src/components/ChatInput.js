import React, { useState } from 'react'
import styled from 'styled-components'
import { auth } from '../firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { db } from '../firebase'
function ChatInput ({ id }) {
  const [input, setInput] = useState('')
  const [user] = useAuthState(auth)
  const sendMessage = e => {
    e.preventDefault()
    db.collection('messages')
      .doc(id)
      .collection('message')
      .add({
        message: input,
        userEmail: user.displayName,
        userImage: user.photoURL,
        createdAt: new Date().toISOString()
      })
    //dispatch(addMessage(data));
    setInput('')
  }
  return (
    <ChatInputContainer>
      <form>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder='Enter something...'
          required
        />
        <button hidden type='submit' onClick={sendMessage}>
          SEND
        </button>
      </form>
    </ChatInputContainer>
  )
}
const ChatInputContainer = styled.div`
  border-radius: 20px;
  margin-top: 10px;
  background-color: #ccc;
  > form {
    display: flex;
    justify-content: flex-start;
  }
  > form > input {
    width: 100%;
    border: 1px solid gray;
    border-radius: 3px;
    padding: 12px;
    outline: none;
  }
  > form > button {
    display: none !important;
  }
`
export default React.memo(ChatInput)
