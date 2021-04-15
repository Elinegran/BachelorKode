import React from 'react';
import axios from 'axios'; // for å sende/ motta til/ fra backend
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstap
import { Row, Col, Button, Form } from 'react-bootstrap'; // Bootstrap-greier
import SelectBrukere from '../Felles/selectBruker.js'; // Komponent som henter brukerne fra backend

// Klasse for å legge til et nytt gruppemedlem i databasen
export default class NyttMedlem extends React.Component {
    constructor (props){
        super (props);
        this.state = { 
            gruppeID: this.props.senderGruppeID, 
        };

        // Binder det som blir mottatt fra selectBruker.js
        this.handleSelect = this.handleSelect.bind(this);
    }

    // Mottar veridien fra selectBruker.js, og setter idbruker til denne verdien
    handleSelect(value){
        this.setState({idbruker: value })
        
    };
    
    render(){
        // Dette sendes til Meldingssiden for veileder
        return (
            <p>
                <Form>
                    <Row>
                        <Col>
                            <Form.Label>Legg til medlem:</Form.Label>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <SelectBrukere onHandleSelect={this.handleSelect} />
                        </Col>
                        <Col>
                            <Button variant="success" 
                            type="submit" onClick = {this.handleSend} 
                            style={{float: 'left'}}>Lagre medlem</Button>
                        </Col>
                    </Row>   
                </Form>
            </p>
        ) // slutt på return()
    } // Slutt på render

    // Sender til Backend
    handleSend = (event) => {
        
        // verdiene som sendes
        const nyttMedlem = {
            idbruker: this.state.idbruker,
            gruppeID: this.state.gruppeID    
        };

    axios.post(`http://localhost:3001/api/addMedlem`, nyttMedlem)
        .then(response => {
            console.log(response)
            
        })
        .catch(error => {
            console.log(error)
        })
        alert("Medlem lagt til."); // Tilbakemelding til veileder
    }

} // slutt på Klasse NyttMedlem