import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button } from 'react-bootstrap'; 

function EndreLenke(props) {
    // const idbruker = props.senderIdbruker;
    const lenkeID = props.senderlenkeid;
    const tittel = props.senderTittel;
    const info = props.senderInfo;
    const url = props.senderUrl;
    const [nyTittel, setNyTittel] = useState("");
    const [nyInfo, setNyInfo] = useState("");
    const [nyUrl, setNyUrl] = useState("");

    const endreL = () => {
        if (window.confirm(`Du har nå endret denne lenken til: ${ nyTittel } ${nyInfo} ${nyUrl} vil du gjøre endringen ?`)) {
            axios.post('http://localhost:3001/api/endreLenke', 
            { lenkeID: lenkeID, info: nyInfo, tittel: nyTittel, url: nyUrl, });
        }     
    };
    
    return(
        <Form>
            <Form.Group>
                <label>Endre denne lenken: </label>
                <Form.Control 
                    input type="text" 
                    placeholder= {tittel} 
                    onChange = {(event) => {setNyTittel(event.target.value);}} /> 
                
                    <br />
                    <Form.Control 
                        input type="text" 
                        placeholder=  {info}  
                        onChange = {(event) => {setNyInfo(event.target.value);}}/>
                        <br />
                    <Form.Control 
                        input type="link" 
                        placeholder={url}
                        onChange = {(event) => {setNyUrl(event.target.value);}}/>
                        <br />
                    <Button 
                        onClick = {endreL} 
                        variant="primary" 
                        type = "submit">Endre lenke
                    </Button>
            </Form.Group>   
         </Form>   
    )
}

export default EndreLenke;