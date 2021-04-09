import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstap
import { Row, Col, Button } from 'react-bootstrap'; // Bootstrap-greier
import AuthService from '../../../services/auth.service'; 
// import { useState } from "react"; // for å sende til backend
import SlettMedlem from './slettMedlem';

const brukertype = AuthService.getRole(); 

export default class SelectGruppemedlem extends React.Component {
  constructor (props){
    super (props);
    this.state = {
    gruppeID: this.props.gruppeIDFraGrupper,
    bruker: [],
    veileder: false,
    idbruker: 0, 
    }
  };
  
  componentDidMount() {
    
    // Tester om den innloggede er veileder
    if(brukertype == 2){ this.setState({veileder:true})}
    else { this.setState({veileder:false }) }
    
    // Henter medlemmene i denne gruppa
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

    
  } // Slutt på componentDidMount

 /*  function slettMedlem() {
    const [idbruker, setIDbruker] = useState(0); // idbruker hentes fra inputfelt
    const gruppeID = setGruppeID] = useState(0); // gruppeID sendes fra grupper.js
    
  // Sender medlemmet som skal slettes til Backend
  const slettMedlem = () => { 
    axios.delete(`http://localhost:3001/api/deleteMedlem`, { idbruker: idbruker, gruppeID: gruppeID }) 
  
    
  };  */

  // Returnerer en liste over medlemmene i gruppa
  render() {
    return(
      <p>
        
        <h5>Medlemmer</h5>
        <ul className="list-group">
        { this.state.bruker.map(alleBrukere => 
          <li className="list-group-item">
            <Row> 
              <Col> { alleBrukere.idbruker } { alleBrukere.fornavn } { alleBrukere.etternavn } </Col>
              {!this.state.veileder // Slett-knappen skal bare være synlig for Veiledere
              ? null 
              : (  
              <Col>
                <SlettMedlem senderIDbruker={alleBrukere.idbruker} senderGruppeID={alleBrukere.gruppeID}/>
              </Col>
              )}
            </Row>
          </li>
        )} 
        </ul> 
        </p>
            
    ) // slutt på return
  } // slutt på render
} // slutt på klasse SelectGruppemedlem
