import React from 'react';
import './Meldinger.css';
import Melding from '../../components/Meldinger/Melding.js';
import Meldingsheader from '../../components/Meldinger/Overskrift.js';
import Gruppe from '../../components/Meldinger/Gruppe.js';
import Samtale from '../../components/Meldinger/Samtale.js'; 
import Meldingsliste from '../../components/Meldinger/innboks.js';
import Samtaleliste from '../../components/Meldinger/samtaler.js';
import Gruppeliste from '../../components/Meldinger/grupper.js';
import Avatar from '../../components/Meldinger/Felles/avatar.js';
import Test from '../../components/Meldinger/Grupper/test.js';


//import LagNyGruppe from '../../components/Meldinger/Grupper/lagNyGruppe.js';
import NyGruppe from '../../components/Meldinger/Grupper/nyGruppe.js';
import NyttGruppemedlem from '../../components/Meldinger/Grupper/admGruppe.js';
import NyttMedlem from '../../components/Meldinger/Grupper/nyttGruppemedlem.js';
// Bootstap
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Button, Alert, Breadcrumb, Card, Form } from 'react-bootstrap';
   
// Siden Meldinger 
//(mb-3 (padding) og text-muted ("bruksanvisn") er ferdig className fra Bootstrap)
// fluid bruker max-vidden av skjermen
export const Meldinger = () => (
<main className ="meldingssiden">
        
        {/* Brukerens innboks */}
        <section className="melding">
                <Container>  
                        <Row className="avatarOgOverskrift">
                                <Avatar />
                                <Meldingsheader overskrift = "Mine meldinger"/>
                        </Row>
                        <Row>
                                <Meldingsliste /> 
                        </Row>           
                </Container>
        </section>

        {/* Samtale mellom 2 brukere */}
        <section className="samtale">
                <Container>
                        <Meldingsheader overskrift = "Samtale"/>
                        <Samtaleliste /> 
                        
                
                        <Form>
                                <Row>
                                        <Col>
                                                <Form.Group>
                                                        <Form.Control type="text" placeholder="Skriv melding" />
                                                </Form.Group>
                                        </Col>
                                        <Col>
                                              <Button variant="warning" type="submit">Send</Button>  
                                        </Col>
                                </Row>
                                
                        </Form>
                </Container>
        </section>

        {/* Liste over grupper */}
        <section className="gruppe"> {/* <div class="col-md-4"> Noe </div> 3 colonner fra og med stor skjerm*/}
                <NyGruppe /> {/* inputfelt og knapp for å legg til ny gruppe*/}

                <NyttMedlem /> {/* selectfelter og knapp for å legg til nytt gruppemedlem */}

                <Container fluid>
                        <Meldingsheader overskrift = "Alle grupper"/>
                        <Gruppeliste/> {/* Liste over grupper */}     
                </Container>  
                <Test />            
        </section> 
        
        
        
        {/* Resten av denne siden er bare en test 
        
        <Container fluid>
        <h2>Resten av denne siden er bare en test</h2>
        <Button>Test</Button>
        <Form>
                <Row>
                        <Col md>
                                <Form.Group>
                                        <Form.Label>Epost</Form.Label>
                                        <Form.Control type="email" placeholder="dinEpost@epost.no" />
                                        <Form.Text className="text-muted">Send oss en epost</Form.Text>
                                </Form.Group>
                        </Col>
                        <Col md>
                                <Form.Group>
                                        <Form.Label>Passord</Form.Label>
                                        <Form.Control type="password" placeholder="ditt passord" />
                                
                                </Form.Group>
                        </Col>
                </Row>
                <Button variant="success" type="submit">Logg inn</Button>
        </Form>
        <Card className = "mb-3"> 
                <Card.Img src="https://picsum.photos/200/50"/>
                <Card.Body>
                        <Card.Title>Eksempel</Card.Title>
                        <Card.Text>Dette er et react-bootstrap Card</Card.Text>
                        <Button variant="warning">Test</Button>
                </Card.Body>
        </Card>
        <Breadcrumb>
                <Breadcrumb.Item>Test1</Breadcrumb.Item>
                <Breadcrumb.Item>Test2</Breadcrumb.Item>
                <Breadcrumb.Item active>Test3</Breadcrumb.Item>
        </Breadcrumb>
        <Alert variant = "success">Dette er en test</Alert>
        </Container>  */}

</main>
)