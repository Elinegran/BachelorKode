import React,   { useState, useEffect } from "react";
import  UserIcon   from '../../assets/images/Bruker/icon_profile.png'
import  BackBtn   from '../../assets/images/Bruker/icon_back.png'
import { Table, Badge, Container, Media } from 'react-bootstrap';
import moment from 'moment';
// import '../App.css';
import Axios from 'axios';
import styled from 'styled-components';
import {appColors} from '../Colors';
import MediaQuery from 'react-responsive';
import { data } from "jquery";
import { TidsbankChart } from "../Bruker/Tidsbank";

//import TimeTracker from 'react-time-tracker';
export const BrukerContainer = styled.div`
    margin: auto;
    width: 100%;
    
    @media screen and (min-width:992px) {
       
        width: 100%;
    }
`

export const TableContainer = styled.table `
    margin: auto;
    width: 100%;
    transition: all 0.5s ease-in-out;
        .tilbakeBtn {
            float: right;
            cursor: pointer;
            img {
                max-width: 60px;
            }
            :hover {
                color: ${ appColors.primaryColor};
                transform: scale(1.05);
                cursor: pointer;
                transition: all 0.1s ease-in-out;
                text-decoration: underline;
                
                
            }
        }
        .table {
            
        }
        .table thead {
            background-color: ${ appColors.primaryColor};

            cursor: none;
            
        }
        .table tr {
            cursor: pointer;
           
        }
        
        }
        
    }
`

export const Btn = styled.div`
    margin: auto;
    margin-top: 5px;
    width: 100%;
    padding: 5px;
    cursor: pointer;
    border: 2px solid ${ appColors.primaryColor};
    border-radius:5%;
    -moz-border-radius:5%;
    -webkit-border-radius:5%;
    -khtml-border-radius: 5%;
    text-align: center;
  
    :hover {
        color: ${ appColors.primaryColor};
        transform: scale(1.05);
        cursor: pointer;
        transition: all 0.1s ease-in-out;
        text-decoration: underline;
        box-shadow: 0 5px 5px rgba(0,0,0,.5);
        cursor: pointer;
        border: 2px solid ${ appColors.primaryLighter};
    }
    @media screen and (min-width:992px) {
        
        position: center;
        margin-left: 2px;
        margin-right: 2px;
        width: 15%;
        display: inline-block;
    
    `

function BrukerTabell() {
    const [showBruker, setShowBruker] = React.useState(false);
    const [showStatusbtns, setShowStatusbtns] = React.useState(false);
    const [showTable, setShowTable] = React.useState(true);
    const [brukerList, setBrukerList] = useState([]);
    const [brukerId, setBrukerId] = React.useState(0);
    const [EnBruker, setEnBruker] = useState([]);
    const [TidsbankMonthly, setTidsbankMonthly] = useState([]);
    const [TidsbankAlt, setTidsbankAlt] = useState([]);
    const [brukerStatus, setBrukerStatus] = useState("");
    const [showAktivBtn, setShowAktivBtn] = React.useState(false);
    const [showInaktivBtn, setShowInaktivBtn] = React.useState(false);
    const [grafId, setGrafId]= React.useState('');
    var idForGraf= {id : grafId}
    useEffect(() => {
        Axios.get("http://localhost:3001/api/brukerGetAll").then((response) => {
        setBrukerList(response.data);
        console.log(response.data);
        })
    }, []);

    const setInaktiv = (idbruker) => {
        console.log('this is:', idbruker);
            Axios.post("http://localhost:3001/api/brukerSetStatus", 
            {
                idbruker: idbruker,
                status: 2             
            }).then(() => {
            clickShow(idbruker);
            });
        };    
    const setAktiv = (idbruker) => {
        console.log('this is:', idbruker);
    
            Axios.post("http://localhost:3001/api/brukerSetStatus", 
            {
                idbruker: idbruker,
                status: 1             
            }).then(() => {
            clickShow(idbruker);
            });
        };    
    

    function clickShow(brukerId)  {
        setGrafId(brukerId);
        console.log("stateGrafId: " + grafId)
        console.log('this is:', brukerId);
        setBrukerId(brukerId);
        getTidsbankMonthly(brukerId);
        getTidsbankAlt(brukerId);
        setShowBruker(true);
        setShowTable(false);
        Axios.get("http://localhost:3001/api/brukerGetOneWithMore",
        {params: 
                {
            idbruker : brukerId 
                }
        }
        ).then((response) => {
        setEnBruker(response.data);
        checkStatus(response.data[0].brukerstatus);
      })
    }
    function checkStatus(brukerstatus) {
        if (brukerstatus==2) {
            setBrukerStatus("Inaktiv")
            setShowInaktivBtn(false);
            setShowAktivBtn(true);
            console.log("status: Inaktiv");
        }
        else if (brukerstatus == 1) {
            setBrukerStatus("Aktiv")
            setShowInaktivBtn(true);
            setShowAktivBtn(false);
            console.log("status: aktiv");
        } 
    }
    function clickHide(fornavn)  {
        console.log('this is:', fornavn);
        setShowBruker(false);
        setShowTable(true);
    }
    function getTidsbankMonthly(brukerId){
        Axios.get("http://localhost:3001/api/tidsbankGetMonthly",
        {params: 
                {
            idbruker : brukerId 
                }
        }
        ).then((response) => {
        setTidsbankMonthly(response.data);
      console.log(response.data);
      }
        )
    }
    function getTidsbankAlt(brukerId){
        Axios.get("http://localhost:3001/api/tidsbankGetAll",
        {params: 
                {
            idbruker : brukerId 
                }
        }
        ).then((response) => {
        setTidsbankAlt(response.data);
      console.log(response.data);
      }
        )
    }
  

    return (
        <TableContainer>
            {/* <TimeTracker onSave={onSave} /> */}
            { showTable ? 
             <Table bsPrefix='table' responsive="xs" striped bordered hover size="sm"> 
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Fornavn</th>
                        <th>Etternavn</th>
                        <MediaQuery minWidth={993}> 
                        <th>Tlf</th>
                        <th>Epost</th>
                        <th>Fødselsdato</th>
                        </MediaQuery>
                    </tr>
                </thead>
                  <tbody>  
                    {brukerList.map((val) => {return (    
             
                    <tr  onClick={(e) => clickShow(val.idbruker, e)}>
                        <td>{ val.idbruker }</td>
                        <td>{ val.fornavn }</td>
                        <td>{ val.etternavn}</td>
                        <MediaQuery minWidth={993}> 
                        <td>{ val.tlf }</td>
                        <td>{ val.epost }</td> 
                        <td>{ moment(val.fdato).format("DD/MM/YYYY") }</td> 
                        </MediaQuery>
                    </tr>
                   
                    )
                    })}

                 </tbody>
            </Table>  
            : null }

            {/* Når man trykker på en bruker:  */}
            { showBruker ? 
            <Container>

             {EnBruker.map((val) => {return (    
                <Media>
                    <Media.Body>
                        <img
                            width={64}
                            height={64}
                            className="mr-3"
                            src= { UserIcon }
                            alt="Generic placeholder"
                        />
                        <p className="tilbakeBtn"  onClick={(e) => clickHide()}>
                         <img src={BackBtn}  /> 
                        </p>
                        <h5>{  val.fornavn + ' ' + val.etternavn }</h5>
                        { showAktivBtn ?
                        <p>
                        Status: <Badge variant="danger"> {  brukerStatus }</Badge>
                        </p>
                         : null}
                          { showInaktivBtn ?
                        <p >
                        Status: <Badge variant="success">{  brukerStatus }</Badge>
                        </p>
                         : null}
                        <p>
                        Fødselsdato: { moment(val.fdato).format("DD/MM/YYYY") }
                        </p>
                        <p>
                        Adresse: { val.gatenavn + val.postnr + val.poststed } 
                        </p> 
                        <p>
                        Telefon: { val.tlf }
                        </p>
                        <p>
                        Epost: { val.epost }
                        </p>
                        
                        
                        {TidsbankMonthly.map((val) => {return (   
                        <p>Tidsbank denne måned: { val.tid }</p>
                        )})}

                        {TidsbankAlt.map((val) => {return (   
                           
                        <p>Tidsbank totalt: { val.totaltid }</p>
                        )})}
                        
                        <Btn  onClick={(e) => clickHide()}>Send melding</Btn>
                        <Btn  onClick={(e) => clickHide()}>Se Kalender</Btn>
                        <Btn  onClick={(e) => clickHide()}>Se Dokumenter</Btn>
                        
                        { showInaktivBtn ?  
                        <Btn style={{ color : "red" }} onClick={(e) => setInaktiv(val.idbruker, e)}>Sett inaktiv</Btn>
                        : null }
                        { showAktivBtn ?
                        <Btn style={{ color : "lightgreen" }}  onClick={(e) => setAktiv(val.idbruker, e)}>Sett aktiv</Btn>
                        : null}
                        <TidsbankChart { ...idForGraf}/>
                    </Media.Body>
                </Media>
                    )
                })} 
               
                
            </Container> 
               
               : null }
        </TableContainer>
        
    );
}

export default BrukerTabell;