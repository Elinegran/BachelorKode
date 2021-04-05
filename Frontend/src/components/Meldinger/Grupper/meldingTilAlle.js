import React from 'react';
import axios from 'axios'; // for å sende/ motta til/ fra backend
import { useState } from "react"; // for å sende til backend
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstap
import { Container, Row, Col, Button, Form } from 'react-bootstrap'; // Bootstrap-greier
import AuthService from '../../../services/auth.service'; 

const innlogget = AuthService.getUserId(); // Den brukeren som er innlogget, altså avsenderen 

// Funksjon for å opprette en ny gruppe i databasen
function MeldingTilAlle() {
    const avsender = innlogget; // Avsenderen
    const mottakere = [2,3,13]; // Liste med alle mottakerne
    const [melding, setMelding] = useState(""); // Meldingsteksten hentes fra inputfelt
    
    // Henter ALLE brukere fra DB
    /* const bruker = () => {
        axios.get("http://localhost:3001/api/brukerGetAll")
      };*/
 
    // Sender det nye gruppenavnet til backend
    const sendMelding = () => {
      axios.post("http://localhost:3001/api/meldingTilAlle", {avsender: avsender, mottaker: mottakere, melding: melding}) 
    };
  
    // Dette sendes til Meldingssiden
    return (
        <p>
            <h3>Send melding til alle</h3>
            <Form>
                <Row>
                    <Col>
                        <Form.Group>
                            <Form.Control 
                                input type="text" 
                                placeholder="Skriv melding" 
                                style={{float: 'left'}} 
                                onChange = {(event) => {setMelding(event.target.value);}}/>
                        </Form.Group>
                    </Col>
                    <Col>  
                        <Button 
                            type="submit"
                            className="btn btn-success"
                            style={{float: 'right'}} 
                            onClick={sendMelding} 
                            > Send
                        </Button>
                    </Col>
                </Row>        
            </Form>
        </p>
    ) // slutt på return()

} // slutt på funksjonen 

export default MeldingTilAlle; 
