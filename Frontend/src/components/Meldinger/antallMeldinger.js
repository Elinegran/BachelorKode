import React from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Accordion, Container, Row, Col, Button, Alert, Breadcrumb, Card, Form } from 'react-bootstrap'; 
import AuthService from '../../services/auth.service'; 

const idbruker = AuthService.getUserId();

export default class AntallMeldinger extends React.Component {
  constructor (props){
    super (props);
    this.state = {
    idbruker: idbruker,
    nyeMeldinger: [],
    }
  };

  componentDidMount() {
    axios.get(`http://localhost:3001/api/antallNyeMeldinger`,
    {params: {idbruker: idbruker} })
      .then(res => {
        const nyeMeldinger = res.data;
        this.setState({ nyeMeldinger });
      })
  }

render() {

  return (
    <p>
    
    { this.state.nyeMeldinger.map(melding => 
        <span class="badge badge-pill badge-warning">{melding.AntallNyeMeldinger}</span> 
    )}
    </p>
  ) // Slutt på return
} // slutt på render()
} // slutt på klasse 

