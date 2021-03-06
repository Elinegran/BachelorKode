import React from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';// Bootstap
import {  Card } from 'react-bootstrap'; 
import AuthService from '../../services/auth.service'; 
import Skrivemeldinger from '../../components/Meldinger/skriveMelding.js';
import moment from 'moment';

const idbruker = AuthService.getUserId();

// Klasse som viser samtalen mellom to brukere
export default class Samtaleliste extends React.Component {
  constructor (props){
    super (props);
    this.state = {
    avsender: this.props.idbrukerFraInnboks,
    meldingLest: this.props.meldingLest,
    idbruker: idbruker,
    samtale: [],
    }
  };

  componentDidMount() {
    axios.get(`http://localhost:3001/api/meldingerMinSamtale`,
    {params: 
      {idbruker: idbruker,
      avsender: this.state.avsender,
      mottaker: this.state.mottaker}
      
    })
      .then(res => {
        const samtale = res.data;
        this.setState({ samtale });
      })
  }

render() {

  return (
    <p>
    <Skrivemeldinger mottakerID = {this.state.avsender} />
    { this.state.samtale.map(melding => 
    <Card> 
      {melding.mottaker == idbruker ? <Card.Body className= "card-body text-left">

    <Card.Title><h2>{melding.fornavn} {melding.etternavn}</h2></Card.Title>
        <Card.Text>
          <p>{melding.melding}</p>
          <p className= "tidMelding">{moment(melding.tid).format("DD-MM-YYYY HH:mm")}</p>
          <p> {/* Tester om meldingen er lest */}
            {melding.meldingLest ? null : 
              <span class="badge badge-pill badge-success">
                Meldingen er lest {moment(melding.meldingLest).format("DD-MM-YYYY HH:mm")}                
              </span>}
          </p>    
    </Card.Text>

    </Card.Body>
    : <Card.Body className= "card-body text-right">
        <Card.Title><h2>{melding.fornavn} {melding.etternavn}</h2></Card.Title>
        <Card.Text>
          <p>{melding.melding}</p>
          <p className= "tidMelding">{moment(melding.tid).format("DD-MM-YYYY HH:mm")}</p>
          <p> {/* Tester om meldingen er lest */}
            {melding.meldingLest == '0000-00-00 00:00:00' ? null : 
              <span class="badge badge-pill badge-success">
                Meldingen er lest {moment(melding.meldingLest).format("DD-MM-YYYY HH:mm")}                
              </span>}
          </p>           
        </Card.Text>

      </Card.Body>
      }
      
      
    </Card>
    )}
    </p>
  )
}


} 

