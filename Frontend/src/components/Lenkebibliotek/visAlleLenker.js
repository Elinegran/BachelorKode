import React from 'react';
// import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Accordion, Button} from 'react-bootstrap'
// import FormControl from 'react-bootstrap/FormControl'
// import Form from 'react-bootstrap/Form'
// import SelectBrukere from '../Meldinger/Felles/selectBruker';
// import SelectGruppe from '../Meldinger/Grupper/selextGruppe';
// import Gruppeliste from '../Meldinger/grupper';
// import { Router, Route, Link, browserHistory, IndexRoute } from 'react-router';
import HentAlleLenker from '../Lenkebibliotek/hentAlleLenker';
// import Example from './visBrukere';
import VisBrukere from './visBrukere';
import VisGruppene from './visGruppene';
// import AlleLenkerBruker from './alleLenkerBruker';

function VisAlleLenker (){
      return (  
        <article>
          <Accordion>

          <Card>
            <Card.Header>
                <Accordion.Toggle as={Button} variant="light" eventKey="allelenker">
                  Se og administrer lenker
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

          <Card>
            <Card.Header>
                <Accordion.Toggle as={Button} variant="light" eventKey="oversiktBrukere">
                  Oversikt over brukere
                </Accordion.Toggle>
            </Card.Header>
                <Accordion.Collapse eventKey="oversiktBrukere">
            <Card.Body>
                <Card.Title style = {{ textAlign: 'center'}}>Oversikt over lenkene til en bruker </Card.Title>
                        <Card.Text>
                           <VisBrukere />
                        </Card.Text>
              </Card.Body>
                </Accordion.Collapse>
          </Card>

          <Card>
            <Card.Header>
                <Accordion.Toggle as={Button} variant="light" eventKey="oversiktGrupper">
                  Oversikt over grupper
                </Accordion.Toggle>
            </Card.Header>
                <Accordion.Collapse eventKey="oversiktGrupper">
            <Card.Body>
                <Card.Title style = {{ textAlign: 'center'}}>Oversikt over lenker til gruppene </Card.Title>
                        <Card.Text>
                        <VisGruppene />
                        </Card.Text>
              </Card.Body>
                </Accordion.Collapse>
          </Card>
    </Accordion>
        </article>
      )
    }

export default VisAlleLenker;