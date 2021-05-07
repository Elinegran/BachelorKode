import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';


// Legger til en lenke hos alle brukerne. 
function LeggTilLenkeAlle(props) {
    const lenkeID = props.senderLenkeID;
    const tittel = props.senderTittel;
    const url = props.senderUrl;
    const addLenkeAlle = () => {
        if (window.confirm(`Er du sikker på at du vil legge til lenken ${ url } hos alle brukerne?`)) {
            axios.post('http://localhost:3001/api/LeggTilLenkeAlle', 
            { lenkeID: lenkeID });
        }     
    };

      return (
        <Form>
            <Button 
                style = {{ float: 'right'}} 
                variant="success"
                type="submit"
                onClick = {addLenkeAlle}>
                Legg til for alle brukerne
            </Button>
        </Form>
    )  
}
export default LeggTilLenkeAlle;