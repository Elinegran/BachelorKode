import React from 'react';  

// Funksjon som viser en overskrift 
function Meldingsheader({overskrift}){
    return(
        <header className="meldingsoverskrift" >
            <h1 className="overskrift">{overskrift}</h1>     
        </header>
    );
} 

export default Meldingsheader; 