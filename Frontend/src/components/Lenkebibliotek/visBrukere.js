import React from 'react';
import axios from 'axios';
import {Card, Accordion, Button } from 'react-bootstrap';
import AlleLenkerBruker from './alleLenkerBruker';
    
export default class VisBrukere extends React.Component {
    constructor (props){
        super (props);
        this.state = {
        brukere: []
        }
      };
    
      componentDidMount() {
        axios.get(`http://localhost:3001/api/brukerGetAll`)

        .then(res => {
        const brukere = res.data;
        this.setState({ brukere });
        })
    }
    render () {
        return (
            <Accordion>
                { this.state.brukere.map(bruker =>  
                <Card>
                    <Card.Header>
                        <Accordion.Toggle 
                            as={Button} 
                            variant="light" 
                            eventKey= {bruker.idbruker}>
                            {bruker.fornavn + bruker.etternavn}
                        </Accordion.Toggle>
                    </Card.Header>
                        <Accordion.Collapse eventKey= {bruker.idbruker}>
                    <Card.Body>
                        <Card.Text>
                            <AlleLenkerBruker sendidbruker = {bruker.idbruker} />
                        </Card.Text>
                    </Card.Body>
                        </Accordion.Collapse>
                </Card>
            )}
            </Accordion>
        )
    }
}
  


