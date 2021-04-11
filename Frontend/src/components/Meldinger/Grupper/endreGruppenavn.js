import React from 'react';
import axios from 'axios'; // for å sende/ motta til/ fra backend
import { useState } from "react"; // for å sende til backend
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstap
import { Container, Row, Col, Button, Form } from 'react-bootstrap'; // Bootstrap-greier

// Funksjon for å opprette en ny gruppe i databasen
function EndreGruppenavn(props) {
    const gruppeID = props.sendeGruppeID; // fra gruppe.js
    const [gruppenavn, setGruppenavn] = useState("");

    // Sender det nye gruppenavnet til backend
    const endreNavn = () => {
        if (window.confirm(`Er du sikker på at du endre gruppenavnet til ${ gruppenavn } ?`)) {
            axios.post("http://localhost:3001/api/gruppenavn", { gruppeID: gruppeID, gruppenavn: gruppenavn, }) 
            // alert('Du endret gruppenavnet til ' + gruppenavn);  
        }
    };
  
    // Dette sendes til Meldingssiden
    return (
        <p>
        <Form>
            <label> Endre gruppenavn </label>
            <Row>
                <Col>
                    <Form.Group>
                        <Form.Control 
                            input type="text" 
                            placeholder="Nytt gruppenavn..." 
                            style={{float: 'right'}} 
                            onChange = {(event) => {setGruppenavn(event.target.value);}}/>
                    </Form.Group>
                </Col>
                <Col>  
                    <Button 
                        type="submit"
                        className="btn btn-success"
                        style={{float: 'left'}} 
                        onClick={endreNavn} 
                        > Endre
                    </Button>
                </Col>
            </Row>        
        </Form> 
    </p>

    ) // slutt på return()

} // slutt på funksjonen EndreGruppenavn()

export default EndreGruppenavn; 
