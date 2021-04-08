import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstap
import { Row, Col, Button } from 'react-bootstrap'; // Bootstrap-greier


 function SlettMedlem(props) {
    const idbruker = props.senderIDbruker; // idbruker sendes fra selectGruppemedlem.js
    const gruppeID = 1; //props.senderGruppeID; // gruppeID sendes fra selectGruppemedlem.js
    
  // Sender medlemmet som skal slettes til Backend
  const slettMedlem = () => { 
    axios.delete(`http://localhost:3001/api/deleteMedlem`, { idbruker: idbruker, gruppeID: gruppeID }) 
    alert(gruppeID);
    
  };  

  // Returnerer en liste over medlemmene i gruppa
    return(
      <Button 
        type="button" 
        className="btn btn-warning btn-sm" 
        style={{float: 'right'}}
        onClick={slettMedlem}> 
          Slett medlem
      </Button>
    ) // slutt på return
} // slutt på funksjon slettMedlem()

export default SlettMedlem; 
