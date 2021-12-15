import React from 'react'
import styled from 'styled-components'
import Message from '../components/Message'
import ReactScrollableFeed from 'react-scrollable-feed'
function Chat ({ roomMessages }) {
  return (
    <GroupChatContent id='chat'>
      <ReactScrollableFeed>
        <ListChat>
          {roomMessages?.docs.map(doc => {
            const { message, createdAt, userEmail, userImage } = doc.data()
            return (
              <Message
                key={doc.id}
                message={message}
                timestamp={createdAt}
                userEmail={userEmail}
                userImage={
                  userImage.length > 1 ? userImage : 'assets/emptyimg.png'
                }
              />
            )
          })}
        </ListChat>
      </ReactScrollableFeed>
    </GroupChatContent>
  )
}

export default React.memo(Chat)
const GroupChatContent = styled.div`
  padding: 0 8px;
  height: 320px;
  border-radius: 4px;
  @media (max-width: 1024px) {
    border: 1px solid #ccc;
  }
  @media (max-width: 768px) {
    width: 100%;
    margin: 0 auto;
    padding: 1rem 0;
  }
`
const ListChat = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-top: 10px;
`
