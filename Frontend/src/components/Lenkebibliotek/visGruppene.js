import React from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Card, Accordion, Button, CustomToggle } from 'react-bootstrap';
import { useAccordionToggle } from 'react-bootstrap/AccordionToggle';
import AlleLenkerGruppe from './alleLenkerGrupper';

export default class VisGruppene extends React.Component {
    constructor (props){
        super (props);
        this.state = {
        grupper: []
        }
    };

    componentDidMount() {
        axios.get(`http://localhost:3001/api/meldingerMineGrupper `)
          .then(res => {
            const grupper = res.data;
            this.setState({ grupper });
          })
          .catch(error => {
            console.log(error)
            console.log("message")
          })
    }
    render() {
        return (
            <Accordion> 
               { this.state.grupper.map(gruppe => 
                <Card>
                    <Card.Header>
                        <Accordion.Toggle 
                            as={Button} 
                            variant="light" 
                            eventKey= {gruppe.gruppenavn}>
                            {gruppe.gruppenavn}
                        </Accordion.Toggle>
                    </Card.Header>
                        <Accordion.Collapse eventKey={gruppe.gruppenavn}>
                    <Card.Body>
                        <Card.Text>
                             <AlleLenkerGruppe  sendgruppeID = {gruppe.gruppeID}/>
                        </Card.Text>
                    </Card.Body>
                        </Accordion.Collapse>
                </Card>
             )}
            </Accordion>
            )
        }
    }
  