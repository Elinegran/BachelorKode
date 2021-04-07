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
import Skrivemeldinger from '../../components/Meldinger/skriveMelding.js';
import SelectBrukere from '../../components/Meldinger/Felles/selectBruker';



//import LagNyGruppe from '../../components/Meldinger/Grupper/lagNyGruppe.js';
import NyGruppe from '../../components/Meldinger/Grupper/nyGruppe.js';
import NyttGruppemedlem from '../../components/Meldinger/Grupper/admGruppe.js';
import NyttMedlem from '../../components/Meldinger/Grupper/nyttGruppemedlem.js';
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstap
import { Accordion, Container, Row, Col, Button, Alert, Breadcrumb, Card, Form } from 'react-bootstrap';
   
// Siden Meldinger 
//(mb-3 (padding) og text-muted ("bruksanvisn") er ferdig className fra Bootstrap)
// fluid bruker max-vidden av skjermen


export const Meldinger = () => (
<main className ="meldingssiden">
        
        
        {/* Brukerens innboks */}
        <section className="melding">
               
                {/* // onHandleSelect={this.handleSelect} */}

                                  
                <Container>
                        <h1 className= "display-4">Meldinger</h1>
                        <SelectBrukere/>
                        <Skrivemeldinger /> 
                        <Meldingsliste /> 
                </Container>                  
        </section>

        {/* Samtale mellom 2 brukere 
        <section className="samtale">
                        <Samtaleliste /> 

                        {/* Her kommer komponent 
                        <Skrivemeldinger/>
        </section> */}

        <section className="gruppe"> {/* Grupper */}
                <Container>
                        <h1 className= "display-4"> Grupper </h1>
                        <NyGruppe /> {/* inputfelt og knapp for å legg til ny gruppe*/}
                        <Gruppeliste/> {/* Liste over alle gruppene */}            
                </Container>        
        </section> 
</main>
)