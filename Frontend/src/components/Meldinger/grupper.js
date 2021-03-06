import React from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstap
import { Accordion, Button, Card, Row, Col, Container } from 'react-bootstrap'; // Bootstrap-greier
import SelectGruppemedlem from './Grupper/selectGruppemedlem.js'; // Komponent som henter brukerne fra backend
import NyttMedlem from './Grupper/nyttGruppemedlem';
import SlettGruppe from './Grupper/slettGruppe';
import EndreGruppenavn from './Grupper/endreGruppenavn'; 
import Gruppemelding from './Grupper/gruppemelding'; 
import MeldingTilAlle from './Grupper/meldingTilAlle';

// Klasse som returnerer en liste med gruppene
export default class Gruppeliste extends React.Component {
  constructor (props){
    super (props);
    this.state = {
    gruppe: []
    }
  };
  
  componentDidMount() {
    axios.get(`http://localhost:3001/api/meldingerMineGrupper`)
    
      .then(res => {
        const gruppe = res.data;
        this.setState({ gruppe });
      })
  }

  render() {
    return ( // Returnerer en kollaps-liste over alle gruppene, med en liste med medlemmer inni 
      <article>
      <h2 className="container p-3"> Alle grupper </h2>
      <Accordion>
        <Card>
          <Card.Header>
            <Accordion.Toggle as={Button} variant="link" eventKey={"Alle"}>
              <h2> Alle brukere </h2>
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey={"Alle"}>
            <Card.Body>
              <MeldingTilAlle />
            </Card.Body> 
          </Accordion.Collapse>
        </Card>
      {this.state.gruppe.map(melding => 
        <Card>
          <Card.Header>
            <Accordion.Toggle as={Button} variant="link" eventKey={melding.gruppeID}>
              <h2> {melding.gruppenavn} </h2>
            </Accordion.Toggle>
          </Card.Header>

          <Accordion.Collapse eventKey={melding.gruppeID}>
            <Card.Body>

              <Gruppemelding gruppeID ={melding.gruppeID} gruppenavn={melding.gruppenavn}/>
              <NyttMedlem senderGruppeID={melding.gruppeID} senderGruppenavn={melding.gruppenavn}/>  
              <EndreGruppenavn sendeGruppeID={melding.gruppeID} /> 
              <SelectGruppemedlem gruppeIDFraGrupper={melding.gruppeID} />
              <SlettGruppe senderGruppeID={melding.gruppeID} senderGruppenavn={melding.gruppenavn}/> 
              
            </Card.Body> 
          </Accordion.Collapse>
        </Card>)}
      </Accordion>
      </article>
    ) // slutt p?? return
  } // slutt p?? render
} // slutt p?? funksjon Gruppeliste
