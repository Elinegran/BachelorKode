import React from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstap
import { Accordion, Button, Card, Row, Col, Container } from 'react-bootstrap'; // Bootstrap-greier
import SelectGruppemedlem from './selectGruppemedlem.js'; // Komponent som henter brukerne fra backend 
/* import MeldingTilAlle from './Grupper/meldingTilAlle'; */

import AuthService from '../../../services/auth.service'; 

const innlogget = AuthService.getUserId(); // Den brukeren som er innlogget

export default class MinGruppeliste extends React.Component {
  constructor (props){
    super (props);
    this.state = {
    gruppe: []
    }
  };
  
  componentDidMount() {
    axios.get(`http://localhost:3001/api/brukerGrupper`, {params: 
    {idbruker: innlogget}
    })
    
      .then(res => {
        const gruppe = res.data;
        this.setState({ gruppe });
      })
  }

  render() {
    return ( // Returnerer en kollaps-liste over alle gruppene, med en liste med medlemmer inni 
      <article>
      
      <Accordion>
        
      {this.state.gruppe.map(melding => 
        <Card>
          <Card.Header>
            <Accordion.Toggle as={Button} variant="link" eventKey={melding.gruppeID}>
              <h2> {melding.gruppenavn} </h2>
            </Accordion.Toggle>
          </Card.Header>

          <Accordion.Collapse eventKey={melding.gruppeID}>
            <Card.Body>
                <SelectGruppemedlem gruppeIDFraGrupper={melding.gruppeID} /> 
            </Card.Body> 
          </Accordion.Collapse>
        </Card>)}
      </Accordion>
      </article>
    ) // slutt på return
  } // slutt på render
} // slutt på funksjon Gruppeliste
