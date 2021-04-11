import React from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstap
import { Container, Row, Col, Button, Form } from 'react-bootstrap'; // Bootstrap-greier
import Skrivemeldinger from '../skriveMelding';


export default class SelectBrukere extends React.Component {
  constructor(props){
    super(props);
    this.state = { 
      bruker: [],
     }
     
    

  }

  onHandleSelect(event){
    this.props.onHandleSelect(event.target.value) 

  }


  componentDidMount() {
    axios.get(`http://localhost:3001/api/brukerGetAll`)
      .then(res => {
        const bruker = res.data;
        this.setState({ bruker });
      })
  }

  render() {
    return(

        // <select id = "valgtBruker" onChange={this.onHandleSelect}>
      //className="custom-select"
      <p>
        <select className="custom-select" id = "valgtBruker" onChange={this.onHandleSelect}>  {/* Her mangler det en onChange event, tror jeg */}
            <option selected>--Bruker--</option>
            { this.state.bruker.map(alleBrukere => 
            <option value={alleBrukere.idbruker}>{alleBrukere.fornavn}</option>   
            )}
        </select> 
        {/* <Skrivemeldinger mottakerID = {this.state.idbruker}/> Prøver å sende mottaker til skriveMelding */}
      </p>          
    ) // slutt på return
  } // slutt på render
} // slutt på klasse SelectBrukere
