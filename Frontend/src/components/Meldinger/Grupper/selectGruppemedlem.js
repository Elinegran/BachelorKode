import React from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstap
import { Card, Accordion, Container, Row, Col, Button, Form } from 'react-bootstrap'; // Bootstrap-greier
import NyttMedlem from './nyttGruppemedlem.js';

export default class SelectGruppemedlem extends React.Component {
  state = { bruker: [] }
  

  componentDidMount() {
    axios.get(`http://localhost:3001/api/gruppeGetMedlemmer`)
      .then(res => {
        const bruker = res.data;
        this.setState({ bruker });
      })
  }

  // Returnerer en liste over medlemmene i gruppa
  render() {
    return(
      <p>
        <p>
          <h3>Send gruppemelding</h3>
          <Row> 
            <Col><input></input></Col>
            <Col><Button type="button" className="btn btn-success" style={{float: 'right'}}>Send</Button></Col>
          </Row>
        </p>
        <p>
          <NyttMedlem />
        </p>
        <p>
          <h3>Rediger gruppe</h3>
        <Row> 
          <Col><Button type="button" className="btn btn-success" style={{float: 'left'}}>Endre navn</Button></Col>
          <Col><Button type="button" className="btn btn-warning" style={{float: 'right'}}>Slett gruppe</Button></Col>
        </Row>
        </p>
        <p>
          <h3>Medlemmer</h3>
        <ul className="list-group">
        { this.state.bruker.map(alleBrukere => 
          <li className="list-group-item">
            <Row> 
              <Col> { alleBrukere.idbruker } { alleBrukere.fornavn } { alleBrukere.etternavn } </Col>
              <Col><Button type="button" className="btn btn-warning btn-sm" style={{float: 'right'}}>Slett medlem</Button></Col>
            </Row>
          </li>
        )} 
        </ul> 
        </p>
      </p>         
    ) // slutt på return
  } // slutt på render
} // slutt på klasse SelectGruppemedlem
