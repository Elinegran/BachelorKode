import React from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstap
import { Card, Accordion, Container, Row, Col, Button, Form } from 'react-bootstrap'; // Bootstrap-greier
import NyttMedlem from './nyttGruppemedlem.js';
import SlettGruppe from './slettGruppe';

export default class SelectGruppemedlem extends React.Component {
  constructor (props){
    super (props);
    this.state = {
    gruppeID: this.props.gruppeIDFraGrupper,
    bruker: [],
    }
  };
  
  componentDidMount() {
    //alert('Gruppe fra frontend: '+ this.state.gruppeID)
    axios.get(`http://localhost:3001/api/gruppeGetMedlemmer`,
    {params: 
      {
      gruppeID: this.state.gruppeID}
      
    })
      .then(res => {
        const bruker = res.data;
        this.setState({ bruker });
      })
      .catch(error => {
        console.log(error)
        console.log("message")
      })
  }

  // Returnerer en liste over medlemmene i gruppa
  render() {
    return(
      <p>
        {/* <p>
          <h3>Send gruppemelding</h3>
          <Row> 
            <Col><input></input></Col>
            <Col><Button type="button" className="btn btn-success" style={{float: 'right'}}>Send</Button></Col>
          </Row>
        </p> */}
        {/* <p>
          <NyttMedlem senderGruppeID={this.state.gruppeID}/>
        </p>
        <p>
          <h3>Rediger gruppe</h3>
        <Row> 
          <Col><Button type="button" className="btn btn-success" style={{float: 'left'}}>Endre navn</Button></Col>
          <Col> <SlettGruppe senderGruppeID={this.state.gruppeID}/> </Col>
        </Row>
        </p>
        <p> */}
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
            
    ) // slutt på return
  } // slutt på render
} // slutt på klasse SelectGruppemedlem
