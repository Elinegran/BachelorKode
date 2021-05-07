import React from 'react';
import { Container, Col} from 'react-bootstrap'
// import LenkebibBruker from '../../components/Lenkebibliotek/LenkebibBruker';

import LenkebibBruker from '../../components/Lenkebibliotek/LenkebibBruker';

export const Lenkebibliotek = () => (
    <Container>
        
        <h1 style = {{ textAlign: 'center', fontSize:'25px'}}>Lenkebibliotek</h1>

    
    <> 
        <LenkebibBruker/>
    </> 
    </Container>  
      
);

export default Lenkebibliotek;
