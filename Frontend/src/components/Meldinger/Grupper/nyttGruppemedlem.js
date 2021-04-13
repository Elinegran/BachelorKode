import React from 'react';
import axios from 'axios'; // for å sende/ motta til/ fra backend
import { useState } from "react"; // for å sende til backend
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstap
import { Container, Row, Col, Button, Form } from 'react-bootstrap'; // Bootstrap-greier
import SelectGruppe from './selextGruppe.js'; // Komponent som henter gruppene fra backend
import SelectBrukere from '../Felles/selectBruker.js'; // Komponent som henter brukerne fra backend


// Klasse for å legge til et nytt gruppemedlem i databasen
export default class NyttMedlem extends React.Component {
    constructor (props){
        super (props);
        this.state = {
            idbruker: this.props.senderID, 
            gruppeID: this.props.senderGruppeID, // gruppeID sendes fra selectGruppemedlem.js
        };

        this.handleSelect = this.handleSelect.bind(this);
    }

    
    handleSelect(value){
        this.setState({idbruker: value })
        
    };
    

    render(){
        // Dette sendes til Meldingssiden
        return (
            <p>
                <Form>
                    <Row>
                        <Col>
                            <Form.Label><h3>Legg til medlem</h3></Form.Label>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <SelectBrukere onHandleSelect={this.handleSelect} />
                        </Col>
                        <Col>
                            {/* <Form.Group>
                                <Form.Control type="text" placeholder="idbruker" onChange = {this.handleSelect} />
                            </Form.Group> */}
                        </Col>
                        <Col>
                            <Button variant="success" type="submit" onClick = {this.handleSend} style={{float: 'right'}}>Lagre medlem</Button>
                        </Col>
                    </Row>   
                </Form>
            </p>
        ) // slutt på return()
    } // Slutt på render

    handleSend = (event) => {
        alert("Du la til: " + this.state.idbruker);

        const nyttMedlem = {
            idbruker: this.state.idbruker,
            gruppeID: this.state.gruppeID    
        };

    // Sender til Backend
    axios.post(`http://localhost:3001/api/addMedlem`, nyttMedlem)
        .then(response => {
            console.log(response)
        })
        .catch(error => {
            console.log(error)
        })
    }
} // slutt på Klasse NyttMedlem