//Utviklet av: Gruppe 2
//  Unanswered Question Log
//  Denne metoden lagrer alle spørsmål som Matchbot'en ikke forstår, i databasen.
import Axios from 'axios';
export const  saveUAQL = (question) => {
    Axios.post("http://localhost:3001/api/chatbotLogSave", {
    question: question
    // Automatisk oppdatering av siden ved å trykke på submit
    }).then(() => {

    });
}; 