import React from 'react';
import axios from 'axios';
import '../../pages/Meldinger/Meldinger.css';
// Bootstap
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Button, Alert, Breadcrumb, Card, Form } from 'react-bootstrap'; 

export default class Meldingsliste extends React.Component {
  state = {
    meldinger: []
  }

  componentDidMount() {
    axios.get(`http://localhost:3001/api/meldingerMineMeldinger`)
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
}