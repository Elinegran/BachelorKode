import React from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import {InputGroup,Accordion, Card, Button, InputFelt, Row, Col} from 'react-bootstrap'
import FormControl from 'react-bootstrap/FormControl'
import Form from 'react-bootstrap/Form'
import SelectBrukere from '../Meldinger/Felles/selectBruker';
import SelectGruppe from '../Meldinger/Grupper/selextGruppe';
import Gruppeliste from '../Meldinger/grupper';
import HentAlleLenker from './hentAlleLenker';
import LeggeTilLenke from './leggeTilLenke';



export default class SelectLenker extends React.Component {
    constructor (props){
      super (props);
      this.state = {
      lenker: [],
      }
    };
    
    // componentDidMount() {
    //   //alert('Gruppe fra frontend: '+ this.state.gruppeID)
    //   axios.get(`http://localhost:3001/api/getLenker`)
    //     .then(res => {
    //       const lenker = res.data;
    //       this.setState({ lenker });
    //     })
    //     .catch(error => {
    //       console.log(error)
    //       console.log("message")
    //     })
    // }
  
    // Returnerer en liste over medlemmene i gruppa
    render() {

// export const LenkeV = ({}) => {
    return (

    <container>
        {/* <Form>
            <LeggeTilLenke/>
        </Form> */}

        <Form>
            <Form.Group controlId="exampleForm.SelectCustom">
            {/* <Form.Label>Velg en gruppe</Form.Label> */}
            <SelectGruppe/>
            </Form.Group>
        </Form>

        <label><b>eller velg</b></label>

        <Form>
            <Form.Group controlId="exampleForm.SelectCustom">
            {/* <Form.Label>Velg en lenker</Form.Label> */}
            <SelectBrukere/>
             </Form.Group>
        </Form>
        
        <Card>
  <Card.Header>
      <Accordion.Toggle as={Button} variant="link" eventKey="0">
        Nyttige linker for deg
      </Accordion.Toggle>
  </Card.Header>
      <Accordion.Collapse eventKey="0">
  <Card.Body>
      <Card.Title>Her finer du lineker som kan være nyttige for dere alle sammen</Card.Title>
              <Card.Text>
                  Dette er linker til deg
              </Card.Text>
              <Card.Link >
              <HentAlleLenker/>
              </Card.Link>
                
    </Card.Body>

      </Accordion.Collapse>
</Card>

<HentAlleLenker/>
       


       
    </container>
   
    )// slutt på return

}  // Slutt på render
}// Slutt på klasse
// export default LenkeV;