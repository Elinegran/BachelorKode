import React from 'react';
import axios from 'axios'; // for å sende/ motta til/ fra backend
import { useState } from "react"; // for å sende til backend
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstap
import { Container, Row, Col, Button, Form } from 'react-bootstrap'; // Bootstrap-greier

// Funksjon for å opprette en ny gruppe i databasen
function MeldingTilAlle() {
    //const [idbruker, setIDbruker] = useState(0); // idbruker hentes fra inputfelt
    //const gruppeID = props.senderGruppeID; // gruppeID sendes fra grupper.js
    //const [brukerliste, setBrukerliste] = useState([]);
    //const brukere = []; 

    // Henter brukere fra DB
    /* const bruker = () => {
        axios.get("http://localhost:3001/api/brukerGetAll")
      };
 */
    // Sender det nye gruppenavnet til backend
    const sendMelding = () => {
      axios.post("http://localhost:3001/api/gruppemelding", {}) 
    };
  
    // Dette sendes til Meldingssiden
    return (
        <p>
            <h3>Send gruppemelding</h3>
            <Form>
                <Row>
                    <Col>
                        <Form.Group>
                            <Form.Control 
                                input type="text" 
                                placeholder="Skriv gruppemelding" 
                                style={{float: 'left'}} />
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

export default MedlingTilAlle; 
