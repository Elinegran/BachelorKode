import React from 'react';
import axios from 'axios';
// Bootstap
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Button, Alert, Breadcrumb, Card, Form } from 'react-bootstrap'; 

export default class Samtaleliste extends React.Component {
  state = {
    samtale: []
  }

  componentDidMount() {
    axios.get(`http://localhost:3001/api/meldingerMinSamtale`)
      .then(res => {
        const samtale = res.data;
        this.setState({ samtale });
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
      </ul>
    )
  }
} */

render() {
  return (
    <p>
    { this.state.samtale.map(melding => 
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