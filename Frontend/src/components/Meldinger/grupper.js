import React from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstap
import { Accordion, Button, Card, Row, Col, Container } from 'react-bootstrap'; // Bootstrap-greier
import SelectGruppemedlem from './Grupper/selectGruppemedlem.js'; // Komponent som henter brukerne fra backend
import NyttMedlem from './Grupper/nyttMedlem.js';
import SlettGruppe from './Grupper/slettGruppe';
import EndreGruppenavn from './Grupper/endreGruppenavn'; 
import Gruppemelding from './Grupper/gruppemelding'; 

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
              <h2> Alle </h2>
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey={"Alle"}>
            <Card.Body>
              <h3>Send melding til alle</h3>
            </Card.Body> 
          </Accordion.Collapse>
        </Card>
      {this.state.gruppe.map(melding => 
        <Card>
          <Card.Header>
            <Accordion.Toggle as={Button} variant="link" eventKey={melding.gruppeID}>
              <h2> {melding.gruppeID} {melding.gruppenavn} </h2>
            </Accordion.Toggle>
          </Card.Header>

          <Accordion.Collapse eventKey={melding.gruppeID}>
            <Card.Body>
              <Gruppemelding />
              <p>
                <NyttMedlem senderGruppeID={melding.gruppeID} senderID={melding.gruppeID}/> 
              </p>
              <p>
                <h3>Rediger gruppe</h3>
                <Row> 
                  <Col> <EndreGruppenavn sendeGruppeID={melding.gruppeID} /> </Col>
                  <Col> <SlettGruppe senderGruppeID={melding.gruppeID}/> </Col>
                </Row>
              </p>
        
              <SelectGruppemedlem gruppeIDFraGrupper={melding.gruppeID} />
            </Card.Body> 
          </Accordion.Collapse>
        </Card>)}
      </Accordion>
      </article>
    ) // slutt på return
  } // slutt på render
} // slutt på funksjon Gruppeliste
