//Utviklet av: Gruppe 2
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
    export const EndreFelt = ({label, type, name, onChange, placeholder, defaultValue}) => (
    <ResponsiveContainer>
     
           
            <FormControl
            type={type}
            name={name}
            onChange={onChange}
            placeholder={placeholder}
            defaultValue={defaultValue}
            />
       
    </ResponsiveContainer>
)