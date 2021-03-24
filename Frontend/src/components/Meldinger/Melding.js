import React from 'react'; 
// Bootstap
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Button, Alert, Breadcrumb, Card, Form } from 'react-bootstrap'; 

// Funksjon som viser en melding 
function Melding({avsender, melding}){
    return(
            <Card className = "mb-3"> 
                    <Card.Body>
                            <Card.Title><h2>{avsender}</h2></Card.Title>
                            <Card.Text><p>{melding}</p></Card.Text>
                    </Card.Body>
            </Card>
    );
}  

 

export default Melding; 