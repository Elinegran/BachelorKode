import React from 'react';
import './Meldinger.css';
import Meldingsliste from '../../components/Meldinger/innboks.js';
import MinGruppeliste from '../../components/Meldinger/Grupper/mineGrupper.js';
import NyMelding from '../../components/Meldinger/nyMelding';
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstap
import { Container, Col, Row } from 'react-bootstrap';
import AntallMeldinger from '../../components/Meldinger/antallMeldinger';
   
// Siden Meldinger for BRUKERE 
export const Meldinger = () => (
<main className ="meldingssiden">
        
        {/* Brukerens innboks */}
        <section className="melding">                  
                <Container>
                        <h1 id= "meldinger">Meldinger</h1>
                        <p><a className = "mobil" href="#grupper">Gå til grupper</a></p>
                        <NyMelding/>
                        <Row>
                                <Col>
                                        <h2 style= {{float:"right"}}>Nye meldinger:</h2>
                                </Col>
                                <Col>
                                        <AntallMeldinger />
                                </Col> 
                        </Row>
                        
                        <Meldingsliste /> 
                </Container>                  
        </section>

        
        <section className="gruppe"> {/* Grupper */}
                <Container>
                        <h1 id="grupper">Mine grupper</h1>
                        <p><a className = "mobil" href="#meldinger">Gå til meldinger</a></p>
                        <MinGruppeliste/> {/* Liste over alle gruppene */}            
                </Container>        
        </section> 
        
</main>
)