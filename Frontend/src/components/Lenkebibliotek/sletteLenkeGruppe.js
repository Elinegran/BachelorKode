import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap'; 

function SletteLenkeGruppe(props) {
    const idbruker = props.senderIdbruker;
    const lenkeID = props.senderLenkeID;
    const fornavn = props.senderFornavn;
    const etternavn = props.senderEtternavn;
    const url = props.senderUrl;
    const slettLenkeG = () => {
        if (window.confirm(`Er du sikker på at du vil slette lenken fra gruppen : ${ url } ${lenkeID} fra ${ fornavn } ${ etternavn } ?`)) {
            axios.delete('http://localhost:3001/api/slettLenkeGruppe', { data: { idbruker: idbruker,lenkeID: lenkeID }});
        }     
    };
    
    return(
        <Form>
        <Button
         style = {{ float: 'right'}} 
         variant = "danger"
         onClick = {slettLenkeG} 
         type = "submit">Slett lenke
         </Button> 
         </Form>   
    )
}

export default SletteLenkeGruppe;