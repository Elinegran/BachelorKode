//Utviklet av: Gruppe 2
import React from 'react'
import { Container } from 'react-bootstrap'
import { LoggInn } from '../../components/Login/LoggInn'
import  ForsideVeilder  from '../../pages/ForsideVeileder/ForsideVeileder'
import ForsideBruker  from '../../pages/ForsideBruker/ForsideBruker'
import authService from '../../services/auth.service'

var getAccessToken = authService.getToken();
var getRole = authService.getRole();
var roleCheck;

if(getRole === 1){
        roleCheck=false;
} else if(getRole === 2) {
        roleCheck=true;
}


export const Logginn = () => (

        <Container>
                {getAccessToken ? (roleCheck ? <ForsideVeilder /> : <ForsideBruker />)
                : <LoggInn /> }
                
        </Container>
)