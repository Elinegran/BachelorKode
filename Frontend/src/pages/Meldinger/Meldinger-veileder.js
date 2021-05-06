import React from 'react';
import './Meldinger.css';
import Meldingsliste from '../../components/Meldinger/innboks.js';
import Gruppeliste from '../../components/Meldinger/grupper.js';
import NyMelding from '../../components/Meldinger/nyMelding';
import NyGruppe from '../../components/Meldinger/Grupper/nyGruppe.js';
// import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstap
import { Container, Row, Col } from 'react-bootstrap';
import AntallMeldinger from '../../components/Meldinger/antallMeldinger';
   
// Meldingssiden for VEILEDER 
export const MeldingerV = () => (
<main className ="meldingssiden">
        
        {/* Brukerens INNBOKS */}
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

        {/* Oversikt over GRUPPER */}
        <section className="gruppe"> 
                <Container>
                        <h1 id="grupper">Grupper</h1>
                        <p><a className = "mobil" href="#meldinger">Gå til meldinger</a></p>
                        <NyGruppe /> {/* inputfelt og knapp for å legge til ny gruppe*/}
                        <Gruppeliste/> {/* Liste over alle gruppene med redigeringsmuligheter */}            
                </Container>        
        </section> 
</main>
) // slutt på export const Meldinger