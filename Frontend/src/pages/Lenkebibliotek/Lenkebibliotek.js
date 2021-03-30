import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import Lenker from '../../components/Lenkebibliotek/Lenker'
import LenkeV from '../../components/Lenkebibliotek/LenkeV'
import { Accordion, Button, Card, Container, Row, Col} from 'react-bootstrap'


export const Lenkebibliotek = () => (
    <Container>
       <Col>
        <Lenker /> 
        <br></br>
        <LenkeV />
        </Col>  
        
             
    </Container>  
      
);

export default Lenkebibliotek;
