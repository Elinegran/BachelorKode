import React from 'react';
import './Meldinger.css';
import Meldingsliste from '../../components/Meldinger/innboks.js';
import MinGruppeliste from '../../components/Meldinger/Grupper/mineGrupper.js';
import Skrivemeldinger from '../../components/Meldinger/skriveMelding.js';
import SelectBrukere from '../../components/Meldinger/Felles/selectBruker';
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstap
import { Container } from 'react-bootstrap';
   
// Siden Meldinger fro BRUKERE 

export const Meldinger = () => (
<main className ="meldingssiden">
        
        {/* Brukerens innboks */}
        <section className="melding">                  
                <Container>
                        <h1 className= "display-4">Meldinger</h1>
                        <SelectBrukere/>
                        <Skrivemeldinger /> 
                        <Meldingsliste /> 
                </Container>                  
        </section>

        
        <section className="gruppe"> {/* Grupper */}
                <Container>
                        <h1 className= "display-4"> Mine grupper </h1>
                        <MinGruppeliste/> {/* Liste over alle gruppene */}            
                </Container>        
        </section> 
</main>
)