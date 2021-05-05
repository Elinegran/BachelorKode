//Utviklet av: Gruppe 2
import React, { useState, useEffect } from "react";
import Axios from 'axios';
import moment from 'moment';
import { InputFelt } from '../InputFelt'
import { ButtonGroup, ToggleButton, OverlayTrigger, Popover, InputGroup } from 'react-bootstrap';
import styled from "styled-components";
import authService from "../../services/auth.service";

const PasswordContainer = styled.div `
    margin-top: 2em;
  `
export const UpdateBruker = function UpdateBruker() {
    var fornavn, etternavn, fdato, tlf, epost, gatenavn, postnr, poststed, kjonn;

    const [brukerInfo, setBrukerInfo] = useState([]);
    var idbruker = localStorage.getItem("userId");
    const [message, setMessage] = useState(null);

    //Password tooltip:
    const popover = (
        <Popover id="popover-basic">
          <Popover.Title as="h3">Passord krav</Popover.Title>
          <Popover.Content class="popver-content">
            Passordet må inneholde:
            <li><strong>en stor bokstav</strong></li>
            <li><strong>et tall</strong></li>
            <li><strong>minimum 8 tegn</strong></li>
          </Popover.Content>
        </Popover>
    );

    //Kjønn-radioknapper:
    const radios = [
        { name: 'Mann', value: "Mann" },
        { name: 'Kvinne', value: "Kvinne" },
      ];
    
    useEffect(() => {
        Axios.get("http://localhost:3001/api/brukerGetOne",   
        {params: 
            { idbruker : idbruker }
        }).then((response) => {
            setBrukerInfo(response.data);
            console.log(response.data);
        })
    }, [idbruker]);

    brukerInfo.map((val) => {
        return (
            fornavn=val.fornavn,
            etternavn=val.etternavn,
            fdato=moment(val.fdato).format("DD/MM/YYYY"),
            tlf=val.tlf,
            epost=val.epost,
            gatenavn=val.gatenavn,
            postnr=val.postnr,
            poststed=val.poststed,
            kjonn=val.kjonn
        );
    });

    var [newKjonn, setNewKjonn] = useState("");
    var [newFornavn, setNewFornavn] = useState(null);
    var [newEtternavn, setNewEtternavn] = useState(null);
    var [newFdato, setNewFdato] = useState(null);
    var [newTlf, setNewTlf] = useState(null);
    var [newEpost, setNewEpost] = useState(null);
    var [newGatenavn, setNewGatenavn] = useState(null);
    var [newPostnr, setNewPostnr] = useState(null);
    var [newPoststed, setNewPoststed] = useState(null);
    var [newPassord, setNewPassord] = useState(null);
    var [confirmPassord, setConfirmPassord] = useState(null);


    const updatePassord = () => {
        Axios.post("http://localhost:3001/api/passordUpdate", {
            newPassord: newPassord, 
            confirmPassord: confirmPassord,
            idbruker: idbruker,
        }).then((response) => {
            if(response.data) {
                setMessage(response.data.message);
            }
            if(response.data.updated) {
                authService.removePswstatus();
            }
        });
    };    


    const updateBrukerinfo = () => {
        //Sjekker om fødselsdato er dato:
        var checkDate = moment(newFdato, "DD MM YYYY").isValid();
        if(checkDate===false) {
            newFdato=fdato;
        };

        Axios.post("http://localhost:3001/api/brukerUpdate", {
            fornavn,
            etternavn,
            fdato: moment(fdato, "DD-MM-YYYY").format("YYYY-MM-DD"), 
            tlf,
            epost,
            gatenavn,
            postnr,
            poststed,
            kjonn,

            newKjonn: newKjonn,
            newFornavn: newFornavn, 
            newEtternavn: newEtternavn,
            //kan legge inn dato med formatet: DD-MM-YYYY, DDMMYYYY, DD/MM/YYYY:
            newFdato: moment(newFdato, "DD-MM-YYYY").format("YYYY-MM-DD"), 
            newTlf: newTlf,
            newEpost: newEpost, 
            newGatenavn: newGatenavn, 
            newPostnr: newPostnr, 
            newPoststed: newPoststed,
            idbruker: idbruker,
            }).then((response) => {
                if(response.data) {
                    alert("Brukerinfo er endret!");
                };
        });
    };    
    
    return (
        <div className="App text-center"><h1>Brukerinfo</h1>
            <div className="form">
                <InputFelt label="Fornavn" type="text" name="fornavn" placeholder="Fornavn" defaultValue={fornavn} onChange={(e)=> {
                    setNewFornavn(e.target.value);
                    }} />
                <InputFelt label="Etternavn" type="text" name="etternavn" placeholder="Etternavn" defaultValue={etternavn} onChange={(e)=> {
                    setNewEtternavn(e.target.value);
                    }} />
                <InputFelt label="Fødselsdato" type="text" name="fdato" placeholder="DD/MM/ÅÅÅÅ" defaultValue={fdato} onChange={(e)=> {
                    setNewFdato(e.target.value);
                    }} />
                <InputFelt label="Telefon" type="text" name="tlf" placeholder="Tlf" defaultValue={tlf} onChange={(e)=> {
                    setNewTlf(e.target.value);
                    }} />
                <InputFelt label="E-post" type="text" name="epost" placeholder="eksempel@epost.no" defaultValue={epost} onChange={(e)=> {
                    setNewEpost(e.target.value);
                    }} />
                <InputFelt label="Gatenavn" type="text" name="gatenavn" placeholder="Gatenavn" defaultValue={gatenavn} onChange={(e)=> {
                    setNewGatenavn(e.target.value);
                    }} />
                <InputFelt label="Postnr" type="text" name="postnr" placeholder="Postnr" defaultValue={postnr} onChange={(e)=> {
                    setNewPostnr(e.target.value);
                    }} />
                <InputFelt label="Poststed" type="text" name="poststed" placeholder="Poststed" defaultValue={poststed} onChange={(e)=> {
                    setNewPoststed(e.target.value);
                    }} />

                <ButtonGroup toggle className="m-4">
                    <InputGroup.Prepend>
                        <InputGroup.Text id="basic-addon1">Kjønn</InputGroup.Text>
                    </InputGroup.Prepend>
                    {radios.map((radio, idx) => (
                        <ToggleButton
                            defaultValue={kjonn}
                            key={idx}
                            type="radio"
                            variant="outline-info"
                            name="kjonn"
                            value={radio.value}
                            checked={kjonn === radio.value}
                            onChange={(e) => setNewKjonn(e.currentTarget.value)} >
                            {radio.name}
                        </ToggleButton>
                        ))}
                </ButtonGroup>

                <button className="btn btn-success rounded d-block mx-auto" onClick={updateBrukerinfo}>Oppdater</button>

                <PasswordContainer>
                    
                    <button className="btn btn-tooltip">
                    <OverlayTrigger trigger="click" placement="bottom" overlay={popover}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="#5edbdb" class="bi bi-patch-question" viewBox="0 0 16 16">
                            <path d="M8.05 9.6c.336 0 .504-.24.554-.627.04-.534.198-.815.847-1.26.673-.475 1.049-1.09 1.049-1.986 0-1.325-.92-2.227-2.262-2.227-1.02 0-1.792.492-2.1 1.29A1.71 1.71 0 0 0 6 5.48c0 .393.203.64.545.64.272 0 .455-.147.564-.51.158-.592.525-.915 1.074-.915.61 0 1.03.446 1.03 1.084 0 .563-.208.885-.822 1.325-.619.433-.926.914-.926 1.64v.111c0 .428.208.745.585.745z"/>
                            <path d="m10.273 2.513-.921-.944.715-.698.622.637.89-.011a2.89 2.89 0 0 1 2.924 2.924l-.01.89.636.622a2.89 2.89 0 0 1 0 4.134l-.637.622.011.89a2.89 2.89 0 0 1-2.924 2.924l-.89-.01-.622.636a2.89 2.89 0 0 1-4.134 0l-.622-.637-.89.011a2.89 2.89 0 0 1-2.924-2.924l.01-.89-.636-.622a2.89 2.89 0 0 1 0-4.134l.637-.622-.011-.89a2.89 2.89 0 0 1 2.924-2.924l.89.01.622-.636a2.89 2.89 0 0 1 4.134 0l-.715.698a1.89 1.89 0 0 0-2.704 0l-.92.944-1.32-.016a1.89 1.89 0 0 0-1.911 1.912l.016 1.318-.944.921a1.89 1.89 0 0 0 0 2.704l.944.92-.016 1.32a1.89 1.89 0 0 0 1.912 1.911l1.318-.016.921.944a1.89 1.89 0 0 0 2.704 0l.92-.944 1.32.016a1.89 1.89 0 0 0 1.911-1.912l-.016-1.318.944-.921a1.89 1.89 0 0 0 0-2.704l-.944-.92.016-1.32a1.89 1.89 0 0 0-1.912-1.911l-1.318.016z"/>
                            <path d="M7.001 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0z"/>
                        </svg>
                        </OverlayTrigger>
                    </button>
              
                    <InputFelt label="Passord" type="password" name="passord" placeholder="Skriv nytt passord" onChange={(e)=> {
                        setNewPassord(e.target.value);
                        }} /> 
                    <InputFelt label="Gjenta passord" type="password" name="gjentaPassord" placeholder="Gjenta passord" onChange={(e)=> {
                        setConfirmPassord(e.target.value);
                        }} />

                    <p>{message}</p>
                        
                    <button className="btn btn-success rounded mb-4" onClick={updatePassord}>Endre passord</button>
                </PasswordContainer>
                   
            </div>
        </div>  
    );

};