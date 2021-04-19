import React from 'react';
import axios from 'axios';
import '../../pages/Meldinger/Meldinger.css';
// Bootstap
import 'bootstrap/dist/css/bootstrap.min.css';
import { Accordion, Button, Card } from 'react-bootstrap'; 
import Samtaleliste from '../../components/Meldinger/samtaler.js';
import AuthService from '../../services/auth.service'; 
import moment from 'moment';


const idbruker = AuthService.getUserId();

 
const meldingLest = (event) => {
  console.log(event);
}



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
              <Accordion.Toggle as={Button} 
                                variant="link" 
                                onClick = {() =>console.log(axios.post("http://localhost:3001/api/meldingLest", { meldingsID: melding.meldingsID, }) )} 
                                eventKey={melding.meldingsID}>
                    <h2 className = "innboksMelding">
                     <p> {melding.meldingLest != '0000-00-00 00:00:00' ? null : <span class="badge badge-pill badge-warning"> Ny </span>}</p>
                     <p> {melding.fornavn} {melding.etternavn} 
                      <br></br>
                      {moment(melding.tid).format("DD-MM-YYYY HH:mm")}</p>

                    </h2>
                                    
                  </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey={melding.meldingsID}>
                <Card.Body> 
                  <Samtaleliste idbrukerFraInnboks={melding.avsender}  meldingLest={melding.meldingLest}/> 
                  
                </Card.Body> 
            </Accordion.Collapse>
          </Card>
          )}
        </Accordion> 
        ) // slutt på return
    } // slutt på render

} // slutt på klasse



