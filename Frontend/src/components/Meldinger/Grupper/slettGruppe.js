import React from 'react';
import axios from 'axios'; // for å sende/ motta til/ fra backend
import { useState } from "react"; // for å sende til backend
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstap
import { Container, Row, Col, Button, Form } from 'react-bootstrap'; // Bootstrap-greier


// Funksjon for å opprette en ny gruppe i databasen
function SlettGruppe(props) {
  //const [gruppeID, setGruppeID] = useState("");
  const gruppeID = props.senderGruppeID;
  

  // Sender det nye gruppenavnet til backend
  const slettGruppe = () => {
    alert (gruppeID);
    axios.delete("http://localhost:3001/api/deleteGruppe", {gruppeID: gruppeID})    
  };

  // Dette sendes til Meldingssiden
  return (

    <Button 
      type="submit"   
      className="btn btn-warning" 
      style={{float: 'right'}}
      onClick={slettGruppe}
      // onClick={(event) => {setGruppeID(event.target.value);}}
     // onChange = {(event) => {setGruppeID(event.target.value);}}
      > Slett gruppe
    </Button>    
    
         
  
  ) // slutt på return()

} // slutt på funksjonen NyGruppe()

export default SlettGruppe; 

/* export default class SlettGruppe extends React.Component {
    constructor (props){
      super (props);
      this.state = {
      gruppeID: this.props.senderGruppeID,
      gruppe: [],
      }
      this.slett = this.slett.bind(this); 
    };

    slett(){
        
            // alert('Gruppe fra frontend: '+ this.state.gruppeID)
            axios.delete(`http://localhost:3001/api/deleteGruppe`,
            {params: 
              { gruppeID: this.state.gruppeID }
              
            })
              .then(res => {
                const bruker = res.data;
                this.setState({ bruker });
              })
              .catch(error => {
                console.log(error)
                console.log("message")
              })
          
    } // slutt på slett

    
    
    // Komponent som sendes, vises på Meldingssiden
    render() {
       //alert("GruppeiD" + this.state.gruppeID); 
    return (
      
        <Button 
            type="submit"   
            className="btn btn-warning" 
            style={{float: 'right'}}
            onClick={this.slett} 
            > Slett gruppe
        </Button>           
    ) // slutt på return()
  } // slutt på render()
} // slutt på klasse()

 */