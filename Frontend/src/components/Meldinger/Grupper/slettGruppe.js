import React from 'react';
import axios from 'axios'; // for å sende/ motta til/ fra backend
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstap
import { Button } from 'react-bootstrap'; // Bootstrap-greier


// Funksjon for å opprette en ny gruppe i databasen
function SlettGruppe(props) {
  const gruppeID = props.senderGruppeID;
  
  // Sender gruppeID til backend
  const slettGruppe = () => {
    axios.delete("http://localhost:3001/api/deleteGruppe", {data: {gruppeID: gruppeID}})    
  };

  // Dette sendes til grupper.js
  return (

    <Button 
      type="submit"   
      className="btn btn-warning" 
      style={{float: 'right'}}
      onClick={slettGruppe}
      > Slett gruppe
    </Button>      
  ) // slutt på return()

} // slutt på funksjonen NyGruppe()

export default SlettGruppe; 