import React, { useState, useEffect } from "react";
import Axios from 'axios';
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


export const UpdateFAQ = function UpdateFAQ() {

    var spørsmål, svar;

    const [faqList, setFaqList] = useState([]);

    useEffect(() => {
        Axios.get("http://localhost:3001/api/faqGetAll").then((response) => {
            setFaqList(response.data);
        });
    }, []);

    var [newSpørsmål, setNewSpørsmål] = useState(null);
    var [newSvar, setNewSvar] = useState(null);

    const updateFaq = (idfaq) => {
        Axios.post("http://localhost:3001/api/faqUpdate", {
            spørsmål,
            svar,

            newSpørsmål: newSpørsmål,
            newSvar: newSvar,
            idfaq: idfaq
        }).then((response) => {
            if(response.data) {
                window.location.reload(false);
                alert("FAQ er endret!"); }
        });
    };  


    const deleteFaq = (idfaq) => {
        Axios.post('http://localhost:3001/api/faqDelete', {
            idfaq: idfaq
        }).then((response) => {
              
        setFaqList(faqList.filter((val)=> {
            return val.idfaq != idfaq;
        })
        )});
    };


    return (
        <div className="App text-center"><h1>Endre FAQ</h1>
        <ResponsiveContainer>
            {faqList.map((val) => {return (
                 spørsmål=val.spørsmål,
                 svar=val.svar,

                <div className="form">
                    <InputGroup className="mb-2 mx-auto rounded">   
                        <InputGroup.Prepend>
                            <InputGroup.Text>Spørsmål</InputGroup.Text>
                        </InputGroup.Prepend>
                            <FormControl as="textarea" label="Spørsmål" type="text" name="spørsmål" defaultValue={spørsmål} onChange={(e)=> {
                                setNewSpørsmål(e.target.value);
                                }} />
                      </InputGroup>

                      <InputGroup className="mb-2 mx-auto rounded">   
                          <InputGroup.Prepend>
                            <InputGroup.Text>Svar</InputGroup.Text>
                          </InputGroup.Prepend>
                            <FormControl as="textarea" label="Svar" type="text" name="svar" defaultValue={svar} onChange={(e)=> {
                                setNewSvar(e.target.value);
                                }} />
                      </InputGroup>

                      <ButtonGroup className="mb-4">
                        <Button className="btn btn-outline-primary btn-m" variant="light" onClick={() => updateFaq(val.idfaq)}>Lagre</Button>
                        <Button className="btn btn-outline-danger btn-m" variant="light" onClick={() => deleteFaq(val.idfaq)}>Slett</Button>
                    </ButtonGroup>
                </div>
            )
            })}
        </ResponsiveContainer>
        </div> 
    );

};

export default UpdateFAQ;