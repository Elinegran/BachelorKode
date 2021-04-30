import AuthService from '../../services/auth.service';
// ActionProvider starter code

import { linkfunction} from "./config";
import { Link} from 'react-router-dom'

 class ActionProvider {
  constructor(createChatBotMessage, setStateFunc, createClientMessage) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
    this.createClientMessage = createClientMessage;
  }



  greet() {

    const greetingMessage = this.createChatBotMessage("Hei " + AuthService.getCurrentUsername())
    this.updateChatbotState(greetingMessage)
  }
  handleQuestion(svarList) {
    if(svarList=="") {
      const sorryMessage = this.createChatBotMessage("Beklager, jeg forstår ikke spørsmålet.")
      this.updateChatbotState(sorryMessage)
    }
    else {
      const answerMessage = this.createChatBotMessage(<Link to={svarList[1]}>{svarList[0]}</Link>)
      // , {widget: {...svarList[1]},} 
      // , { widget: "NAVlinks"}
      // ,linkfunction(svarList[1])
      // )
      this.updateChatbotState(answerMessage)
      console.log("else: " + "svar1:" + svarList[0] + "link?" + svarList[1]);
    }

  }
  
  handleError(unsure){

  }
  handleNAVlist = () => {
    const message = this.createChatBotMessage(
      "Her er noen alternativer:",
      {
        widget: "NAVlinks",
      }
    );

    this.updateChatbotState(message);
  };
  updateChatbotState(message) {
 
// NOTE: This function is set in the constructor, and is passed in      // from the top level Chatbot component. The setState function here     // actually manipulates the top level state of the Chatbot, so it's     // important that we make sure that we preserve the previous state.
 
    
   this.setState(prevState => ({
    	...prevState, messages: [...prevState.messages, message]
    }))
  }
}

export default ActionProvider