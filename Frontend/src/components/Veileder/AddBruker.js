import React, { useState } from "react";
import Axios from 'axios';
import { Button, ButtonGroup, ToggleButton, InputGroup, FormControl } from 'react-bootstrap';
import { InputFelt } from '../InputFelt';
import styled from 'styled-components';

export const RandomPassord = styled.button`
    display: block;
    margin: auto;
    border-radius: 10px;
`

export const AddBruker = function AddBruker() {
    const passordGenerator = require('password-generator');

    const radios = [
        { name: 'Bruker', value: '1' },
        { name: 'Veileder', value: '2' },
      ];
    
    const [fornavn, setFornavn] = useState(useState.fornavn);
    const [etternavn, setEtternavn] = useState(null);
    const [tlf, setTlf] = useState(null);
    const [epost, setEpost] = useState(null);
    const [idbrukertype, setIdbrukertype] = useState(1);
    const [genPassord, setGenpassord] = useState("");

    //Generer tilfeldige passord (5 tegn, med tall ):
    const randomPassord = () => {
        setGenpassord(passordGenerator(5, false));
    }

    const submitBruker = () => {
        Axios.post("http://localhost:3001/api/brukerCreate", {
        fornavn: fornavn, etternavn: etternavn, tlf: tlf, epost: epost, idbrukertype: idbrukertype, passord: genPassord
        }).then(() => {
        alert("Bruker lagt til!");
        });
    };    

    return (
        <div className="App text-center"><h1>Brukerregistrering</h1>
            <div className="form">
            <InputFelt label="Fornavn" name="fornavn" onChange={(e)=> {
                setFornavn(e.target.value);
                }} />

            <InputFelt label="Etternavn" name="etternavn" onChange={(e)=> {
                setEtternavn(e.target.value);
                }} />
            
            <InputFelt label="Telefon" name="tlf" onChange={(e)=> {
                setTlf(e.target.value);
                }} />
            
            <InputFelt label="E-post" name="epost" onChange={(e)=> {
                setEpost(e.target.value);
                }} />

            <ButtonGroup toggle className="m-4">
                {radios.map((radio, idx) => (
                <ToggleButton
                    key={idx}
                    type="radio"
                    variant="outline-secondary"
                    name="idbrukertype"
                    value={radio.value}
                    checked={idbrukertype === radio.value}
                    onChange={(e) => setIdbrukertype(e.currentTarget.value)}
                >
                    {radio.name}
                </ToggleButton>
                ))}
            </ButtonGroup>

            <RandomPassord>
                <InputGroup>
                    <InputGroup.Prepend>
                    <Button variant="outline-secondary" onClick={randomPassord}>Lag passord</Button>
                    </InputGroup.Prepend>
                    <FormControl className="text-center"
                    readOnly
                    name="genPassord"
                    value={genPassord}
                    />
                </InputGroup>
            </RandomPassord>

            <Button className="btn btn-success rounded mb-4" onClick={submitBruker}>Registrer</Button>
        </div>
    </div> 
    )
};