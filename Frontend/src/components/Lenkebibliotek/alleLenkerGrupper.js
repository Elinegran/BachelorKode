import React from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Card, ListGroup, article, Button, CustomToggle } from 'react-bootstrap';
// import { usearticleToggle } from 'react-bootstrap/articleToggle';
// import AuthService from '../../../services/auth.service';
import SletteLenkeGruppe from './sletteLenkeGruppe';
    
export default class AlleLenkerGruppe extends React.Component {
    constructor (props){
        super (props);
        this.state = {
        gruppeID: this.props.sendgruppeID,
        lenkeGruppe: []
        }
      };
    
      componentDidMount() {
        axios.get(`http://localhost:3001/api/visLenkerGruppe`,
        {params: 
            {gruppeID: this.state.gruppeID}
        })
        .then(res => {
        const lenkeGruppe = res.data;
        this.setState({ lenkeGruppe });
        console.log (this.state.lenkeGruppe);
        })
    }

    render () {
        return (
        <Card>
            { this.state.lenkeGruppe.map(gruppeLenke =>  
            
                <ListGroup variant = "flush">
                    <ListGroup.Item variant="light">
                    <Card.Text>
                        {gruppeLenke.tittel}
                    <Card.Link  href = {gruppeLenke.url}> {gruppeLenke.url}</Card.Link>
                    <SletteLenkeGruppe />
                    {/* <Button style = {{ float: 'right'}} variant="danger" type = "submit">Slett</Button> */}
                    </Card.Text>
          </ListGroup.Item>
          </ListGroup>
          )}
        </Card>
        )
    }
    }