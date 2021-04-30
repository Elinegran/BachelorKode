import React from "react";
import styled from 'styled-components';
import Chatbot from 'react-chatbot-kit'
import ActionProvider from './ActionProvider';
import MessageParser from './MessageParser';
import config from './config';

const Styles = styled.div`
   font-size:12px;
`;

const ChatbotTest = function ChatbotTest() {
    
    return(
    
    <div className="App">
      <header className="App-header">
        <Chatbot config={config} actionProvider={ActionProvider} messageParser={MessageParser}/>
      </header>
    </div>
)
}

export default ChatbotTest