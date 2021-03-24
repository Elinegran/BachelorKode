import React from 'react'; 
// Bootstap
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Button, Alert, Breadcrumb, Card, Form } from 'react-bootstrap'; 

// Funksjon som viser en gruppe 
function Gruppe({gruppenavn}){
    return(
        <Alert variant = "success"><p>{gruppenavn}</p></Alert>
              
        
    );
} 

export default Gruppe; 