import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import Lenker from '../../components/Lenkebibliotek/Lenker'
import LenkeV from '../../components/Lenkebibliotek/LenkeV'
import { Accordion, Button, Card, Container, Row, Col} from 'react-bootstrap'


export const Lenkebibliotek = () => (
    <Container>
       <Col >
       <h1 style = {{ textAlign: 'center'}}>Her kan du legge til nye lenker</h1>
        <LenkeV /> 
        <br></br>
        </Col>  
        
             
    </Container>  
      
);

export default Lenkebibliotek;
