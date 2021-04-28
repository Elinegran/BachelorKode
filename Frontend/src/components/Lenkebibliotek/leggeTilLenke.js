import React from 'react';
import axios from 'axios';
import {Button, FormControl} from 'react-bootstrap'
import { useState } from "react"; // for å sende til backend
import Form from 'react-bootstrap/Form'
import 'bootstrap/dist/css/bootstrap.min.css';

function NyLenke() {
    const [url, setUrl] = useState("");
    const [tittel, setTittel] = useState("");
    const [info, setInfo] = useState("");

    const addLenke = () => {
        axios.post("http://localhost:3001/api/lenkerNylenke", {url: url, tittel: tittel, info: info})
        alert(url + tittel +info);   
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

            <Button onClick = {addLenke} variant="success" type = "submit">Legg til lenke</Button>
          
    </Form>       
    )
}

export default NyLenke;




       {/* <label htmlFor="basic-url">Legg til en lenke</label>
        <InputGroup className="mb-3">
                <InputGroup.Prepend>
                    <InputGroup.Text id="basic-addon3">
                        URL
                    </InputGroup.Text>
                </InputGroup.Prepend>
            <FormControl id="add_link" aria-describedby="basic-addon3" />
        </InputGroup> */}

//         <Form>
//         <h1 style = {{ textAlign: 'center', fontSize:'25px'}}>Her kan du legge til nye lenker</h1>
//         <Form.Group>
//             <Form.Control input type="text" placeholder="Tittel"onChange = {(event) => {setTittel(event.target.value);}} />
//             <br />
//             <Form.Control input type="text" placeholder="Info" onChange = {(event) => {setInfo(event.target.value);}} />
//             <br />
//             <Form.Control input type="text" placeholder=" https://www.eksempel.no" onChange = {(event) => {setUrl(event.target.value);}}/>
//             <br />
//             <Button onClick = {addLenke} variant="success" type = "submit">Legg til lenke</Button>
//         </Form.Group>   
//     </Form>       
//     )
// }