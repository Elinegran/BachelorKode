import React from 'react';
import './Meldinger.css';
import Meldingsliste from '../../components/Meldinger/innboks.js';
import Gruppeliste from '../../components/Meldinger/grupper.js';
import Skrivemeldinger from '../../components/Meldinger/skriveMelding.js';
import SelectBrukere from '../../components/Meldinger/Felles/selectBruker';
import NyGruppe from '../../components/Meldinger/Grupper/nyGruppe.js';
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstap
import { Container } from 'react-bootstrap';
   
// Meldingssiden for VEILEDER 

export const MeldingerV = () => (
<main className ="meldingssiden">
        
        {/* Brukerens INNBOKS */}
        <section className="melding">     
                <Container>
                        <h1 className= "display-4"> Meldinger </h1>
                        <SelectBrukere/>
                        <Skrivemeldinger /> 
                        <Meldingsliste /> 
                </Container>                  
        </section>

        {/* Oversikt over GRUPPER */}
        <section className="gruppe"> 
                <Container>
                        <h1 className= "display-4"> Grupper </h1>
                        <NyGruppe /> {/* inputfelt og knapp for å legge til ny gruppe*/}
                        <Gruppeliste/> {/* Liste over alle gruppene med redigeringsmuligheter */}            
                </Container>        
        </section> 
</main>
) // slutt på export const Meldinger