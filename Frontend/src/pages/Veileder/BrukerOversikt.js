import React from 'react'
import { Container } from 'react-bootstrap'
import BrukerTabell from '../../components/Veileder/BrukerTabell'
export const BrukerOversikt = () => (
        <Container>
                <div className="App text-center"><h1>Brukeroversikt</h1></div>
               <BrukerTabell />
        </Container>
        
)

