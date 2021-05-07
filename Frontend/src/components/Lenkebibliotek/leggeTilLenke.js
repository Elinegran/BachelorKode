import React from 'react';
import axios from 'axios';
import {Button} from 'react-bootstrap'
import { useState } from "react"; // for å sende til backend
import Form from 'react-bootstrap/Form'

function NyLenke() {
    const [url, setUrl] = useState("");
    const [tittel, setTittel] = useState("");
    const [info, setInfo] = useState("");

    const addLenke = () => {
        axios.post("http://localhost:3001/api/lenkerNylenke", {url: url, tittel: tittel, info: info}) 
    };
    
    return(
        <Form>
            <h1 style = {{ textAlign: 'center', fontSize:'25px'}}>Her kan du legge til nye lenker</h1>
            <Form.Group>
                <Form.Label>Tittel:</Form.Label> 
                    <Form.Control 
                    input type="text" 
                    placeholder="Tittel"
                    onChange = {(event) => {setTittel(event.target.value);}} />
            </Form.Group>
            
            <Form.Group>
                <Form.Label>Info:</Form.Label> 
                    <Form.Control 
                    input type="text" 
                    placeholder="Info" 
                    onChange = {(event) => {setInfo(event.target.value);}} />
            </Form.Group>

            <Form.Group>
                <Form.Label>Url:</Form.Label> 
                    <Form.Control 
                    input type="text" 
                    placeholder=" https://www.eksempel.no" 
                    onChange = {(event) => {setUrl(event.target.value);}}/>
            </Form.Group> 

            <Button 
            onClick = {addLenke} 
            variant="success" 
            type = "submit">
                Legg til lenke
            </Button>
            
        </Form>       
    )
}

export default NyLenke;
