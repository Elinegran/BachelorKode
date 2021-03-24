import React from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstap
import { Container, Row, Col, Button, Form } from 'react-bootstrap'; // Bootstrap-greier

export default class SelectBrukere extends React.Component {
  state = { bruker: [] }

  componentDidMount() {
    axios.get(`http://localhost:3001/api/brukerGetAll`)
      .then(res => {
        const bruker = res.data;
        this.setState({ bruker });
      })
  }

  render() {
    return(

        <select id = "valgtBruker">
            <option selected>-- Velg bruker --</option>
            { this.state.bruker.map(alleBrukere => 
            <option value={alleBrukere.idbruker}>{alleBrukere.fornavn}</option>   
            )}
        </select>  
                   
    ) // slutt på return
  } // slutt på render
} // slutt på klasse SelectBrukere
