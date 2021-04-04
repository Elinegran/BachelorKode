import React from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstap
import { Accordion, Button, Card, Row, Col } from 'react-bootstrap'; // Bootstrap-greier
import SelectGruppemedlem from './Grupper/selectGruppemedlem.js'; // Komponent som henter brukerne fra backend
import NyttMedlem from './Grupper/nyttMedlem.js';
import SlettGruppe from './Grupper/slettGruppe';
import EndreGruppenavn from './Grupper/endreGruppenavn'; 

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
      <p>
      <h2> Alle grupper </h2>
      <Accordion>
      {this.state.gruppe.map(melding => 
        <Card>
          <Card.Header>
            <Accordion.Toggle as={Button} variant="link" eventKey={melding.gruppeID}>
              <h2> {melding.gruppeID} {melding.gruppenavn} </h2>
            </Accordion.Toggle>
          </Card.Header>

          <Accordion.Collapse eventKey={melding.gruppeID}>
            <Card.Body>
              <p>
                <h3>Send gruppemelding</h3>
                <Row> 
                  <Col><input></input></Col>
                  <Col><Button type="button" className="btn btn-success" style={{float: 'right'}}>Send</Button></Col>
                </Row>
              </p>
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
      </p>
    ) // slutt på return
  } // slutt på render
} // slutt på funksjon Gruppeliste
