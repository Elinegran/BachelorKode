import React from 'react';
import axios from 'axios'; // for å sende/ motta til/ fra backend
import { useState } from "react"; // for å sende til backend
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstap
import { Container, Row, Col, Button, Form } from 'react-bootstrap'; // Bootstrap-greier

// Funksjon for å opprette en ny gruppe i databasen
function NyttMedlem(props) {
    const [idbruker, setIDbruker] = useState(0); // idbruker hentes fra inputfelt
    const gruppeID = props.senderGruppeID; // gruppeID sendes fra grupper.js
    //const [brukerliste, setBrukerliste] = useState([]);
    //const brukere = []; 

    // Henter brukere fra DB
    /* const bruker = () => {
        axios.get("http://localhost:3001/api/brukerGetAll")
      };
 */
    // Sender det nye gruppenavnet til backend
    const nyttMedlem = () => {
      axios.post("http://localhost:3001/api/addMedlem", { idbruker: idbruker, gruppeID: gruppeID })   
    };
  
    // Dette sendes til Meldingssiden
    return (
    <Form>
        <Row>
            {/* <Col>
                <select className="custom-select" id = "valgtBruker" onChange = {(event) => {setIDbruker(event.target.value);}}> 
                    <option selected>--Bruker--</option>
                    { this.state.brukere.map(alleBrukere => 
                    <option value={alleBrukere.idbruker}>{alleBrukere.fornavn} {alleBrukere.etternavn}</option>   
                    )}
                </select> 
            </Col> */}

            <Col>
                <Form.Group>
                    <Form.Control 
                        input type="text" 
                        placeholder="idbruker" 
                        style={{float: 'left'}} 
                        onChange = {(event) => {setIDbruker(event.target.value);}}/>
                </Form.Group>
            </Col>
            <Col>  
                <Button 
                    type="submit"
                    className="btn btn-success"
                    style={{float: 'right'}} 
                    onClick={nyttMedlem} 
                    > Legg til medlem
                </Button>
            </Col>
        </Row>        
    </Form> 
    ) // slutt på return()

} // slutt på funksjonen NyttMedlem()

export default NyttMedlem; 
