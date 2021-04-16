import React from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import {InputGroup,Accordion, Card, Button, InputFelt, Row, Col} from 'react-bootstrap'
import FormControl from 'react-bootstrap/FormControl'
import Form from 'react-bootstrap/Form'
import SelectBrukere from '../Meldinger/Felles/selectBruker';
import SelectGruppe from '../Meldinger/Grupper/selextGruppe';
import Gruppeliste from '../Meldinger/grupper';
import HentAlleLenker from './hentAlleLenker';
import LeggeTilLenke from './leggeTilLenke';
import LeggTilLenkeAlle from'./leggTilLenkeAlle';
import ViseBrukerne from './visBrukere';
import { useState } from "react"; // for å sende til backend

// export default class SelectLenker extends React.Component {
//     constructor (props){
//       super (props);
//       this.state = {
//       lenker: [],
//       }
//     };
    
    // componentDidMount() {
    //   //alert('Gruppe fra frontend: '+ this.state.gruppeID)
    //   axios.get(`http://localhost:3001/api/getLenker`)
    //     .then(res => {
    //       const lenker = res.data;
    //       this.setState({ lenker });
    //     })
    //     .catch(error => {
    //       console.log(error)
    //       console.log("message")
    //     })
    // }
  
    // Returnerer en liste over medlemmene i gruppa
    // render() {
    function AddLenkeBruker(props) {
        const [idbruker, setidbruker] = useState(0);
        // const [lenkeID, setlenkeID] = useState(0);
        const lenkeID = props.senderlenkeid;
        const fornavn = props.senderfornavn;
        const addLenkeBruker = () => {
            axios.post("http://localhost:3001/api/lenkeAddBruker", {idbruker: idbruker, lenkeID: lenkeID})
            alert(idbruker + lenkeID);   
        };
// export const LenkeV = ({}) => {
    return (

    <container>
        {/* <Form>
            <LeggeTilLenke/>
        </Form> */}

        <Form>
            <Form.Group controlId="exampleForm.SelectCustom">
            {/* <Form.Label>Velg en gruppe</Form.Label> */}
            <SelectGruppe/>
            <input type="text" 
                            placeholder="Brukerid"  
                            onChange = {(event) => {setidbruker(event.target.value);}}/>
{/* 
            <input type="text" 
                            placeholder="lenkeID"  
                            onChange = {(event) => {setlenkeID(event.target.value);}}/> */}
            </Form.Group>
        </Form>

        <label><b>eller velg</b></label>

        <Form>
            <Form.Group controlId="exampleForm.SelectCustom">
            {/* <Form.Label>Velg en lenker</Form.Label> */}
            <SelectBrukere/>
             </Form.Group>
        </Form> 
        <>
        <Button  onClick = {addLenkeBruker} 
        type = "submit" variant ="success"><b>Legg til lenke hos</b> {idbruker}</Button>{' '}
        
        <LeggTilLenkeAlle />
        </>
        <Form>
        </Form>
    </container>
   
    )// slutt på return

}  // Slutt på render
// Slutt på klasse
export default AddLenkeBruker;

