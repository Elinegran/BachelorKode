import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import Lenker from '../../components/Lenkebibliotek/Lenker'
import LenkeV from '../../components/Lenkebibliotek/LenkeV'
import Form from 'react-bootstrap/Form'
import LeggeTilLenke from '../../components/Lenkebibliotek/leggeTilLenke'
import { Accordion, Button, Card, Container, Row, Col} from 'react-bootstrap'
import VisAlleLenker from '../../components/Lenkebibliotek/visAlleLenker';
import HentAlleLenker from '../../components/Lenkebibliotek/hentAlleLenker';
import VisGruppene from '../../components/Lenkebibliotek/visGruppene';
import VisBrukere from '../../components/Lenkebibliotek/visBrukere';

export const Lenkebibliotek = () => (
    <Container>
        <Col >
            <h1 style = {{ textAlign: 'center', fontSize:'25px'}}>Her kan du legge til nye lenker</h1>

    
        <LeggeTilLenke/>
        <br />
        {/* <LenkeV />  */}
        <VisAlleLenker />
       
        <br></br>
        </Col>  
        
             
    </Container>  
      
);

export default Lenkebibliotek;
