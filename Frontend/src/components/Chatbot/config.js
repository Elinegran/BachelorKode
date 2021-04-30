import {appColors} from '../Colors';
// Config starter code
import { createChatBotMessage } from "react-chatbot-kit";
import LearningOptions from "./LearningOptions"
import LinkList from "./LinkList";
import AuthService from '../../services/auth.service';
import './config.css';
const link = "tom link";

export const linkfunction = function linkfunction(svarList) {
  console.log("Svarlist inne i Linkfunction:" + svarList)
}
const config = { 
  botName: "Matchbot",
 
  initialMessages: [
    createChatBotMessage("Hei " + AuthService.getCurrentUsername() + ", hva trenger du hjelp til?", {
      widget: "learningOptions",
    }),
  ],
  

  customStyles: {
    botMessageBox: {
      backgroundColor: appColors.primaryDarker
    
    },
    chatButton: {
      backgroundColor: appColors.primaryDarker,
    },
    
    
  },
  widgets: [
    // {
    //   widgetName: "learningOptions",
    //  widgetFunc: (props) => <LearningOptions {...props} />,
    // },
    {
      widgetName: 'NAVlinks',
      widgetFunc: (props) => <LinkList {...props} />,
      props: {
        options: [
          {
            text: link,
            url:
              link,
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
],
}
export default config