import React from 'react';
import axios from 'axios';
import {InputGroup, Button, InputFelt, Row, Col} from 'react-bootstrap'
import { useState } from "react"; // for å sende til backend
import FormControl from 'react-bootstrap/FormControl'
import Form from 'react-bootstrap/Form'
import 'bootstrap/dist/css/bootstrap.min.css';
import AuthService from '../../services/auth.service';

// const idbruker = AuthService.getUserId();
function NyLenke() {
    const [url, setUrl] = useState("");

    const addLenke = () => {
        axios.post("http://localhost:3001/api/lenkerNylenke", {url: url,})   
    };

    return(

        <Form.Group>
            <Form.Control input type="text" placeholder="Tittel" />
            <br />
            <Form.Control input type="text" placeholder="Info" />
            <br />
            <Form.Control input type="text" placeholder="URL" onChange = {(event) => {setUrl(event.target.value);}}/>
            <br />
            <Button onClick = {addLenke} variant="primary" type = "submit">Legg til lenke</Button>
            
        </Form.Group>   

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