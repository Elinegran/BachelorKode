import React from 'react'
import Skrivemeldinger from '../../components/Meldinger/skriveMelding.js';
import SelectBrukere from '../../components/Meldinger/Felles/selectBruker';
import { Container } from 'react-bootstrap';

//const mottaker = '';
export default class NyMelding extends React.Component {
    constructor(){
        super();
        this.state = {
            mottakerbruker: ''
        };

        this.handleSelect = this.handleSelect.bind(this);
    }

    async handleSelect(value){
        this.setState({mottakerbruker: value })
         await alert('Detter er id:' + this.state.mottakerbruker)
    };
    

    render(){
        return(
            <Container>
            <SelectBrukere  onHandleSelect={this.handleSelect} />
                        
            <Skrivemeldinger mottakerID = {this.state.mottakerbruker} /> 
            </Container>
        )
    }
    


}