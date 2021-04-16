import React from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstap
//import { Container, Row, Col, Button, Form } from 'react-bootstrap'; // Bootstrap-greier


export default class SelectGruppe extends React.Component {
  constructor(props){
    super(props);
    this.state = {
    gruppe: []
    }

    this.onHandleSelectG = this.onHandleSelectG.bind(this);
  
  }
  
  //Det som blir valgt blir returnert til parent
  onHandleSelectG(event){
    this.props.onHandleSelectG(event.target.value)
  }

  componentDidMount() {
    axios.get(`http://localhost:3001/api/meldingerMineGrupper`)
      .then(res => {
        const gruppe = res.data;
        this.setState({ gruppe });
      })
  }

  render() {
    return(
        
        <select className="custom-select" id = "valgtGruppe" onChange={this.onHandleSelectG}> {/* Her mangler det en onChange event, tror jeg */}
            <option selected>-- Velg gruppe --</option>
            { this.state.gruppe.map(melding => 
            <option value={melding.gruppeID}>{melding.gruppenavn}</option>   
            )}
        </select>  
                   
    ) // slutt på return
  } // slutt på render
} // slutt på klasse SelectGruppe
