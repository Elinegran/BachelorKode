import React from 'react'
import axios from 'axios';
import AuthService from '../../../services/auth.service';


import { Container, Row, Col, Button, Alert, Breadcrumb, Card, Form } from 'react-bootstrap';


const idbruker = AuthService.getUserId();


export default class gruppemelding extends React.Component {
    constructor (props){
        super (props);
        this.state = {
            avsender: idbruker, 
            gruppeID: this.props.gruppeID,
            melding: ""
        };
        this.handleInputSend = this.handleInputSend.bind(this);
    }
    handleInputSend(event){
        this.setState({melding:event.target.value,
        gruppeID: this.props.gruppeID})

      
   
    }

    render(){    
    return (
        <p>
            <h3>Send gruppemelding</h3>
            <Form>
                <Row>
                    <Col>
                        <Form.Group>
                            <Form.Control 
                                input type="text" placeholder ="Skriv gruppemelding"  
                                onChange = {this.handleInputSend} style={{float: 'left'}} />
                        </Form.Group>
                    </Col>
                    <Col>  
                        <Button 
                            type="submit" className="btn btn-success"style={{float: 'right'}} 
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
    alert("Du sender gruppemelding: " + this.state.melding);

        const nyGruppemelding = {
            gruppeID: this.state.gruppeID,
            avsender: this.state.avsender,
            melding: this.state.melding
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
