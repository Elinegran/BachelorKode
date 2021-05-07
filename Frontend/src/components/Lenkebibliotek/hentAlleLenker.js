import React from 'react';
import axios from 'axios';
import {Card, Accordion, Button} from 'react-bootstrap'
import LenkeV from '../Lenkebibliotek/LenkeV';
import EndreLenke from '../Lenkebibliotek/endreLenke';
import LeggTilLenkeAlle from './leggTilLenkeAlle';


export default class HentAlleLenker extends React.Component {
    constructor (props){
      super (props);
      this.state = {
      idbruker: this.props.sendidbuker,
      lenkeID: this.props.sendlenkeid,
      lenker: [],
      }
    };
    
    componentDidMount() {
      axios.get(`http://localhost:3001/api/getLenker`,
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
        <article>    
    <Accordion>
      { this.state.lenker.map(alleLenker => 
    <Card>
      <Card.Header>
          <Accordion.Toggle as={Button} variant ="link" eventKey={ alleLenker.lenkeID }>
          { alleLenker.tittel }
          </Accordion.Toggle>
      </Card.Header>
          <Accordion.Collapse eventKey={ alleLenker.lenkeID }>
      <Card.Body>
          <Card.Title className="list-group" ></Card.Title>
          <LeggTilLenkeAlle senderLenkeID = {alleLenker.lenkeID} senderUrl = {alleLenker.url}/>
          <Card.Text>{ alleLenker.info}</Card.Text>
          <Card.Link href ={ alleLenker.url } >{ alleLenker.url }</Card.Link>
          <br />
          <br />
          <LenkeV 
          senderlenkeid = {alleLenker.lenkeID}
          senderfornavn = {alleLenker.fornavn}/>
          <br />
          <br />
          <EndreLenke 
          senderlenkeid = {alleLenker.lenkeID}
          senderInfo = {alleLenker.info}
          senderTittel = {alleLenker.tittel}
          senderUrl = {alleLenker.url}
          />           
      </Card.Body>
          </Accordion.Collapse> 
    </Card>)}
</Accordion>
  </article>
)
}  



}

