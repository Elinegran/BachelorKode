import React from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import {InputGroup, Button, InputFelt, Row, Col} from 'react-bootstrap'
import FormControl from 'react-bootstrap/FormControl'
import Form from 'react-bootstrap/Form'
import SelectBrukere from '../Meldinger/Felles/selectBruker';
import SelectGruppe from '../Meldinger/Grupper/selextGruppe';
import Gruppeliste from '../Meldinger/grupper';

export default class HentAlleLenker extends React.Component {
    constructor (props){
      super (props);
      this.state = {
      lenker: [],
      }
    };
    
    componentDidMount() {
      //alert('Gruppe fra frontend: '+ this.state.gruppeID)
      axios.get(`http://localhost:3001/api/getLenker`)
        .then(res => {
          const lenker = res.data;
          this.setState({ lenker });
        })
        .catch(error => {
          console.log(error)
          console.log("message")
        })
    }
  
    // Returnerer en liste over medlemmene i gruppa
    render() {
        return (

        <ul className="list-group">
            {/* Her kan jeg legge et listeelement med alle lenkene hvis jeg vil, */}
        { this.state.lenker.map(alleLenker => 
        // Her kan jeg legge en løkke med de forskellige gruppene med lenker hvis jeg vil
          <li className="list-group-item">
              { alleLenker.lenkeID } { alleLenker.url } { alleLenker.tittel } { alleLenker.info}
          </li>
         )} 
        </ul> 

        )
    }
}