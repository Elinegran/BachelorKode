import React, { useEffect, useState } from "react";
import Axios from 'axios';
import { InputFelt } from '../InputFelt';

export const LoggInn = function LoggInn() {
   const [epost, setEpost] = useState(null);
   const [passord, setPassord] = useState("");
   const [loginStatus, setLoginStatus] = useState("");

   Axios.defaults.withCredentials = true;

   const submit = () => {Axios.post("http://localhost:3001/api/logginnValidate", {
      epost: epost, passord: passord
   }).then((res) => {
         if(res.data.accessToken) {
               setLoginStatus(res.data.message + " " + res.data.user[0].fornavn + " " + res.data.user[0].etternavn + "!");
               if (res.data.accessToken) {
                  localStorage.setItem("user", JSON.stringify(res.data.user[0].fornavn + " " + res.data.user[0].etternavn + ", " + res.data.user[0].epost));
                  localStorage.setItem("userId", JSON.stringify(res.data.id));
                  localStorage.setItem("userRole", JSON.stringify(res.data.role));
                  localStorage.setItem("token", JSON.stringify(res.data.accessToken));
                  localStorage.setItem("username", JSON.stringify(res.data.user[0].fornavn));
                  if(res.data.user[0].idbrukertype === 2) {
                     window.location.href="/veileder";
                  } else if(res.data.user[0].idbrukertype === 1) {
                     window.location.href="/bruker";
                  }
               }
         } else {
            setLoginStatus(res.data.message);
         }
      });
  };

   return (
      <div className="App text-center"><h1>Logg inn</h1>
         <div className="form">
               <InputFelt label="E-post" name="epost" type="text" onChange={(e)=> {
                     setEpost(e.target.value);
                     }} />

               <InputFelt label="Passord" name="passord" type="password" required onChange={(e)=> {
                     setPassord(e.target.value);
                     }} />
                     
               <p>{loginStatus}</p>

               <button className="btn btn-success rounded m-4" onClick={submit}>Logg inn</button>

         </div>
      </div>
   )
}