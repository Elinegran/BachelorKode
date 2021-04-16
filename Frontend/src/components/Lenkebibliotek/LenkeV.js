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


export default class SelectLenker extends React.Component {
    constructor (props){
      super (props);
      this.state = {
      idbruker: "",
      lenkeID: this.props.senderlenkeid,
      gruppeID: "",
      fornavn : this.props.senderfornavn,
      }
      this.handleChange = this.handleChange.bind(this);
      this.handleChangeG = this.handleChangeG.bind(this);
    };
    
    handleChange (value) {
        this.setState({idbruker: value})
    }

    handleChangeG (value) {
        this.setState({gruppeID: value})
    }

       addLenkeBruker = () => {
           if (this.state.idbruker) {
            axios.post("http://localhost:3001/api/lenkeAddBruker", {idbruker: this.state.idbruker, lenkeID: this.state.lenkeID})
        }
        else {
            alert("gruppeID valgt:" + this.state.gruppeID)
        }
            // alert(idbruker + lenkeID);   
        };
    render () { 
        return (

        <container>
            <Form>
                <Form.Group controlId="exampleForm.SelectCustom">
                <Form.Label>Velg en gruppe</Form.Label>
                <SelectGruppe onHandleSelect={this.handleChangeG} />
                </Form.Group>
            

            <label><b>eller velg</b></label>

            
                <Form.Group controlId="exampleForm.SelectCustom">
                {/* <Form.Label>Velg en lenker</Form.Label> */}
                <SelectBrukere onHandleSelect={this.handleChange}/>
                
                </Form.Group>
            </Form> 
            
            <Button  onClick = {this.addLenkeBruker} 
            type = "submit" variant ="success"><b>Legg til lenke hos</b> {this.state.idbruker}</Button>{' '}
            
           
        </container>
        
    )
 }
}
