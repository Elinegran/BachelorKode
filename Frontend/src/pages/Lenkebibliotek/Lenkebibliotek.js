import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
// import Lenker from '../../components/Lenkebibliotek/Lenker'
// import LenkeV from '../../components/Lenkebibliotek/LenkeV'
// import Form from 'react-bootstrap/Form'
// import LeggeTilLenke from '../../components/Lenkebibliotek/leggeTilLenke'
import { Container, Col} from 'react-bootstrap'
// import VisAlleLenker from '../../components/Lenkebibliotek/visAlleLenker';
// import HentAlleLenker from '../../components/Lenkebibliotek/hentAlleLenker';
// import VisGruppene from '../../components/Lenkebibliotek/visGruppene';
// import VisBrukere from '../../components/Lenkebibliotek/visBrukere';
import LenkebibBruker from '../../components/Lenkebibliotek/LenkebibBruker';

export const Lenkebibliotek = () => (
    <Container>
        
        <h1 style = {{ textAlign: 'center', fontSize:'25px'}}>Lenkebibliotek</h1>
        <div  class = "card-columns">
        <LenkebibBruker/>
        </div>
      
             
    </Container>  
      
);

export default Lenkebibliotek;
