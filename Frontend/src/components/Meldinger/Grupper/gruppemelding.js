import React from 'react'
import axios from 'axios';
import AuthService from '../../../services/auth.service';

import { Container, Row, Col, Button, Alert, Breadcrumb, Card, Form } from 'react-bootstrap';

const idbruker = AuthService.getUserId();

export default class Gruppemelding extends React.Component {
    constructor (props){
        super (props);
        this.state = {
            avsender: idbruker, 
            melding: "",
            gruppeID: this.props.gruppeID,
            gruppenavn: this.props.gruppenavn
        };
        this.handleInputSend = this.handleInputSend.bind(this);
    }
    handleInputSend(event){
        this.setState({melding:event.target.value})
    }

    render(){    
    return (
        <p>
            <Form>
                <label> Send gruppemelding: </label>
                <Row>
                    <Col>
                        <Form.Group>
                            <Form.Control 
                                input as ="textarea" placeholder ="Skriv melding..."  
                                onChange = {this.handleInputSend} style={{float: 'right'}} />
                        </Form.Group>
                    </Col>
                    <Col>  
                        <Button 
                            type="submit" className="btn btn-success"style={{float: 'left'}} 
                            onClick = {this.handleSendGroup}
                            > Send
                        </Button>
                    </Col>
                </Row>        
            </Form>
        </p>
    ) // slutt på return()
}

handleSendGroup = (event) => {
    alert("Du sender gruppemeldingen: " + this.state.melding);

        const nyGruppemelding = {
            avsender: this.state.avsender,
            melding: this.state.melding,
            gruppeID: this.state.gruppeID,
            gruppenavn: this.state.gruppenavn
        };

        axios.post(`http://localhost:3001/api/gruppemelding`,nyGruppemelding)
        .then(response => {
          console.log(response)
        })
        .catch(error => {
          console.log(error)
        })
    }
}
