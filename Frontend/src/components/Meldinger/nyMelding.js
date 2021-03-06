import React from 'react'
import Skrivemeldinger from '../../components/Meldinger/skriveMelding.js';
import SelectBrukere from '../../components/Meldinger/Felles/selectBruker';


// Klasse som oppretter en ny melding til en ny bruker
export default class NyMelding extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            mottakerbruker: ''
        };

        this.handleSelect = this.handleSelect.bind(this);
    };

    handleSelect(value){
        this.setState({mottakerbruker: value })
        
    };
    

    render(){
        return(
            <p>
            <SelectBrukere  onHandleSelect={this.handleSelect} />
          
            <Skrivemeldinger mottakerID = {this.state.mottakerbruker} /> 
            </p>
        )
    }
    


}