import React from 'react';
import axios from 'axios'; // for å sende/ motta til/ fra backend
import { useState } from "react"; // for å sende til backend
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstap
import { Container, Row, Col, Button, Form } from 'react-bootstrap'; // Bootstrap-greier

// Funksjon for å opprette en ny gruppe i databasen
function NyGruppe() {
    const [gruppenavn, setGruppenavn] = useState("");

    // Sender det nye gruppenavnet til backend
    const addGruppe = () => {
      axios.post("http://localhost:3001/api/grupperNyeGrupper", { gruppenavn: gruppenavn, }) 
      .then((response) => {
        if(response.data) {alert("Du lagret " + gruppenavn); }
        else {alert("Gruppa finnes fra før!");}
      });
       
    }; // slutt på addGruppe
  
    // Dette sendes til Meldingssiden
    return (
      
            <Form>
                <Row>
                    <Col>
                        <Form.Label><h2>Opprett en ny gruppe</h2></Form.Label>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group>
                            <Form.Control input type="text" placeholder="Gruppenavn" style={{float: 'right'}} onChange = {(event) => {setGruppenavn(event.target.value);}}/>
                        </Form.Group>
                    </Col>
                    <Col>  
                        <Button onClick={addGruppe} variant="success" style={{float: 'left'}} type="submit">Opprett gruppe</Button>
                    </Col>
                </Row>        
            </Form> 
    
    ) // slutt på return()

} // slutt på funksjonen NyGruppe()

export default NyGruppe; 

