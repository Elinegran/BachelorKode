import React from 'react';
import axios from 'axios';
// Bootstap
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Button, Alert, Breadcrumb, Card, Form } from 'react-bootstrap';
import SelectGruppemedlem from './Grupper/selectGruppemedlem.js'; // Komponent som henter brukerne fra backend


export default class Gruppeliste extends React.Component {
  state = {
    gruppe: []
  }

  componentDidMount() {
    axios.get(`http://localhost:3001/api/meldingerMineGrupper`)
      .then(res => {
        const gruppe = res.data;
        this.setState({ gruppe });
      })
  }

  render() {
    return (
      <p>
      { this.state.gruppe.map(melding => 
      <Card className = "mb-3"> 
        <Card.Body>
          <Card.Title><h2>{melding.gruppenavn}</h2></Card.Title>
          <SelectGruppemedlem />
        </Card.Body>
      </Card>
      )}
      </p>
    ) 
  }
}
