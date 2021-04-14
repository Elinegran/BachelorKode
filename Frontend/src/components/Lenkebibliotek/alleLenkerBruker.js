import React from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Card, ListGroup, article, Button, CustomToggle } from 'react-bootstrap';
// import { usearticleToggle } from 'react-bootstrap/articleToggle';
// import AuthService from '../../../services/auth.service';
    
export default class AlleLenkerBruker extends React.Component {
    constructor (props){
        super (props);
        this.state = {
        idbruker: this.props.sendidbruker,
        lenkeBruker: []
        }
      };
    
      componentDidMount() {
        axios.get(`http://localhost:3001/api/visLenkerBruker`,
        {params: 
            {idbruker: this.state.idbruker}
        })
        .then(res => {
        const lenkeBruker = res.data;
        this.setState({ lenkeBruker });
        console.log (this.state.lenkeBruker);
        })
    }

    render () {
        return (
            <Card>
                { this.state.lenkeBruker.map(brukerLenke => 
               
                <ListGroup variant="flush">
                <ListGroup.Item variant="light">
                {/* <p>Dette er Accordion til:{this.state.idbruker}</p> */}
                    <Card.Text>{brukerLenke.tittel} 
                    {/* <Card.Text>{brukerLenke.info} </Card.Text>     */}
                    <Card.Link href = {brukerLenke.url}> {brukerLenke.url}</Card.Link>
                    </Card.Text>
                </ListGroup.Item>
                </ListGroup>
               )}     
            </Card>
        
        )
    }
    }