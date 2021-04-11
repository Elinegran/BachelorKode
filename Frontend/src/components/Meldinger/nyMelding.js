import React from 'react'
import Skrivemeldinger from '../../components/Meldinger/skriveMelding.js';
import SelectBrukere from '../../components/Meldinger/Felles/selectBruker';
import { Container } from 'react-bootstrap';

//const mottaker = '';
export default class NyMelding extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            mottakerbruker: ''
        };

        this.handleSelect = this.handleSelect.bind(this);
    };

<<<<<<< HEAD
    async handleSelect(value){
        this.setState({mottakerbruker: value})
=======
    handleSelect(value){
        this.setState({mottakerbruker: value })
>>>>>>> 2d09b3b26d71480408fe60ba0993fc0c953d3834
        
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