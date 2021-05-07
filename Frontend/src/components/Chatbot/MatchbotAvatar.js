//Utviklet av: Gruppe 2
import  BotIcon   from '../../assets/images/icon_chatbot.png'
import React from "react";

function MatchbotAvatar() {

    return (
      <>
                <img
                    width={36}
                    height={36}
                    className="mr-3"
                    src= { BotIcon }
                    alt="Generic placeholder"
                />      
      </>
    );
  }
  export default MatchbotAvatar