//Utviklet av: Gruppe 2
import React, { useState } from "react";
import axios from 'axios';
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
    const [message, setMessage] = useState(null);

    //Generer tilfeldige passord (5 tegn, med tall ):
    const randomPassord = () => {
        setGenpassord(passordGenerator(5, false));
    }
    var mailformat = /^(([^<>()\\.,;:\s@"]+(\.[^<>()\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const submitBruker = () => {
        if(epost.match(mailformat)) {
            axios.post("http://localhost:3001/api/brukerCreate", {
            fornavn: fornavn, etternavn: etternavn, tlf: tlf, epost: epost, idbrukertype: idbrukertype, passord: genPassord
            }).then(() => {
            alert("Bruker lagt til!");
            });
        }
        else {
            setMessage("Du har oppgitt en ugyldig e-post adresse");
        }
    };    

    return (
        <div className="App text-center"><h1>Brukerregistrering</h1>
            <div className="form">
            <InputFelt label="Fornavn" name="fornavn" autoFocus="true" onChange={(e)=> {
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
            <p>{message}</p>

            <ButtonGroup toggle className="m-4">
                {radios.map((radio, idx) => (
                <ToggleButton
                    key={idx}
                    type="radio"
                    variant="outline-info"
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

            <Button className="btn btn-success rounded mt-4 mb-4" onClick={submitBruker}>Registrer</Button>
        </div>
    </div> 
    )
};