import React from 'react';
import { useState } from "react"; // for å sende til backend
import axios from 'axios'; // for å sende/ motta til/ fra backend
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstap
import { Container, Row, Col, Button, Form } from 'react-bootstrap'; // Bootstrap-greier

function Test() {
    const [idbruker, setBruker] = useState(0); 
    const [gruppeID, setGruppe] = useState(0); 

    // Sender det nye gruppenavnet til backend
    const addMedl = () => {
        axios.post("http://localhost:3001/api/grupperNyeGruppemedlemmer", { idbruker: idbruker, gruppeID: gruppeID, })   
      };

    return(
        <div>
        <select className="custom-select" onChange={(e)=> {
            const selectedBruker = e.target.value;
            setBruker(selectedBruker); 
        }}>
            <option value="2">Knut</option>
            <option value="3">Per</option>
            <option value="4">Truls</option>
        </select>
        {idbruker}

        <select className="custom-select" onChange={(e)=> {
            const selectedGruppe = e.target.value;
            setGruppe(selectedGruppe); 
        }}>
            <option value="2">Søvngruppa</option>
            <option value="3">Bakegruppa</option>
            <option value="4">CV-gruppa</option>
        </select>
        {gruppeID}
        <Button onClick={addMedl} variant="success" type="submit">Lagre medl</Button>
        </div>
    ) // slutt på return
} // slutt å funksjon Test

export default Test; 