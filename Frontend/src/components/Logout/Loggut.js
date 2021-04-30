import React from 'react';
import AuthService from '../../services/auth.service';
import Axios from 'axios';
function Loggut() {
    
    Axios.post("http://localhost:3001/api/tidsbankSlutt", 
    {
        idbruker : AuthService.getUserId()         
    })
    return (
        <div>
            {AuthService.logout()}
        </div>
    )
}

export default Loggut
