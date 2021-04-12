import React from 'react'
import axios from 'axios';
import AuthService from '../../services/auth.service';


import { Container, Row, Col, Button, Alert, Breadcrumb, Card, Form } from 'react-bootstrap';


const idbruker = AuthService.getUserId();


export default class skriveMelding extends React.Component {
    constructor (props){
        super (props);
        this.state = {
            avsender: idbruker, 
            mottaker:this.props.mottakerID,
            tid:0,
            melding: ""
        };
        this.handleInputChange = this.handleInputChange.bind(this);
    }
    
    handleInputChange(event){
        this.setState({melding:event.target.value,
            mottaker: this.props.mottakerID}
       )
        
    }

    
    render(){
        return(
            <Form>
                                <Row>
                                        <Col>
                                                <Form.Group>
                                                        <Form.Control type="text" placeholder="Skriv melding" onChange = {this.handleInputChange} />
                                                </Form.Group>
                                        </Col>
                                        <Col>
                                              <Button variant="warning" type="submit" onClick = {this.handleSend}>Send</Button>  
                                        </Col>
                                </Row>
                                
                        </Form>
        )
    }
    handleSend = (event) => {
        alert("Du sender: " + this.state.melding);


        const nyInnboksmelding = {
            mottaker: this.state.mottaker,
            avsender: this.state.avsender,
            tid: this.state.tid,
            melding: this.state.melding
        };

        axios.post(`http://localhost:3001/api/meldingerInnboksMeldinger`,nyInnboksmelding)
        .then(response => {
          console.log(response)
        })
        .catch(error => {
          console.log(error)
        })

    }

}