import React from 'react';
import avatar from './avatar.jpg'; 
//import slide1 from '../../assets/images/Forside/slide1.jpg'; 
// import avatar from '../../assets/images/Meldinger/avatar.jpg'; 

//const brukerbilde = require('./avatar.jpg'); 

// Funksjon for å vise brukerbilde (avatar)
function Avatar() {
    return (
        <img className ="avatar" src = {avatar} alt = "bilde av brukeren" /> 
        // <img className="d-block w-100" src={slide1} alt="First slide" max-height="50px;" /> 
    ) // slutt på return
} // slutt på funksjon Avatar

export default Avatar; 