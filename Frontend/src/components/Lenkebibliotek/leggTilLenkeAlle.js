import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import { Form, Button } from 'react-bootstrap';

// Legger til en lenke hos alle brukerne. 
function LeggTilLenkeAlle(props) {
    const idbruker = props.senderIdbruker;
    const lenkeID = props.senderLenkeID;
    const tittel = props.senderTittel;
    const info = props.senderInfo;
    const url = props.senderUrl;
    const addLenkeAlle = () => {
        if (window.confirm(`Er du sikker på at du vil legge til lenken ${ url } hos alle brukerne: ?`)) {
            axios.post('http://localhost:3001/api/LeggTilLenkeAlle', 
            { data: { lenkeID: lenkeID }});
        }     
        alert ("idbruker" + idbruker)
        alert ("lenkeID" + lenkeID)
    };

      return (
          <Button 
          variant="success"
          type="submit"
              onClick = {addLenkeAlle}>
                Legg til for alle brukerne
          </Button>
    )  
}
export default LeggTilLenkeAlle;