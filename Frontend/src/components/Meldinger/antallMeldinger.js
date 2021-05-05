import React from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import AuthService from '../../services/auth.service'; 

const idbruker = AuthService.getUserId();

// Klasse som viser hvor mange nye meldinger en bruker har fått
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

