import React from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstap

// Klasse som returnerer en drop-down liste med alle brukerne og verdien av en valgt bruker
export default class SelectBrukere extends React.Component {
  constructor(props){
    super(props);
    this.state = { 
      bruker: [],
     }
     
     this.onHandleSelect = this.onHandleSelect.bind(this);
  }

  // Det som blir valg, blir returnert 
  onHandleSelect(event){
    this.props.onHandleSelect(event.target.value) 
  }

  componentDidMount() {
    axios.get(`http://localhost:3001/api/brukerGetAll`) // henter alle brukere fra DB 
      .then(res => {
        const bruker = res.data;
        this.setState({ bruker });
      })
  }

  render() {
    return( // returnerer drop-down liste med alle brukere  
      <p>
        <select className="custom-select" id = "valgtBruker" onChange={this.onHandleSelect}> 
            <option selected>--Bruker--</option>
            { this.state.bruker.map(alleBrukere => 
            <option value={alleBrukere.idbruker}>{alleBrukere.fornavn} {alleBrukere.etternavn}</option>   
            )}
        </select> 
      </p>          
    ) // slutt på return
  } // slutt på render
} // slutt på klasse SelectBrukere