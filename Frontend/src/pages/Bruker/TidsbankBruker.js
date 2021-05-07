//Utviklet av: Gruppe 2
import React from 'react'
import { Container } from 'react-bootstrap'
import {TidsbankChart} from '../../components/Bruker/Tidsbank'
import AuthService from '../../services/auth.service';


const data = {
        id: AuthService.getUserId()
    }

export const TidsbankBruker = () => (
        <Container>
                <TidsbankChart {...data} />
        </Container>     
)


