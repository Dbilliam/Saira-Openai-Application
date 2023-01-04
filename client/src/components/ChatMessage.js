import React from 'react'
import { HiUserCircle } from 'react-icons/hi';
const ChatMessage = ({ message }) => {
  return (
    <div className={`chat-message ${message.user === "gpt" && "chatgpt"}`}>
    <div className="chat-message-center">  
       <div className={`avater ${message.user === "gpt" && "chatgpt"}`}>{message.user === <HiUserCircle/>}</div>
       <div className="message">{message.message}
       </div>
     </div>
     </div>
  )
}

export default ChatMessage