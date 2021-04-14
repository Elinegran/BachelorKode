/* import React from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstap

function DropdownBrukere (){
    const bruker = 0;

    axios.get("http://localhost:3001/api/brukerGetAll"); 

    const bruker = () => {
        axios.get("http://localhost:3001/api/brukerGetAll")
      };
    
    return(

        <select className="custom-select" > {/* onChange={} 
            <option selected>--Bruker--</option>
            { bruker.map(alleBrukere => 
            <option value={alleBrukere.idbruker}>{alleBrukere.fornavn}</option>   
            )}
        </select>    

    ) // slutt på return
} // slutt på funksjon

export default DropdownBrukere;
 */