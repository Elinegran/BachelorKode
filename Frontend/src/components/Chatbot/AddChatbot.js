//Utviklet av: Gruppe 2
import React, { useState } from "react";
import Axios from 'axios';
import { InputGroup, FormControl } from 'react-bootstrap';
import styled from 'styled-components';
import { Responsive } from '../Responsive';
import Tooltip from "./Tooltip";

const ResponsiveContainer = styled.div` 
.input-group-text {
    width: 100px;
}

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
export const AddChatbot = function AddChatbot() {

    const [keywords, setKeywords] = useState(null);
    const [svar, setSvar] = useState(null);
    const [linkTekst, setLinkTekst] = useState(null);
    const [link, setLink] = useState(null);
    const submitChatbot = () => {
        Axios.post("http://localhost:3001/api/chatbotCreate", {
        keywords: keywords, svar: svar, linkTekst: linkTekst, link: link
        // Automatisk oppdatering av siden ved å trykke på submit
        }).then(() => {
        //setFaqList([...faqList, {spørsmål: spørsmål, svar: svar}])
            window.location.reload(false);
            alert("Chatbot spørsmål lagt til!");
        });
    };  

    return (
        <div className="App text-center"><h1>Legg til nye nøkkelord, svar og link til MatchBot</h1>
            <ResponsiveContainer>
                <div className="form">
                    <InputGroup className="mb-2 mt-3 mx-auto rounded">   
                        <InputGroup.Prepend >
                            <InputGroup.Text>Nøkkelord</InputGroup.Text>
                        </InputGroup.Prepend>
                            <FormControl as="textarea" label="Nøkkelord" type="text" name="nøkkelord" defaultValue={keywords} autoFocus="true" onChange={(e)=> {
                                setKeywords(e.target.value);
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
                    <InputGroup className="mb-2 mx-auto rounded">   
                          <InputGroup.Prepend >
                            <InputGroup.Text>Lenketekst</InputGroup.Text>
                          </InputGroup.Prepend>
                            <FormControl as="textarea" label="LinkTekst" type="text" name="linkTekst" defaultValue={linkTekst} onChange={(e)=> {
                                setLinkTekst(e.target.value);
                                }} />
                    </InputGroup>
                    <InputGroup className="mb-2 mx-auto rounded">   
                          <InputGroup.Prepend >
                            <InputGroup.Text>Link</InputGroup.Text>
                          </InputGroup.Prepend>
                            <FormControl as="textarea" label="Link" type="text" name="link" defaultValue={link} onChange={(e)=> {
                                setLink(e.target.value);
                                }} />
                    </InputGroup>
                        <button className="btn btn-success rounded mr-2 mb-5" onClick={submitChatbot}>Legg til</button>
                        <Tooltip  />
                </div>
            </ResponsiveContainer>
        </div> 
    );

};


