import React from 'react';
import axios from 'axios'; // for å sende/ motta til/ fra backend
import { useState } from "react"; // for å sende til backend
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstap
import { Container, Row, Col, Button, Form } from 'react-bootstrap'; // Bootstrap-greier
import SelectGruppe from './selextGruppe.js'; // Komponent som henter gruppene fra backend
import SelectBrukere from '../Felles/selectBruker.js'; // Komponent som henter brukerne fra backend

// Funksjon for å legge til et nytt gruppemedlem i databasen
function NyttMedlem() {
    const [gruppeID, setGruppeID] = useState(0); // tomt tall 
    const [idbruker, setIDbruker] = useState(0); // tomt tall
    const [gruppeliste, setGruppeliste] = useState([]); // tom liste

    // Sender det nye gruppenavnet til backend
    const addMedlem = () => {
      axios.post("http://localhost:3001/api/grupperNyeGruppemedlemmer", { gruppeID: gruppeID, idbruker: idbruker, })   
    };

    // Dette sendes til Meldingssiden
    return (
        <Container fluid>
            <Form>
                <Row>
                    <Col>
                        <Form.Label>Legg til gruppemedlem</Form.Label>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <SelectGruppe />
                    </Col>
                
                    <Col>
                        <SelectBrukere />
                    </Col>
                </Row>
                <Row><Col>
                <Button onClick={addMedlem} variant="success" type="submit">Lagre medlem</Button></Col></Row>
            </Form>
        </Container> 
    ) // slutt på return()

} // slutt på funksjonen NyttMedlem()

export default NyttMedlem; 

