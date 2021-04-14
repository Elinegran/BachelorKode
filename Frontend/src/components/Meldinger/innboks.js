import React from 'react';
import axios from 'axios';
import '../../pages/Meldinger/Meldinger.css';
// Bootstap
import 'bootstrap/dist/css/bootstrap.min.css';
import { Accordion, Button, Card } from 'react-bootstrap'; 
import Samtaleliste from '../../components/Meldinger/samtaler.js';
import AuthService from '../../services/auth.service'; 
import SimpleDateTime  from 'react-simple-timestamp-to-date'; // Formatere tid og dato

const idbruker = AuthService.getUserId();

 

const meldingLest = (event) => {
  console.log(event);
}



export default class Meldingsliste extends React.Component {
  constructor (props){
    super (props);
    this.state = {
    idbruker: idbruker,
    // meldingLest: false,
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
              <Accordion.Toggle as={Button} 
                                variant="link" 
                                onClick = {() =>console.log(axios.post("http://localhost:3001/api/meldingLest", { meldingsID: melding.meldingsID, }) )} //{<MeldingLest senderID={melding.meldingsID}/>} 
                                eventKey={melding.meldingsID}>
                    <h2>
                      {melding.meldingLest != '0000-00-00 00:00:00' ? null : <span class="badge badge-pill badge-warning"> Ny </span>}
                      
                      {melding.fornavn} {melding.etternavn}  
                      <br></br>

                      <SimpleDateTime dateFormat="DMY" timeFormat="HMA" dateSeparator="." timeSeparator=":"
                      showTime="1" showDate="1" >
                      {melding.tid}</SimpleDateTime>
                    </h2>
                                    
                  </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey={melding.meldingsID}>
                <Card.Body> 
                  <Samtaleliste idbrukerFraInnboks={melding.avsender} meldingLest={melding.meldingLest}/> 
                  
                </Card.Body> 
            </Accordion.Collapse>
          </Card>
          )}
        </Accordion> 
        ) // slutt på return
    } // slutt på render

} // slutt på klasse



