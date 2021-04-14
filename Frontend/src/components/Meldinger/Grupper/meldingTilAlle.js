import React from 'react';
import axios from 'axios'; // for å sende/ motta til/ fra backend
import { useState } from "react"; // for å sende til backend
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstap
import { Row, Col, Button, Form } from 'react-bootstrap'; // Bootstrap-greier
import AuthService from '../../../services/auth.service'; 

const innlogget = AuthService.getUserId(); // Den brukeren som er innlogget, altså avsenderen 

// Funksjon for å opprette en ny gruppe i databasen
function MeldingTilAlle() {
    const avsender = innlogget; // Avsenderen
    const [melding, setMelding] = useState(""); // Meldingsteksten hentes fra inputfelt
    
    // Sender avsender og medlingstekst til backend
    const sendMelding = () => {
      axios.post("http://localhost:3001/api/meldingTilAlle", {avsender: avsender, melding: melding}) 
        alert('Du sendte ' + melding);
    };
  
    // Dette sendes til Meldingssiden
    return (
        <p>
            <Form>
                <label>Send melding til alle</label>
                <Row>
                    <Col>
                        <Form.Group>
                            <Form.Control 
                                input type="text" 
                                placeholder="Skriv melding..." 
                                style={{float: 'right'}} 
                                onChange = {(event) => {setMelding(event.target.value);}}/>
                        </Form.Group>
                    </Col>
                    <Col>  
                        <Button 
                            type="submit"
                            className="btn btn-success"
                            style={{float: 'left'}} 
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
