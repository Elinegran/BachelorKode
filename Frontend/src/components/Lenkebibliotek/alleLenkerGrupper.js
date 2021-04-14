import React from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Card, article, Button, CustomToggle } from 'react-bootstrap';
// import { usearticleToggle } from 'react-bootstrap/articleToggle';
// import AuthService from '../../../services/auth.service';
    
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
            <Card.Text>
                <p>Dette er Accordion til:{this.state.gruppeID}</p>
                { this.state.lenkeGruppe.map(gruppeLenke =>  
                    <ul>
                        <li>
                        <p>{gruppeLenke.tittel}</p>
                        {gruppeLenke.url}
                        </li>
                    </ul>
                )}
          </Card.Text>
        )
    }
    }