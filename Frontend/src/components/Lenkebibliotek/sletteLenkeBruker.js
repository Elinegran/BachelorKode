import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button } from 'react-bootstrap'; 
// import AuthService from '../../../services/auth.service'; 




function SletteLenkeBruker(props) {
    const idbruker = props.senderIdbruker;
    const lenkeID = props.senderLenkeID;
    const fornavn = props.senderFornavn;
    const etternavn = props.senderEtternavn;
    const url = props.senderUrl;
    const slettLenkeB = () => {
        if (window.confirm(`Er du sikker på at du vil slette denne lenken: ${ url } ${lenkeID} fra ${ fornavn } ${ etternavn } ?`)) {
            axios.delete('http://localhost:3001/api/slettLenkeBruker', { data: { idbruker: idbruker,lenkeID: lenkeID }});
        }     
        alert ("idbruker" + idbruker)
        alert ("lenkeID" + lenkeID)
    };
    
    return(
        <Form>
        <Button
         style = {{ float: 'right'}} 
         variant = "danger"
         onClick = {slettLenkeB} 
         type = "submit"><b>Slett lenke</b>
         </Button> 
         </Form>   
    )
}

export default SletteLenkeBruker;