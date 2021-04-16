import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstap
import { Form, Button } from 'react-bootstrap'; // Bootstrap-greier
// import AuthService from '../../../services/auth.service'; 




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
            { data:{ lenkeID: lenkeID, info: nyInfo, tittel: nyTittel, url: nyUrl, }});
        }     
        alert ("lenkeID" + lenkeID)
        alert ("url" + nyUrl);
        alert ("tittel" + nyTittel);
        alert ("info" + nyInfo);
    };
    
    return(
        <Form>
            <Form.Group>
                <label>Endre denne lenken: </label>
                <Form.Control 
                    input type="text" 
                    placeholder="Ny Tittel" 
                    onChange = {(event) => {setNyTittel(event.target.value);}} /> 
                
                    <br />
                    <Form.Control 
                        input type="text" 
                        placeholder=" Ny Info"  
                        onChange = {(event) => {setNyInfo(event.target.value);}}/>
                        <br />
                    <Form.Control 
                        input type="link" 
                        placeholder=" Ny URL" 
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