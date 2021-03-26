import { InputGroup, FormControl } from 'react-bootstrap';
import {appColors} from './Colors'
import styled from 'styled-components';
import { Responsive } from './Responsive';

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
    export const TekstFelt = ({label, type, name, onChange, placeholder, defaultValue}) => (
    <ResponsiveContainer>
        <InputGroup className="mb-3 mx-auto rounded">
            <InputGroup.Prepend class="col-xl-3 px-0">
                <InputGroup.Text>{label}</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl as="textarea" 
            type={type}
            name={name}
            onChange={onChange}
            placeholder={placeholder}
            defaultValue={defaultValue}
            />
        </InputGroup>
    </ResponsiveContainer>
)
