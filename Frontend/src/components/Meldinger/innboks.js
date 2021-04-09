import React from 'react';
import axios from 'axios';
import '../../pages/Meldinger/Meldinger.css';
// Bootstap
import 'bootstrap/dist/css/bootstrap.min.css';
import { Accordion, Container, Row, Col, Button, Alert, Breadcrumb, Card, Form } from 'react-bootstrap'; 
import Samtaleliste from '../../components/Meldinger/samtaler.js';
import AuthService from '../../services/auth.service'; 
import Skrivemeldinger from '../../components/Meldinger/skriveMelding.js';
import SimpleDateTime  from 'react-simple-timestamp-to-date'; // Formatere tid og dato
import MeldingLest from './meldingLest'; 

const idbruker = AuthService.getUserId();
// alert(idbruker);
 

export default class Meldingsliste extends React.Component {
  constructor (props){
    super (props);
    this.state = {
    idbruker: idbruker,
    meldinger: []
    }
  };

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



  render() {
    return (
        <Accordion>
          { this.state.meldinger.map(melding => 
          <Card>
              <Card.Header>
                  <Accordion.Toggle as={Button} variant="link" eventKey={melding.meldingsID} 
                                    onClick={<MeldingLest senderID={melding.meldingsID}/>}>
                    <h2>
                      <span className="badge badge-pill badge-warning"> Ny </span>
                      {melding.fornavn} {melding.etternavn} 
                    </h2>  
                    <p>
                      <SimpleDateTime dateFormat="DMY" timeFormat="HMA" dateSeparator="." timeSeparator=":"
                      showTime="1" showDate="1" >
                      {melding.tid}</SimpleDateTime>
                    </p>
                                    
                  </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey={melding.meldingsID}>
                <Card.Body> 
                  <Samtaleliste idbrukerFraInnboks={melding.avsender}/> 
                  
                </Card.Body> 
            </Accordion.Collapse>
          </Card>
          )}
        </Accordion> 
        ) // slutt på return
    } // slutt på render

} // slutt på klasse



