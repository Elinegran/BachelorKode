import React from 'react';
import axios from 'axios'; // for å sende/ motta til/ fra backend
import { useState } from "react"; // for å sende til backend
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstap
import { Container, Row, Col, Button, Form } from 'react-bootstrap'; // Bootstrap-greier
// import DropdownBruker from '../Felles/dropdownBruker';
// import SelectBrukere from '../Felles/selectBruker';

// Funksjon for å opprette en ny gruppe i databasen
function NyttMedlem(props) {
    const [idbruker, setIDbruker] = useState(0); // idbruker hentes fra inputfelt
    const gruppeID = props.senderGruppeID; // gruppeID sendes fra grupper.js
    
    // Sender det nye gruppenavnet til backend
    const nyttMedlem = () => {
      axios.post("http://localhost:3001/api/addMedlem", { idbruker: idbruker, gruppeID: gruppeID }) 
      alert('Nytt medlem lagret!' );   
    };
  
    // Dette sendes til Meldingssiden
    return (
    <p>
    <Form>
        <label> Legg til nytt medlem: </label>
        <Row>   
            <Col>
                {/* <SelectBrukere /> */}
                <Form.Group>
                    <Form.Control 
                        input type="text" 
                        placeholder="idbruker" 
                        style={{float: 'right'}} 
                        onChange = {(event) => {setIDbruker(event.target.value);}}/> 
                </Form.Group> 
            </Col>
            <Col>  
                <Button 
                    type="submit"
                    className="btn btn-success"
                    style={{float: 'left'}} 
                    onClick={nyttMedlem} 
                    > Legg til medlem
                </Button>
            </Col>
        </Row>        
    </Form>
    </p> 
    ) // slutt på return()

} // slutt på funksjonen NyttMedlem()

export default NyttMedlem; 
