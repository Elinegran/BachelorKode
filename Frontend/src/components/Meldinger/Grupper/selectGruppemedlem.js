import React from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstap
import { Container, Row, Col, Button, Form } from 'react-bootstrap'; // Bootstrap-greier

export default class SelectGruppemedlem extends React.Component {
  state = { bruker: [] }

  componentDidMount() {
    axios.get(`http://localhost:3001/api/gruppeGetMedlemmer`)
      .then(res => {
        const bruker = res.data;
        this.setState({ bruker });
      })
  }

  render() {
    return(
             
        <select className="custom-select" id = "valgtBruker">
    
            <option selected>-- Medlemmer --</option>
            { this.state.bruker.map(alleBrukere => 
            <option value={alleBrukere.idbruker}>{alleBrukere.fornavn}</option>   
            )}
        </select>  
                  
    ) // slutt på return
  } // slutt på render
} // slutt på klasse SelectGruppemedlem
