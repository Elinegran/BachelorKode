import React from 'react';
import axios from 'axios';
import '../../pages/Meldinger/Meldinger.css';
// Bootstap
import 'bootstrap/dist/css/bootstrap.min.css';
import { Accordion, Container, Row, Col, Button, Alert, Breadcrumb, Card, Form } from 'react-bootstrap'; 
import Samtaleliste from '../../components/Meldinger/samtaler.js';
import AuthService from '../../services/auth.service'; 

const idbruker = AuthService.getUserId();
alert(idbruker);

export default class Meldingsliste extends React.Component {
  state = {
    idbruker: idbruker,
    meldinger: []
  }

  componentDidMount() {
    axios.get(`http://localhost:3001/api/meldingerMineMeldinger`, 
    {params: 
      {idbruker:idbruker}
    })
      .then(res => {
        const meldinger = res.data;
        this.setState({ meldinger });
      })
  }

 /*  render() {
    return (
      <ul>
        { this.state.meldinger.map(melding => 
            <li key = {melding.idbruker}> { melding.tid } 
                                          { melding.fornavn } 
                                          { melding.etternavn } 
                                          { melding.melding }</li>)}
      </ul>+
    )
  }
} */
  render() {
    return (

        <Accordion>
          { this.state.meldinger.map(melding => 
        
          <Card>
              <Card.Header>
                  <Accordion.Toggle as={Button} variant="link" eventKey={melding.meldingsID}>
                    <h2>{melding.fornavn} {melding.etternavn} {melding.avsender} {melding.mottaker} {melding.tid} </h2>
                  </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey={melding.meldingsID}>
                <Card.Body>hei hei hei </Card.Body> 
            </Accordion.Collapse>
          </Card>
          )}
        </Accordion>
        ) // slutt på return
    } // slutt på render
}


/* 
render() {
  return (
    <p>
    { this.state.meldinger.map(melding => 
    <Card className = "mb-3"> 
      <Card.Body>
        <Card.Title><h2>{melding.fornavn}</h2></Card.Title>
        <Card.Text><p>{melding.melding}</p></Card.Text>
      </Card.Body>
    </Card>
    )}
    </p>
  )
}
} */