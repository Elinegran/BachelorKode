//Utviklet av: Gruppe 2
import React, { useState } from "react";
import Axios from 'axios';
import moment from 'moment';
import { InputGroup, FormControl, Button } from 'react-bootstrap';
import { FaRegCalendarAlt, FaRegClock, FaMapMarkerAlt } from 'react-icons/fa';

import styled from 'styled-components';
import { Responsive } from '../Responsive';

const ResponsiveContainer = styled.div` 
.input-group  {
    width: 100%;
    ${Responsive.tablet}{
        width: 100%;
    }
    ${Responsive.pc}{
        width: 50%;
    }
}
`
export const AddAktivitet = function AddAktivitet() {

    const [tittel, setTittel] = useState(null);
    const [dato, setDato] = useState(null);
    const [tidspunkt, setTidspunkt] = useState(null);
    const [sted, setSted] = useState(null);
    const [tekst, setTekst] = useState(null); 

    const submitAktivitet = () => {
        Axios.post("http://localhost:3001/api/aktivitetCreate", {
        tittel: tittel, 
        dato: moment(dato, "DD-MM-YYYY").format("YYYY-MM-DD"), 
        tidspunkt: tidspunkt, 
        sted: sted, 
        tekst: tekst
        // Automatisk oppdatering av siden ved å trykke på submit
        }).then(() => {
            window.location.reload(false);
            alert("Aktivitet er lagt til!"); 
        });
    };  

    return (
        <div className="App text-center"><h1>Legg til ny aktivitet</h1>
        <ResponsiveContainer>
                <div className="form">
                    <InputGroup className="mb-2 mt-3 mx-auto rounded">   
                        <InputGroup.Prepend>
                            <InputGroup.Text>Tittel</InputGroup.Text>
                        </InputGroup.Prepend>
                            <FormControl as="textarea" label="Tittel" type="text" placeholder="Tittel" name="tittel" autoFocus="true" onChange={(e)=> {
                                setTittel(e.target.value);
                                }} />
                    </InputGroup>

                    <InputGroup className="mb-2 mx-auto rounded">   
                        <InputGroup.Prepend>
                            <InputGroup.Text><FaRegCalendarAlt/></InputGroup.Text>
                        </InputGroup.Prepend>
                            <FormControl label="Dato" type="text" name="dato" placeholder="DD/MM/ÅÅÅÅ" onChange={(e)=> {
                                setDato(e.target.value);
                                }} />
                        <InputGroup.Prepend>
                            <InputGroup.Text><FaRegClock/></InputGroup.Text>
                        </InputGroup.Prepend>
                            <FormControl label="Tidspunkt" type="text" name="tidspunkt" placeholder="00:00" onChange={(e)=> {
                                setTidspunkt(e.target.value);
                                }} />
                    </InputGroup>    
                                
                    <InputGroup className="mb-2 mx-auto rounded">   
                        <InputGroup.Prepend>
                            <InputGroup.Text><FaMapMarkerAlt/></InputGroup.Text>
                        </InputGroup.Prepend>   
                            <FormControl label="Sted" type="text" name="sted" placeholder="Sted" onChange={(e)=> {
                                setSted(e.target.value);
                                }} />
                    </InputGroup>
                  
                    <InputGroup className="mb-2 mx-auto rounded">   
                        <InputGroup.Prepend>
                            <InputGroup.Text>Tekst</InputGroup.Text>
                        </InputGroup.Prepend> 
                            <FormControl as="textarea" label="Tekst" type="text" name="tekst" placeholder="Tekst" onChange={(e)=> {
                                setTekst(e.target.value);
                                }} />
                    </InputGroup>

                        <Button className="btn btn-success rounded mb-5" onClick={submitAktivitet}>Legg til</Button>
                </div>
        </ResponsiveContainer>
        </div>
    );
};

export default AddAktivitet;