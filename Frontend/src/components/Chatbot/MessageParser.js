//Utviklet av: Gruppe 2
import Axios from 'axios';
import {saveUAQL} from './UAQL'
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

      // Henter ut chatbot svar og link for spesifikk ID fra matching-funksjon
      var getOneSpm = (id) => {
        Axios.post("http://localhost:3001/api/chatbotGetOne", 
          {
              id: id 
          }).then((response) => {
            const svarList = [response.data[0].svar, response.data[0].linkTekst, response.data[0].link]
            this.actionProvider.handleQuestion(svarList)
            return;
          }).catch(err =>{
            // Hvis ingen match i DB: ("Beklager forsto ikke spm ")
             this.actionProvider.handleQuestion("nada");
             saveUAQL(message)
          })
            
    
        }
      if (keyword.includes("hei") || keyword.includes("halla")||keyword.includes("yo")||keyword.includes("morn")||keyword.includes("hallo")) {
        console.log("Hei if")
        this.actionProvider.greet()
          
        }
      if (keyword === "" ) {
        this.actionProvider.handleQuestion("")
        return;
      }
      if (keyword.includes("nav") || keyword.includes("meldekort")) {
        this.actionProvider.handleNavLinks()
        return;
      }
      if (keyword.includes("veileder") ) {
        this.actionProvider.handleVeilederLinks();
        return;
      }
      // Sjekker brukerens skrevne ord mot nøkkeltall i chatbot-tabellen
      else {
        Axios.get("http://localhost:3001/api/chatbotGetAll").then((response) => {
        var keyWordListeDB = response.data;

        // Søk og matchfunksjon. Hvis ordene brukeren taster inn finnes i nøkkelordene i chatbottabellen, returneres id'n til det chatbot-spørsmålet
        function searchMatch(keyWordListeDB, keyword){
            for(var i = 0; i<keyWordListeDB.length; i++) {
              console.log("inne i for. i = " + keyWordListeDB[i]);
              var dbOject = keyWordListeDB[i];
              var keywordsDB = keyWordListeDB[i].spm.toLowerCase().split(',').join("");
              var keywordsInput = keyword.split(" ");
              console.log("keywordsDB: " + keywordsDB + "keywordsinput split: " + keywordsInput)
              var keywordsDBfor = keywordsDB.split(/\s+/g);
              for(var n = 0; n<keywordsDBfor.length; n++) {
                for(var f = 0; f<keywordsInput.length; f++) {
                  if(keywordsInput[f] === (keywordsDBfor[n])) { 
                    var id = dbOject.idchatbot_spm_svar;
                    return id;
                  }
                }               
            }
            }
 
          return null;
        }
        // Sender ID'n til matchet chatbot-spm, og henter ut svar og eventuell link
        getOneSpm(searchMatch(keyWordListeDB, keyword));
      })
    }
  }
        
 
    }
  

  export default MessageParser;
  
 