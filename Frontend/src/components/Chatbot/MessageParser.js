import Axios from 'axios';

// MessageParser starter code
class MessageParser {
    constructor(actionProvider, state) {
      this.actionProvider = actionProvider;
      this.state = state;
    }    

    parse(message) {
      const lowerCaseMessage = message.toLowerCase()
      const keyword = lowerCaseMessage;
      console.log("keyword " + keyword)
      if (keyword.includes("hei")) {
        console.log("Hei if")
        this.actionProvider.greet()
          
        }
      if (keyword == "" ) {
        this.actionProvider.handleQuestion("")
      }
      
      else {
        
          Axios.get("http://localhost:3001/api/chatbotGetAll").then((response) => {
          
          console.log(response.data);
          })
      

      // Axios.post("http://localhost:3001/api/chatbotCheckAll", 
      // {
      //     keyword: keyword 
      // }).then((response) => {
      //   const svarList = [response.data[0].svar, response.data[0].link]
      //   this.actionProvider.handleQuestion(svarList)

      // }).catch(err =>{
      //   // Hvis ingen match i DB: ("Beklager forsto ikke spm ")
      //   this.actionProvider.handleQuestion("");
      //   console.log(err);
      // })
        

    }
    }
  }

  export default MessageParser;
  
 