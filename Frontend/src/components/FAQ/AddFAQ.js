import React, { useState, useEffect } from "react";
import Axios from 'axios';
import { InputFelt } from '../InputFelt';
import { TekstFelt } from '../TekstFelt';
import { InputGroup, FormControl, Button, ButtonGroup } from 'react-bootstrap';

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

export const AddFAQ = function AddFAQ() {

    const [spørsmål, setSpørsmål] = useState(null);
    const [svar, setSvar] = useState(null);
     
    const [faqList, setFaqList] = useState([]);
    
   
    useEffect(() => {
        Axios.get("http://localhost:3001/api/faqGetAll").then((response) => {
            setFaqList(response.data);
        });
    }, []);

    const submitFaq = () => {
        Axios.post("http://localhost:3001/api/faqCreate", {
        spørsmål: spørsmål, svar: svar
        // Automatisk oppdatering av siden ved å trykke på submit
        }).then(() => {
        //setFaqList([...faqList, {spørsmål: spørsmål, svar: svar}])
            window.location.reload(false);
            alert("FAQ er lagt til!");
        });
    };  

    return (
        <div className="App text-center"><h1>Legg til ny FAQ</h1>
            <ResponsiveContainer>
                <div className="form">
                    <InputGroup className="mb-2 mx-auto rounded">   
                        <InputGroup.Prepend >
                            <InputGroup.Text>Spørsmål</InputGroup.Text>
                        </InputGroup.Prepend>
                            <FormControl as="textarea" label="Spørsmål" type="text" name="spørsmål" defaultValue={spørsmål} onChange={(e)=> {
                                setSpørsmål(e.target.value);
                                }} />
                    </InputGroup>

                    <InputGroup className="mb-2 mx-auto rounded">   
                          <InputGroup.Prepend >
                            <InputGroup.Text>Svar</InputGroup.Text>
                          </InputGroup.Prepend>
                            <FormControl as="textarea" label="Svar" type="text" name="svar" defaultValue={svar} onChange={(e)=> {
                                setSvar(e.target.value);
                                }} />
                    </InputGroup>
                        <button className="btn btn-success rounded m-4" onClick={submitFaq}>Legg til</button>
                </div>
            </ResponsiveContainer>
        </div> 
    );

};

export default AddFAQ;

/*
return (
    <div className="App text-center"><h1>Legg til ny FAQ</h1>
        <div className="form">
            <TekstFelt label="Spørsmål" name="spørsmål" onChange={(e)=> {
                setSpørsmål(e.target.value);
                }} />

            <TekstFelt label="Svar" name="svar" onChange={(e)=> {
                setSvar(e.target.value);
                }} />

            <button className="btn btn-success rounded m-4" onClick={submitFaq}>Legg til</button>
        </div>
    </div>
);
*/