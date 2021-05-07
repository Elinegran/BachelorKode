import React from 'react';
import axios from 'axios';
import {Card,CardColumns, Col, Row } from 'react-bootstrap'; 
import AuthService from '../../services/auth.service'
const idbruker = AuthService.getUserId();

export default class LenkebibBruker extends React.Component {
    constructor (props){
      super (props);
      this.state = {
      lenker: [],
      }
    };

    componentDidMount() {
        axios.get(`http://localhost:3001/api/LenkebibBruker`,
        {params:
          {idbruker: idbruker}
          
        })
          .then(res => {
            const lenker = res.data;
            this.setState({ lenker });
          })
          .catch(error => {
            console.log(error)
            console.log("message")
          })
      }
      
      render() {
        return (
        // <Row >
          <CardColumns>
                { this.state.lenker.map(alleLenker => 
                <Card>   
                    <Card.Header as="h2">{ alleLenker.tittel }</Card.Header>
                        <Card.Body >
                            {/* <Card.Title>{ alleLenker.tittel }</Card.Title> */}
                                <Card.Text>
                                { alleLenker.info }
                                </Card.Text>
                            <Card.Link href={ alleLenker.url }>Klikk her: { alleLenker.tittel }</Card.Link>
                        </Card.Body>
                </Card>)}
          </CardColumns>
        // </Row> 

    )
  }
}

