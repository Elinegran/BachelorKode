import React, { useState, useEffect } from "react";
import Axios from 'axios';
import moment from 'moment';
import { InputFelt } from '../InputFelt'
import AuthService from '../../services/auth.service';

export const UpdateBruker = function UpdateBruker() {

    var fornavn, etternavn, fdato, tlf, epost, gatenavn, postnr, poststed, passord;

    console.log("auth: " + AuthService.getUserId());

    const [brukerInfo, setBrukerInfo] = useState([]);
    var idbruker = localStorage.getItem("userId");

    
    useEffect(() => {
        Axios.get("http://localhost:3001/api/brukerGetOne",   
        {params: 
            { idbruker : idbruker }
        }).then((response) => {
            setBrukerInfo(response.data);
            console.log(response.data);
        })
    }, []);

    {brukerInfo.map((val) => {
        return (
            fornavn=val.fornavn,
            etternavn=val.etternavn,
            fdato=moment(val.fdato).format("DD/MM/YYYY"),
            tlf=val.tlf,
            epost=val.epost,
            gatenavn=val.gatenavn,
            postnr=val.postnr,
            poststed=val.poststed,
            passord=val.passord
        )
    })}

    
    var [newFornavn, setNewFornavn] = useState(null);
    var [newEtternavn, setNewEtternavn] = useState(null);
    var [newFdato, setNewFdato] = useState(null);
    var [newTlf, setNewTlf] = useState(null);
    var [newEpost, setNewEpost] = useState(null);
    var [newGatenavn, setNewGatenavn] = useState(null);
    var [newPostnr, setNewPostnr] = useState(null);
    var [newPoststed, setNewPoststed] = useState(null);
    var [newPassord, setNewPassord] = useState(null);

    
    const updateBrukerinfo = () => {
        //Sjekker om fødselsdato er dato:
        var checkDate = moment(newFdato, "DD MM YYYY").isValid();
        if(checkDate==false) {
            newFdato=fdato;
        }

        Axios.post("http://localhost:3001/api/brukerUpdate", {
            fornavn,
            etternavn,
            fdato: moment(fdato, "DD-MM-YYYY").format("YYYY-MM-DD"), 
            tlf,
            epost,
            gatenavn,
            postnr,
            poststed,
            passord,

            newFornavn: newFornavn, 
            newEtternavn: newEtternavn,
            //kan legge inn dato med formatet: DD-MM-YYYY, DDMMYYYY, DD/MM/YYYY:
            newFdato: moment(newFdato, "DD-MM-YYYY").format("YYYY-MM-DD"), 
            newTlf: newTlf,
            newEpost: newEpost, 
            newGatenavn: newGatenavn, 
            newPostnr: newPostnr, 
            newPoststed: newPoststed,
            newPassord: newPassord, 
            idbruker: idbruker,
            }).then((response) => {
                if(response.data) {
            alert("Brukerinfo er endret!"); }
        });
    };    

        return (
            <div className="App text-center"><h1>Brukerinfo</h1>
                <div className="form">
                    <InputFelt label="Fornavn" type="text" name="fornavn" defaultValue={fornavn} onChange={(e)=> {
                        setNewFornavn(e.target.value);
                        }} />

                    <InputFelt label="Etternavn" type="text" name="etternavn" defaultValue={etternavn} onChange={(e)=> {
                        setNewEtternavn(e.target.value);
                        }} />

                    <InputFelt label="Fødselsdato" type="text" name="fdato" defaultValue={fdato} onChange={(e)=> {
                        setNewFdato(e.target.value);
                        }} />

                    <InputFelt label="Telefon" type="text" name="tlf" defaultValue={tlf} onChange={(e)=> {
                        setNewTlf(e.target.value);
                        }} />

                    <InputFelt label="E-post" type="text" name="epost" defaultValue={epost} onChange={(e)=> {
                        setNewEpost(e.target.value);
                        }} />

                    <InputFelt label="Gatenavn" type="text" name="gatenavn" defaultValue={gatenavn} onChange={(e)=> {
                        setNewGatenavn(e.target.value);
                        }} />

                    <InputFelt label="Postnr" type="text" name="postnr" defaultValue={postnr} onChange={(e)=> {
                        setNewPostnr(e.target.value);
                        }} />

                    <InputFelt label="Poststed" type="text" name="poststed" defaultValue={poststed} onChange={(e)=> {
                        setNewPoststed(e.target.value);
                        }} />

                    <InputFelt label="Passord" type="password" name="passord" placeholder="Skriv nytt passord" onChange={(e)=> {
                        setNewPassord(e.target.value);
                        }} />
               
                    <button className="btn btn-success rounded mb-4" onClick={updateBrukerinfo}>Oppdater</button>
                </div>
            </div>  
        );

};