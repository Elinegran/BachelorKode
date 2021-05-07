import React from 'react';
import axios from 'axios';
import {Button} from 'react-bootstrap'
import Form from 'react-bootstrap/Form'
import SelectBrukere from '../Meldinger/Felles/selectBruker';
import SelectGruppe from '../Meldinger/Grupper/selextGruppe';

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
        axios.post("http://localhost:3001/api/lenkeAddBruker",
         {idbruker: this.state.idbruker, lenkeID: this.state.lenkeID})
        
    }else {
        alert("gruppeID valgt:" + this.state.gruppeID) 
        axios.post("http://localhost:3001/api/lenkeAddGruppe", 
            {gruppeID: this.state.gruppeID, lenkeID: this.state.lenkeID})
    } 
    };
    render () { 
        return (

            <container>
                <Form>
                    <Form.Group controlId="exampleForm.SelectCustom">
                        <Form.Label>Velg en bruker</Form.Label>
                        <SelectBrukere onHandleSelect={this.handleChange}/>
                    </Form.Group>

                    <Form.Group controlId="exampleForm.SelectCustom">
                        <Form.Label>Velg en gruppe</Form.Label>
                        <SelectGruppe onHandleSelectG={this.handleChangeG} />
                    </Form.Group>
                    
                    <Button  onClick = {this.addLenkeBruker}
                    type = "submit" variant ="success"><b>Legg til lenke </b></Button>{' '}
                </Form>
            </container>
        
        )
    }
}
