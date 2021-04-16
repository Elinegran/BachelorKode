import React from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import {InputGroup, Card, Accordion, Button, InputFelt, Row, Col} from 'react-bootstrap'
import FormControl from 'react-bootstrap/FormControl'
import Form from 'react-bootstrap/Form'
import SelectBrukere from '../Meldinger/Felles/selectBruker';
import SelectGruppe from '../Meldinger/Grupper/selextGruppe';
import Gruppeliste from '../Meldinger/grupper';
import { Router, Route, Link, browserHistory, IndexRoute } from 'react-router';
import LenkeV from '../Lenkebibliotek/LenkeV';
import EndreLenke from '../Lenkebibliotek/endreLenke';


export default class HentAlleLenker extends React.Component {
    constructor (props){
      super (props);
      this.state = {
      idbruker: this.props.sendidbuker,
      lenkeID: this.props.sendlenkeid,
      lenker: [],
      }
    };
    
    componentDidMount() {
      axios.get(`http://localhost:3001/api/getLenker`,
      {params:
        {idbruker: this.state.idbruker, lenkeID: this.state.lenkeID}
        
      })
        .then(res => {
          const lenker = res.data;
          this.setState({ lenker });
        })
        .catch(error => {
          console.log(error)
          console.log("message")
        })
    }
    render() {
      return (
        <article>    
    <Accordion>
      { this.state.lenker.map(alleLenker => 
    <Card>
      <Card.Header>
          <Accordion.Toggle as={Button} variant ="light" eventKey={ alleLenker.lenkeID }>
          { alleLenker.tittel }
          </Accordion.Toggle>
      </Card.Header>
          <Accordion.Collapse eventKey={ alleLenker.lenkeID }>
      <Card.Body>
          <Card.Title className="list-group" >{ alleLenker.tittel }</Card.Title>
          <Card.Text>{ alleLenker.info}</Card.Text>
          <Card.Link href= "{ alleLenker.url }">{ alleLenker.url }</Card.Link>
          <br />
          <LenkeV 
          senderlenkeid = {alleLenker.lenkeID}
          senderfornavn = {alleLenker.fornavn}/>
          <br />
          <br />
          <EndreLenke 
          senderlenkeid = {alleLenker.lenkeID}
          senderInfo = {alleLenker.info}
          senderTittel = {alleLenker.tittel}
          senderUrl = {alleLenker.url}
          />
          
                  
      </Card.Body>

          </Accordion.Collapse>
    </Card>)}
</Accordion>
  </article>
)
}  



}


  //   // Returnerer en liste over alle lenkene
  //   render() {
  //       return (         

  //       <ul className="list-group">
  //           {/* Her kan jeg legge et listeelement med alle lenkene hvis jeg vil, } */}
  //       { this.state.lenker.map(alleLenker => 
  //       // Her kan jeg legge en løkke med de forskellige gruppene med lenker hvis jeg vil
  //         <li className="list-group-item">
  //             { alleLenker.lenkeID } <a href = " { alleLenker.url }">{ alleLenker.tittel }</a> { alleLenker.info}
              
  //         </li> 
  //        )} 
  //       </ul> 

  //       )
  //   }
  // }
