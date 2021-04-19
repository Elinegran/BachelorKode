import React from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Card, ListGroup } from 'react-bootstrap';
import SletteLenkeBruker from './sletteLenkeBruker';
    
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
        // console.log (this.state.lenkeBruker);
        })
        .catch(error => {
            console.log(error)
            console.log("message")
          })
    }

    render () {
        return (
            <Card>
                { this.state.lenkeBruker.map(brukerLenke => 
               
                <ListGroup variant="flush">
                    <ListGroup.Item variant="light">
                        <Card.Text>
                            {brukerLenke.tittel} 
                            {/* {brukerLenke.info}  */}
                        <Card.Link href = {brukerLenke.url}> {brukerLenke.url}</Card.Link>
                        <SletteLenkeBruker
                            senderIdbruker = {brukerLenke.idbruker}
                            senderLenkeID = {brukerLenke.lenkeID}
                            senderUrl = {brukerLenke.url}
                            senderFornavn = {brukerLenke.fornavn}
                            senderEtternavn = {brukerLenke.etternavn}
                        />
                        {/* <Button style = {{ float: 'right'}} variant="danger" type = "submit">Slett</Button> */}
                        </Card.Text>
                    </ListGroup.Item>
                </ListGroup>
               )}     
            </Card>
        
        )
    }
    }