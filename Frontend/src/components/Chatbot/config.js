//Utviklet av: Gruppe 2
import {appColors} from '../Colors';
// Config starter code
import { createChatBotMessage} from "react-chatbot-kit";
import LinkList from "./LinkList";
import AuthService from '../../services/auth.service';
import './config.css';
import  MatchbotAvatar   from './MatchbotAvatar'

const config = { 
  botName: "Matchbot",
  
  initialMessages: [
    createChatBotMessage("Hei " + AuthService.getCurrentUsername() + ", hva trenger du hjelp til?", {
      widget: "learningOptions",
    }),
  ],
  
  customComponents: {
    botAvatar: (props) => <MatchbotAvatar {...props} />,
    header: () => <div className="react-chatbot-kit-chat-header" >Samtale med MatchBot</div>
  },
  customStyles: {
    botMessageBox: {
      backgroundColor: appColors.primaryDarker
    
    },
    chatButton: {
      backgroundColor: appColors.primaryDarker,
    },
    chatInput: {
      placeholder: "bla"
    }

    
  },
  widgets: [

    {
      widgetName: 'NAVlinks',
      widgetFunc: (props) => <LinkList {...props} />,
      props: {
        options: [
          {
            text: "NAV Meldekort",
            url:
              "https://www.nav.no/no/person/arbeid/dagpenger-ved-arbeidsloshet-og-permittering/meldekort-hvordan-gjor-du-det",
            id: 1,
          },
          {
            text: "Kontakt NAV",
            url:
              "https://www.nav.no/person/kontakt-oss/nb/",
            id: 2,
          },
          {
            text: "Nav.no",
            url: "https://www.nav.no",
            id: 3,
          },
        ],
      },
    },
    {
      widgetName: 'VeilederLinks',
      widgetFunc: (props) => <LinkList {...props} />,
      props: {
        options: [
          {
            text: "Send melding til Tor",
            url:
              "/meldinger",
            id: 1,
          },
          {
            text: "Send melding til Jon Ola",
            url:
              "/meldinger",
            id: 2,
          },
 
        ],
      },
    },
],
}
export default config