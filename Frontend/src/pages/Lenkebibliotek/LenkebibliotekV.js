import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import LeggeTilLenke from '../../components/Lenkebibliotek/leggeTilLenke'
import { Container, Col} from 'react-bootstrap'
import VisAlleLenker from '../../components/Lenkebibliotek/visAlleLenker';


export const LenkebibliotekV = () => (
    <Container>
        <Col >
            <LeggeTilLenke/>
            <br />
            <VisAlleLenker />
        </Col>  
        <br />
        <br />     
    </Container>   
);

export default LenkebibliotekV;