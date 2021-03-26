import React from 'react';  
// Bootstap
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Button, Alert, Breadcrumb, Card, Form } from 'react-bootstrap';

// Funksjon som viser en samtale 
function Samtale({samtale}){
    return(
        <Alert variant = "success"><p>{samtale}</p></Alert>
    );
} 

export default Samtale; 

