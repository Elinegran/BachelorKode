//Utviklet av: Gruppe 2
import AuthService from '../../services/auth.service';
// ActionProvider starter code
import { Link, Redirect} from 'react-router-dom'
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
    function redirect(link) {
      window.location.href=link;
      console.log("clicked!")
    }
    // Tar imot lista med svar, lenketekst og lenke.
    // svarList[0] = Svar, svarList[1] = linkTekst, svarList[2] = link
    //Dersom den er tom:
    console.log("svarlist: " + svarList)
    if(!svarList[0] || svarList === 'nada') {
      const sorryMessage = this.createChatBotMessage("Beklager, jeg forstår ikke spørsmålet.")
      this.updateChatbotState(sorryMessage)
      
    }
    // Hvis ikke, sjekkes det om svaret har link
    else {
      console.log("Actionprovider svarlist: " + svarList[0] + svarList[1] + svarList[2])
      if(svarList[1]) {
        const answerMessage = this.createChatBotMessage(svarList[0])
        this.updateChatbotState(answerMessage)
        // Hvis linken ikke har / i seg, for ekstern lenke
        if(!svarList[2].charAt(0).match("/")) {
          if(svarList[2].match("http")) {
            const linkMessage = this.createChatBotMessage(<a href={svarList[2]}>{"Ekstern lenke: " + svarList[1]}</a>)
            this.updateChatbotState(linkMessage)
          }
          else {
          const linkMessage = this.createChatBotMessage(<a href={"https://" + svarList[2]}>{"Ekstern lenke: " + svarList[1]}</a>)
          this.updateChatbotState(linkMessage)
          }
        }
        // Hvis ikke brukes vanlig intern link
        else {
        const linkMessage = this.createChatBotMessage(<Link to={svarList[2]}>{svarList[1]}</Link>)
        this.updateChatbotState(linkMessage)
        }
      }
      else {
        const answerMessage = this.createChatBotMessage(svarList[0])
        this.updateChatbotState(answerMessage)
      }
    }

  }
  handleVeilederLinks= () => {
    const message = this.createChatBotMessage(
      "Trenger du hjelp fra veileder?",
      {
        widget: "VeilederLinks",
      }
    );
    this.updateChatbotState(message);
  };

  handleNavLinks = () => {
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