//Utviklet av: Gruppe 2
import React, { useState, useEffect } from "react";
import Axios from 'axios';
import { InputGroup, FormControl, Button, ButtonGroup} from 'react-bootstrap';
import styled from 'styled-components';
import { Responsive } from '../Responsive';
import  BackBtn   from '../../assets/images/Bruker/icon_back.png'
import { Table,  Badge} from 'react-bootstrap';
import MediaQuery from 'react-responsive';
import {appColors} from '../Colors';
import  BotIcon   from '../../assets/images/icon_chatbot.png'
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

.input-group-text {
    width: 100px;
}
`
const FormContainer = styled.div`
margin: auto;
    width: 100%;
    .input-group {
        width: 100%;
    }
    ${Responsive.tablet}{
        width: 50%;
    }
    ${Responsive.pc}{
        width: 50%;
    }

`
const BadgePrimary = styled.div`
margin-right: 16px;
.badge {
  margin: auto;
  color: #6ac2ee;
}
`
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
            float: left;
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
        .table th {
            cursor: default;
        }
        .table td {
            text-align: left;
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

export const UpdateChatbot = function UpdateChatbot() {
    var [newKeywords, setNewKeywords] = useState(null);
    var [newSvar, setNewSvar] = useState(null);
    var [newLinkTekst, setNewLinkTekst] = useState(null);
    var [newLink, setNewLink] = useState(null);
    const [chatbotList, setchatbotList] = useState([]);
    const [getOneList, setGetOneList] = useState([])
    const [showDetailed, setShowDetailed] = React.useState(false);
    const [showTable, setShowTable] = React.useState(true);

    useEffect(() => {
        Axios.get("http://localhost:3001/api/chatbotGetAll").then((response) => {
            setchatbotList(response.data);

        });
    }, []);
      // Henter ut chatbot svar og link for spesifikk ID fra matching-funksjon
      var getOneSpm = (id) => {
        Axios.post("http://localhost:3001/api/chatbotGetOne", 
          {
              id: id 
          }).then((response) => {
           setGetOneList(response.data)
            setNewKeywords(response.data[0].spm)
            setNewSvar(response.data[0].svar)
            setNewLinkTekst(response.data[0].linkTekst)
            setNewLink(response.data[0].link)
          }).catch(err =>{
            console.log(err);
          })
        }
    // Sletting av chatbotspm
    const deleteChatbot = (idChatbotSpm) => {
        console.log(idChatbotSpm)
        Axios.post('http://localhost:3001/api/chatbotDelete', {
            idChatbotSpm: idChatbotSpm
        }).then((response) => {
            if(response.data) {
                window.location.reload(false);
                alert("Spørsmål slettet"); }   
           });
    };
    // Oppdatering av Chatbotspm
    const updateChatbot = (idChatbotSpm) => {
        Axios.post("http://localhost:3001/api/chatbotUpdate", {
            newKeywords: newKeywords,
            newSvar: newSvar,
            newLinkTekst: newLinkTekst,
            newLink: newLink,
            idChatbotSpm: idChatbotSpm
        }).then((response) => {
            if(response.data) {
                window.location.reload(false);
                alert("Matchbot er endret!"); }
        });
    };  
    function clickShow(chatbotId)  {
        setShowDetailed(true);
        setShowTable(false);
        getOneSpm(chatbotId)
    }
    function clickHide()  {
        window.location.reload(true);
    }

    function handleChange(event) {
        console.log("handlechange")
        if(event.target.name === 'keywords') {
            setNewKeywords(event.target.value);
        }
        if(event.target.name === 'svar') {
            setNewSvar(event.target.value);
        }
        if(event.target.name === 'linkTekst') {
            setNewLinkTekst(event.target.value);
        }
        if(event.target.name === 'link') {
            setNewLink(event.target.value);
        }
        console.log("keywords: " + newKeywords + " svar: " + newSvar)
        }
    
    return (
        <div className="App text-center"><h1>Endre MatchBot</h1>
        <ResponsiveContainer>
        <TableContainer>
        { showTable ? 
         <Table bsPrefix='table' responsive="xs" striped bordered hover size="sm"> 
            <thead>
                <tr>
                    <th>#</th>
                    <th>Lenketekst</th>
                    <MediaQuery minWidth={480}> 
                    <th>Svar</th>
                    </MediaQuery>
                    <MediaQuery minWidth={993}> 
                    <th>Lenke</th>
                    {/* <th>Nøkkelord</th> */}
                    </MediaQuery>
                </tr>
            </thead>
              <tbody>  
                {chatbotList.map((val) => {return (    
                <tr  onClick={(e) => clickShow(val.idchatbot_spm_svar, e)}>
                    <td>{ val.idchatbot_spm_svar }</td>
                    <td>{ val.linkTekst }</td>
                    <MediaQuery minWidth={480}> 
                    <td>{ val.svar}</td>
                    </MediaQuery>
                    <MediaQuery minWidth={993}> 
                    <td>{ val.link }</td> 
                    {/* <td>{ val.spm }</td> */}
                    </MediaQuery>
                </tr>
                )
                })}

             </tbody>
        </Table>  
        : null }

        {/* Når man trykker på rad i tabellen skjules tabellen og endringsfelter vises:  */}
        { showDetailed ? 
        <FormContainer>
      
         {getOneList.map((val) => {return (    
             
             <div className="form" id="idform">
                <p className="tilbakeBtn"  onClick={(e) => clickHide()}>
                <img src={BackBtn} alt="Tilbake knapp"  /> 
                </p>
           
            <BadgePrimary>
                <img width={64} height={64} className="mr-3" src= { BotIcon } alt="Generic placeholder"/>        
                <Badge bsPrefix='badge' variant="secondary"> Spørsmål #{val.idchatbot_spm_svar}</Badge>
            </BadgePrimary>

             <InputGroup className="mb-2 mx-auto rounded">   
             <InputGroup.Prepend>
                 <InputGroup.Text>Nøkkelord</InputGroup.Text>
             </InputGroup.Prepend>
                 <FormControl key={val.idchatbot_spm_svar} as="textarea" label="Nøkkelord" type="text" name="keywords" value={newKeywords}  onChange={handleChange} />
           </InputGroup>
     
           <InputGroup className="mb-2 mx-auto rounded">   
               <InputGroup.Prepend>
                 <InputGroup.Text>Svar</InputGroup.Text>
               </InputGroup.Prepend>
                 <FormControl key={val.idchatbot_spm_svar} as="textarea" label="Svar" type="text" name="svar"  value={newSvar} onChange={handleChange}  />
           </InputGroup>
           <InputGroup className="mb-2 mx-auto rounded">   
               <InputGroup.Prepend>
                 <InputGroup.Text>Lenketekst</InputGroup.Text>
               </InputGroup.Prepend>
                 <FormControl key={val.idchatbot_spm_svar} as="textarea" label="LinkTekst" type="text" name="linkTekst" value={newLinkTekst} onChange={handleChange}  />
           </InputGroup>
           <InputGroup className="mb-2 mx-auto rounded">   
               <InputGroup.Prepend>
                 <InputGroup.Text>Link</InputGroup.Text>
               </InputGroup.Prepend>
                 <FormControl  key={val.idchatbot_spm_svar} as="textarea" label="Link" type="text" name="link" value={newLink}onChange={handleChange} />
           </InputGroup>
     
                    
            <ButtonGroup className="mb-4">
                <Button  key={val.idchatbot_spm_svar}  className="btn btn-success btn-m" onClick={() => updateChatbot(val.idchatbot_spm_svar)}> Lagre </Button>
                <Button className="btn btn-danger btn-m" onClick={() => deleteChatbot(val.idchatbot_spm_svar)}>Slett</Button>
            </ButtonGroup>
                      
                     </div>
                )
            })} 
        </FormContainer> 
           : null }
    </TableContainer>
    </ResponsiveContainer>
    </div>
);
}

export default UpdateChatbot;