import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {InputGroup, Button, InputFelt} from 'react-bootstrap'
import FormControl from 'react-bootstrap/FormControl'
import Form from 'react-bootstrap/Form'
import SelectBrukere from '../Meldinger/Felles/selectBruker';
import SelectGruppe from '../Meldinger/Grupper/selextGruppe';
import Gruppeliste from '../Meldinger/grupper';

export const LenkeV = ({}) => {
    return (

    <container>
        <Form>
            <Form.Group controlId="exampleForm.SelectCustom">
            {/* <Form.Label>Velg en gruppe</Form.Label> */}
            <SelectGruppe/>
            </Form.Group>
        </Form>

        <label><b>eller velg</b></label>

        <Form>
            <Form.Group controlId="exampleForm.SelectCustom">
            {/* <Form.Label>Velg en bruker</Form.Label> */}
            <SelectBrukere/>
             </Form.Group>
        </Form>

        <label><b>Skriv inn info</b></label>

        <Form.Group>
            <Form.Control input type="text" placeholder="Tittel" />
            {/* onChange = {(event) => {setleggeTilLenke(event.target.value);}} */}
            <br />
            <Form.Control input type="text" placeholder="Info" />
            </Form.Group>

        <label htmlFor="basic-url">Legg til en lenke</label>
        <InputGroup className="mb-3">
                <InputGroup.Prepend>
                    <InputGroup.Text id="basic-addon3">
                        URL
                    </InputGroup.Text>
                </InputGroup.Prepend>
            <FormControl id="add_link" aria-describedby="basic-addon3" />
        </InputGroup>
        
        <Button variant="primary">Legg til lenke</Button>{' '}
        <br />
  
    </container>
   
    );
}; 
  
  
  
export default LenkeV;