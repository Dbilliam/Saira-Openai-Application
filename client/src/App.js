
import React, { useState, useEffect } from 'react';
import { HiUserCircle } from 'react-icons/hi';
import { FaRobot } from 'react-icons/fa';
import { AiOutlineLogout, AiOutlineClear } from 'react-icons/ai'
import { BsDiscord, BsLightningCharge } from 'react-icons/bs';
import { RxUpdate } from 'react-icons/rx'
import { CiLight } from 'react-icons/ci'
import { FiAlertTriangle } from "react-icons/fi"
import './normalize.css'
import './App.css';
import send from './assets/send.svg'




function App() {
  const [input, setInput] = useState("")
  const [models, setModels] = useState([])
  const [currentModel, setCurrentModel] = useState("ada")
  const [tokens, setTokens] = useState(100)
  const [temperature, setTemperature] = useState(0.1)
  console.log(tokens)
  const [chatLog, setChatLog] = useState([
    {
      user: "me",
      message: "I want to use ChatGPT today"
    }, {
      user: "gpt",
      message: "How can I help you today"
    }])

  function clearChats() {
    setChatLog([]);
  }



  function getModels() {
    fetch("http://localhost:8000/models")
      .then(res => res.json())
      .then(data => {
        console.log(data.models)
        setModels(data.models)
      })
  }

  useEffect(() => {
    getModels();
  }, [])

  async function handleSubmit(e) {
    e.preventDefault();
    let chatLogNew = [...chatLog, { user: "me", message: `${input}` }]

    await setInput("");

    setChatLog(chatLogNew);
    // fetch response to the api combining the chat log array of message and sending it as a message
    //  to localhost:3000 as post 
    const messages = chatLogNew.map((message) => message.message).join("")

    const response = await fetch("http://localhost:8000", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message: messages,
        currentModel,
        tokens
      })
    });

    const data = await response.json();

    setChatLog([...chatLogNew, { user: "gpt", message: `${data.message}` }])

  }
  return (

    <div className="App">

      <aside className="sidemenu">
        <div className="side-menu-button" onClick={clearChats}>
          <span>+</span>
          New Chat</div>
        <div className="models">
          <label>Select Your Model</label>
          <select className='options' onChange={(e) => { setCurrentModel([e.target.value]) }}>{models.map((model, id) => (
            <option className='option' key={model.id} value={model.id}>{model.id}</option>
          ))}
          </select>
        </div>
        <div className="models">
          <label>Select token numbers:</label>
          <input className='options' type="range" value={tokens} name="tokens" oninput={tokens} min="100" max="3000" onChange={(e) => { setTokens(e.target.value) }} />
          <output>The Token value is {tokens}</output>
        </div>

        <div className="models">
          <label>Select temperature:</label>
          <input className='options' type="number" value={temperature} onChange={(e) => { setTemperature(e.target.value) }}></input>
        </div>


        <div className="sidedown">
          <hr size="2" width="100%" className='hrside' />
          <div className="sidedownmenu"><AiOutlineClear /> Clear conversations</div>
          <div className="sidedownmenu"><BsDiscord /> OpenAI Discord</div>
          <div className="sidedownmenu"><RxUpdate /> Updates & FAQ</div>
          <div className="sidedownmenu"><AiOutlineLogout /> Logout</div>
        </div>

      </aside>



      <section className="chatbox">
        <h1>Welcome to Saira OpenAI</h1>
        <p ><span class="text-gradient">Saira OpenAI </span> is an artificial intelligence research laboratory consisting of the for-profit corporation OpenAI LP and its parent company, the non-profit OpenAI Inc. The company conducts research in the field of AI with the stated goal of promoting and developing friendly AI in a way that benefits humanity as a whole. </p>
        <div className='infoview'>
          <div className='infoview1'><CiLight className="icons-react" /><h2>Examples</h2><ul><li>"Explain quantum computing in simple terms"</li></ul></div>
          <div className='infoview1'><BsLightningCharge className="icons-react" /> <h2>Capabilities</h2><ul><li>"Remembers what user said earlier in the conversation"</li></ul></div>
          <div className='infoview1'><FiAlertTriangle className="icons-react" /> <h2>Limitations</h2><ul><li>"May occasionally generate incorrect information"</li></ul></div>
        </div>

        <div className="chat-log">
          {chatLog.map((message, index) => (
            <ChatMessage key={index} message={message} />
          ))}
        </div>

        <div className="chat-input-holder">
          <form onSubmit={handleSubmit}>
            <input className="chat-input-textarea" value={input} onChange={(e) => setInput(e.target.value)} rows="1"></input>
            <img src={send} height={21} width={21} />
          </form>

        </div>
      </section>
    </div>
  );
}


const ChatMessage = ({ message }) => {
  return (
    <div className={`chat-message ${message.user === "gpt" && "chatgpt"}`}>
      <div className="chat-message-center">
        <div className={`avater ${message.user === "gpt" && "chatgpt"}`}>{message.user === "gpt" && <FaRobot />} {message.user === "me" && <HiUserCircle />}</div>
        <div className="message">{message.message}
        </div>
      </div>
    </div>
  )
}

export default App;
