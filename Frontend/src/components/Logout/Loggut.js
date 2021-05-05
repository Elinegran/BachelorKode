//Utviklet av: Gruppe 2
import React from 'react';
import AuthService from '../../services/auth.service';
function Loggut() {
    return (
        <div>
            {AuthService.logout()}
        </div>
    )
}

export default Loggut
