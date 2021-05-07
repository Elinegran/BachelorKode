import React from 'react';
import { Card, Accordion, Button} from 'react-bootstrap'
import HentAlleLenker from '../Lenkebibliotek/hentAlleLenker';
import VisBrukere from './visBrukere';
import VisGruppene from './visGruppene';

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