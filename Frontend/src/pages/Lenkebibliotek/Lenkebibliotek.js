import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import Lenker from '../../components/Lenkebibliotek/Lenker'
import LenkeV from '../../components/Lenkebibliotek/LenkeV'
import Form from 'react-bootstrap/Form'
import LeggeTilLenke from '../../components/Lenkebibliotek/leggeTilLenke'
import { Accordion, Button, Card, Container, Row, Col} from 'react-bootstrap'
import VisAlleLenker from '../../components/Lenkebibliotek/visAlleLenker';
import HentAlleLenker from '../../components/Lenkebibliotek/hentAlleLenker';
export const Lenkebibliotek = () => (
    <Container>
        <Col >
            <h1 style = {{ textAlign: 'center'}}>Her kan du legge til nye lenker</h1>

    <Form>
        <LeggeTilLenke/>
        <br />
        <LenkeV /> 
        <VisAlleLenker />
    </Form>
       
      
        



        {/* <LeggeTilLenke/> */}
        <br></br>
        </Col>  
        
             
    </Container>  
      
);

export default Lenkebibliotek;
