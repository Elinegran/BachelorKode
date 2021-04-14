import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstap
import { Form, Button } from 'react-bootstrap'; // Bootstrap-greier
import AuthService from '../../../services/auth.service'; 

const innlogget = AuthService.getUserId();


 function SlettMedlem(props) {
   // idbruker, gruppeID, gruppenavn, fornavn og etternavn sendes fra selectGruppemedlem.js
    const idbruker = props.senderIDbruker; 
    const gruppeID = props.senderGruppeID; 
    const gruppenavn = props.senderGruppenavn;
    const fornavn = props.senderFornavn;
    const etternavn = props.senderEtternavn; 
    const mottaker = idbruker;
    const avsender = innlogget;
    const melding = 'Du er nå meldt ut av ' + gruppenavn; 
    
  // Sender medlemmet som skal slettes til Backend
  const slettMedlem = () => { 
    if (window.confirm(`Er du sikker på at du vil slette ${ fornavn } ${ etternavn } fra ${ gruppenavn } ?`)) {
      // sletter medlem i DB
      axios.delete('http://localhost:3001/api/deleteMedlem', { data: { idbruker: idbruker, gruppeID: gruppeID }});
      // sender melding til bruker om at h*n er slettet som medlem
      axios.post('http://localhost:3001/api/meldingerInnboksMeldinger', { mottaker: mottaker, avsender: avsender , melding: melding }); 

    }
  };  

  // Returnerer en liste over medlemmene i gruppa
    return(
      <Form>
      <Button 
        type="submit" 
        className="btn btn-danger btn-sm" 
        style={{float: 'right'}}
        onClick={slettMedlem}> 
          Slett medlem
      </Button>
      </Form>
    ) // slutt på return
} // slutt på funksjon slettMedlem()

export default SlettMedlem; 
