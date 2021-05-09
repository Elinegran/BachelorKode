import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap'; 

function EndreLenke(props) {
    const lenkeID = props.senderlenkeid;
    const tittel = props.senderTittel;
    const info = props.senderInfo;
    const url = props.senderUrl;
    const [nyTittel, setNyTittel] = useState(tittel);
    const [nyInfo, setNyInfo] = useState(info);
    const [nyUrl, setNyUrl] = useState(url);

    const endreL = () => {
        if (window.confirm(
            `Du har nå endret denne lenken til
             Tittel: ${ nyTittel } 
             Info: ${nyInfo} 
             url: ${nyUrl}
             Er du sikker på at du vil endre lenken?`)) {
            axios.post('http://localhost:3001/api/endreLenke', 
            { lenkeID: lenkeID, info: nyInfo, tittel: nyTittel, url: nyUrl, });
        }     
    };
    
    return(

        <Form>  
            <label class="font-weight-bold">Endre denne lenken: </label>
            <Form.Group>
                <Form.Label>Tittel:</Form.Label>           
                    <Form.Control
                        input type="text" 
                        defaultValue = {tittel} 
                        onChange = {(event) => {setNyTittel (event.target.value);}} />
            </Form.Group> 
                
            <Form.Group>
                <Form.Label>Info:</Form.Label>      
                    <Form.Control 
                        input type="text" 
                        defaultValue = {info}  
                        onChange = {(event) => {setNyInfo(event.target.value);}}/>
            </Form.Group>

            <Form.Group>
                <Form.Label>Lenke:</Form.Label>  
                    <Form.Control 
                        input type="link" 
                        defaultValue= {url}
                        onChange = {(event) => {setNyUrl(event.target.value);}}/>
            </Form.Group>  

                    <Button 
                        onClick = {endreL} 
                        variant="primary" 
                        type = "submit">Endre lenke
                    </Button>
         </Form> 
         
    )
}

export default EndreLenke;