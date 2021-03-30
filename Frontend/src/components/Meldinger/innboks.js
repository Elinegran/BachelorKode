import React from 'react';
import axios from 'axios';
import '../../pages/Meldinger/Meldinger.css';
// Bootstap
import 'bootstrap/dist/css/bootstrap.min.css';
import { Accordion, Container, Row, Col, Button, Alert, Breadcrumb, Card, Form } from 'react-bootstrap'; 
import Samtaleliste from '../../components/Meldinger/samtaler.js';
import AuthService from '../../services/auth.service'; 
import Skrivemeldinger from '../../components/Meldinger/skriveMelding.js';

const idbruker = AuthService.getUserId();
// alert(idbruker);
 

export default class Meldingsliste extends React.Component {
<<<<<<< HEAD
  constructor(props){
    super(props);
    this.state = {
      idbruker: idbruker,
      meldinger: [], 
      id: 4,
    }
  }
  
    /* state = {
    idbruker: idbruker,
    meldinger: []
  } */
=======
  constructor (props){
    super (props);
    this.state = {
    idbruker: idbruker,
    meldinger: []
    }
  };
>>>>>>> 7c47f4af575c4075723b80cf47b5201515ff6283

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

<<<<<<< HEAD
    const {id} = this.state;
=======
    // const id = 4; 
    
>>>>>>> 7c47f4af575c4075723b80cf47b5201515ff6283

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
                <Card.Body> 
<<<<<<< HEAD
                  
                  {melding.melding}
                  <Samtaleliste />
=======
                  <Samtaleliste idbrukerFraInnboks={melding.avsender}/> 
>>>>>>> 7c47f4af575c4075723b80cf47b5201515ff6283
                  
                </Card.Body> 
            </Accordion.Collapse>
          </Card>
          )}
        </Accordion> 
        ) // slutt på return
    } // slutt på render

} // slutt på klasse



