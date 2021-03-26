import React, { useState, useEffect } from "react";
import Axios from 'axios';
import moment from 'moment';
import { InputGroup, FormControl, Button, ButtonGroup, Card } from 'react-bootstrap';
import { FaRegCalendarAlt, FaRegClock, FaMapMarkerAlt } from 'react-icons/fa';

import styled from 'styled-components';
import { Responsive } from '../Responsive';

const ResponsiveContainer = styled.div` 
.input-group  {
    width: 100%;
    ${Responsive.tablet}{
        width: 50%;
    }
    ${Responsive.pc}{
        width: 50%;
    }
}
`

export const UpdateAktivitet = function UpdateAktivitet() {

    var tittel, dato, tidspunkt, sted, tekst;

    const [aktivitetsList, setAktivitetsList] = useState([]);


    useEffect(() => {
        Axios.get("http://localhost:3001/api/aktivitetGetAll").then((response) => {
            setAktivitetsList(response.data);
        });
    }, []);

    var [newTittel, setNewTittel] = useState(null);
    var [newDato, setNewDato] = useState(null);
    var [newTidspunkt, setNewTidspunkt] = useState(null);
    var [newSted, setNewSted] = useState(null);
    var [newTekst, setNewTekst] = useState(null);

    const updateAktivitet = (idaktivitet) => {
        //Sjekker om fødselsdato er dato:
        var checkDate = moment(newDato, "DD MM YYYY").isValid();
        if(checkDate==false) {
            newDato=dato;
        }

        Axios.post("http://localhost:3001/api/aktivitetUpdate", {
            tittel,
            dato: moment(dato, "DD-MM-YYYY").format("YYYY-MM-DD"),
            tidspunkt,
            sted,
            tekst,

            newTittel: newTittel, 
            newDato: moment(newDato, "DD-MM-YYYY").format("YYYY-MM-DD"),
            newTidspunkt: newTidspunkt,
            newSted: newSted, 
            newTekst: newTekst,
            idaktivitet: idaktivitet 
        }).then((response) => {
            if(response.data) {
                window.location.reload(false);
                alert("Aktivitet er endret!"); }
        });
    };    


    const deleteAktivitet = (idaktivitet) => {
        Axios.post('http://localhost:3001/api/aktivitetDelete', {
            idaktivitet: idaktivitet
        }).then((response) => { 

        setAktivitetsList(aktivitetsList.filter((val)=> {
            return val.idaktivitet != idaktivitet;
        })
        )});
    };


    return (
        <div className="App text-center"><h1>Endre aktiviteter</h1>
        <ResponsiveContainer>
            {aktivitetsList.map((val) => {return (
                 tittel=val.tittel,
                 dato=moment(val.dato).format("DD/MM/YYYY"),
                 tidspunkt=val.tidspunktformat,
                 sted=val.sted,
                 tekst=val.tekst,

                <div className="form">
                    <InputGroup className="mb-2 mx-auto rounded">   
                        <InputGroup.Prepend>
                            <InputGroup.Text>Tittel</InputGroup.Text>
                        </InputGroup.Prepend>
                            <FormControl as="textarea" label="Tittel" type="text" name="tittel" defaultValue={tittel} onChange={(e)=> {
                                setNewTittel(e.target.value);
                                }} />
                    </InputGroup>

                    <InputGroup className="mb-2 mx-auto rounded">   
                        <InputGroup.Prepend>
                            <InputGroup.Text><FaRegCalendarAlt/></InputGroup.Text>
                        </InputGroup.Prepend>
                            <FormControl label="Dato" type="text" name="dato" defaultValue={dato} onChange={(e)=> {
                                setNewDato(e.target.value);
                                }} />
                        <InputGroup.Prepend>
                            <InputGroup.Text><FaRegClock/></InputGroup.Text>
                        </InputGroup.Prepend>
                            <FormControl label="Tidspunkt" type="text" name="tidspunkt" defaultValue={tidspunkt} onChange={(e)=> {
                                setNewTidspunkt(e.target.value);
                                }} />
                    </InputGroup>    
                      
                    <InputGroup className="mb-2 mx-auto rounded">   
                        <InputGroup.Prepend>
                            <InputGroup.Text><FaMapMarkerAlt/></InputGroup.Text>
                        </InputGroup.Prepend>   
                            <FormControl label="Sted" type="text" name="sted" defaultValue={sted} onChange={(e)=> {
                                setNewSted(e.target.value);
                                }} />
                    </InputGroup>
                  
                    <InputGroup className="mb-2 mx-auto rounded">   
                        <InputGroup.Prepend>
                            <InputGroup.Text>Tekst</InputGroup.Text>
                        </InputGroup.Prepend> 
                            <FormControl as="textarea" label="Tekst" type="text" name="tekst" defaultValue={tekst} onChange={(e)=> {
                                setNewTekst(e.target.value);
                                }} />
                    </InputGroup>
                   
                    <ButtonGroup className="mb-4">
                        <Button className="btn btn-outline-primary btn-m" variant="light" onClick={() => updateAktivitet(val.idaktivitet)}>Lagre</Button>
                        <Button className="btn btn-outline-danger btn-m" variant="light" onClick={() => deleteAktivitet(val.idaktivitet)}>Slett</Button>
                    </ButtonGroup>
                </div>
            )
            })}
        </ResponsiveContainer>
        </div>
    );

};

export default UpdateAktivitet;