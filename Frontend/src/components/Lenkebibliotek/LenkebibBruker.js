import React from 'react';
import axios from 'axios';
// import 'bootstrap/dist/css/bootstrap.min.css';
import {Card, Col, Row } from 'react-bootstrap'; 

export default class LenkebibBruker extends React.Component {
    constructor (props){
      super (props);
      this.state = {
      idbruker: this.props.sendidbuker,
      lenkeID: this.props.sendlenkeid,
      lenker: [],
      }
    };

    componentDidMount() {
        axios.get(`http://localhost:3001/api/LenkebibBruker`,
        {params:
          {idbruker: this.state.idbruker, lenkeID: this.state.lenkeID}
          
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
      
      <div class = "card-columns"> 
    
      <Col>  
          <Row>
            { this.state.lenker.map(alleLenker => 
            <Card style={{ width: '50rem' }}>   
                <Card.Header as="h2">{ alleLenker.tittel }</Card.Header>
                {console.log(alleLenker)}
                    <Card.Body >
                        {/* <Card.Title>{ alleLenker.tittel }</Card.Title> */}
                            <Card.Text>
                            { alleLenker.info }
                            </Card.Text>
                        <Card.Link href={ alleLenker.url }>Klikk her for å lese { alleLenker.tittel }</Card.Link>
                    </Card.Body>
            </Card>)}
          </Row>
      </Col>
      
    </div> 
    )
}

}

