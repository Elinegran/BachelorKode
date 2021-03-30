import React from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstap
import { Accordion, Button, Card } from 'react-bootstrap'; // Bootstrap-greier
import SelectGruppemedlem from './Grupper/selectGruppemedlem.js'; // Komponent som henter brukerne fra backend

// Trengs denne?
//const gruppeID = 0; 

export default class Gruppeliste extends React.Component {
  constructor (props){
    super (props);
    this.state = {
    //gruppeID: gruppeID, // eller denne??
    gruppe: []
    }
  };
  
  /* state = {
    gruppe: []
  }
 */
  componentDidMount() {
    axios.get(`http://localhost:3001/api/meldingerMineGrupper`)
    /* {params: 
      {gruppeID:gruppeID}
    }) */
      .then(res => {
        const gruppe = res.data;
        this.setState({ gruppe });
      })
  }

  render() {
    return ( // Returnerer en kollaps-liste over alle gruppene, med en liste med medlemmer inni 
      <p>
        <h2> Alle grupper </h2>
      <Accordion>
      { this.state.gruppe.map(melding => 
        <Card>
            <Card.Header>
                <Accordion.Toggle as={Button} variant="link" eventKey={melding.gruppeID}><h2> {melding.gruppenavn} </h2></Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey={melding.gruppeID}>
                <Card.Body>
                  <SelectGruppemedlem gruppeIDFraGrupper={melding.gruppeID}/>
                </Card.Body> 
            </Accordion.Collapse>
        </Card>)}
      </Accordion>
      </p>
    ) // slutt på return
  } // slutt på render
} // slutt på funksjon Gruppeliste
