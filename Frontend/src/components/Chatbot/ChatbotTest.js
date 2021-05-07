//Utviklet av: Gruppe 2
import React from "react";
import Chatbot from 'react-chatbot-kit'
import ActionProvider from './ActionProvider';
import MessageParser from './MessageParser';
import config from './config';

const ChatbotTest = function ChatbotTest() {
    
    return(
    
    <div className="App">
      <header className="App-header">
        <Chatbot config={config} actionProvider={ActionProvider} messageParser={MessageParser} placeholderText="Skriv inn spørsmålet ditt her..."/>
      </header>
    </div>
)
}

export default ChatbotTest