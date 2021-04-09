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
import HentAlleLenker from '../Lenkebibliotek/hentAlleLenker';

export default class VisAlleLenker extends React.Component {
    constructor (props){
      super (props);
      this.state = {
      lenker: [],
      }
    };
    
    componentDidMount() {
      //alert('Gruppe fra frontend: '+ this.state.gruppeID)
      axios.get(`http://localhost:3001/api/getLenker`)
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
      return ( // Returnerer en kollaps-liste over alle gruppene, med en liste med medlemmer inni 
        <article>
          <Accordion>
          <Card>
            <Card.Header>
                <Accordion.Toggle as={Button} variant="light" eventKey="allelenker">
                  Se alle lenker
                </Accordion.Toggle>
            </Card.Header>
                <Accordion.Collapse eventKey="allelenker">
            <Card.Body>
                <Card.Title style = {{ textAlign: 'center'}}>Her er en oversikt over alle linker</Card.Title>
                        <Card.Text>
                           <HentAlleLenker />
                        </Card.Text>
                
                          
              </Card.Body>

                </Accordion.Collapse>
          </Card>
    </Accordion>
        </article>
      )
    }
}