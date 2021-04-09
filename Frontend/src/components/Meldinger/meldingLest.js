import React from 'react';
import axios from 'axios'; // for å sende/ motta til/ fra backend
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstap

// Funksjon for å legge til NÅR melding er lest
function MeldingLest(props) {
    const meldingsID = props.senderID;

    // Sender meldingsID til backend
    axios.post("http://localhost:3001/api/meldingLest", { meldingsID: meldingsID, }) ;  
    alert(meldingsID); 
    
} // slutt på funksjonen 

export default MeldingLest; 
