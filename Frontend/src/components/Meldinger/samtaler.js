import React from 'react';
import axios from 'axios';
// Bootstap
import 'bootstrap/dist/css/bootstrap.min.css';
import { Accordion, Container, Row, Col, Button, Alert, Breadcrumb, Card, Form } from 'react-bootstrap'; 
import AuthService from '../../services/auth.service'; 
import Skrivemelding from './skriveMelding';
import Skrivemeldinger from '../../components/Meldinger/skriveMelding.js';




const idbruker = AuthService.getUserId();
// const avsender = 4; // Obs! Denne må hentes fra innboks.js (jeg vet bare ikke hvordan...)


export default class Samtaleliste extends React.Component {
  constructor (props){
    super (props);
    this.state = {
    avsender: this.props.idbrukerFraInnboks,
    idbruker: idbruker,
    samtale: [],
    }
  };

  componentDidMount() {
    axios.get(`http://localhost:3001/api/meldingerMinSamtale`,
    {params: 
      {idbruker: idbruker,
      avsender: this.state.avsender}
      
    })
      .then(res => {
        const samtale = res.data;
        this.setState({ samtale });
      })
  }

render() {
  return (
    <p>
    { this.state.samtale.map(melding => 
    <Card> 
      <Card.Body>
        <Card.Title><h2>{melding.fornavn} {melding.etternavn}</h2></Card.Title>
        <Card.Text><p>{melding.melding}</p></Card.Text>
      </Card.Body>
    </Card>
    )}
    <Skrivemeldinger mottakerID = {this.state.avsender} />
    </p>
  )
}


} 

