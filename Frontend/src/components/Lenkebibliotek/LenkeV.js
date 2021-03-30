import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {InputGroup, Button} from 'react-bootstrap'
import FormControl from 'react-bootstrap/FormControl'
import Form from 'react-bootstrap/Form'

export const LenkeV = () => {
    return (

    <container>
        <label><b>Legg til link</b></label>
        <Form>
            <Form.Group controlId="exampleForm.SelectCustom">
            <Form.Label>Velg en brukergruppe</Form.Label>
            <Form.Control as="select" size="sm" custom>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
            </Form.Control>
             </Form.Group>
        </Form>

        <label>eller velg en bruker</label>

        <Form>
            <Form.Group controlId="exampleForm.SelectCustom">
            <Form.Label>Velg en bruker</Form.Label>
            <Form.Control as="select" size="sm" custom>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
            </Form.Control>
             </Form.Group>
        </Form>

        <label><b>Skriv inn info</b></label>

        <Form.Group>
            <Form.Control type="text" placeholder="Tittel" />
            <br />
            <Form.Control type="text" placeholder="Info" />
            </Form.Group>

        <label htmlFor="basic-url">Legg til en lenke</label>
        <InputGroup className="mb-3">
                <InputGroup.Prepend>
                    <InputGroup.Text id="basic-addon3">
                    https://eksempel.com
                    </InputGroup.Text>
                </InputGroup.Prepend>
            <FormControl id="add_link" aria-describedby="basic-addon3" />
        </InputGroup>

        <Button variant="primary">Legg til lenke</Button>{' '}
  
    </container>
   
    );
}; 
  
  
  
export default LenkeV;