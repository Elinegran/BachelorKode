//Utviklet av: Gruppe 2
import React, { useState, useEffect } from "react";
import ReactDOM from 'react-dom'
import Axios from 'axios';
import { InputGroup, FormControl, Button, ButtonGroup, Form} from 'react-bootstrap';
import styled from 'styled-components';
import { Responsive } from '../Responsive';
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


export const UpdateChatbot = function UpdateChatbot() {

    var keywords, svar, linkTekst, link;
    var refName = React.createRef();


    const [chatbotList, setchatbotList] = useState([]);

    useEffect(() => {
        Axios.get("http://localhost:3001/api/chatbotGetAll").then((response) => {
            setchatbotList(response.data);
        //     chatbotList.map((val) => {
        //         setNewKeywords({[val.idchatbot_spm_svar]: val.spm});
        //         setNewSvar({[val.idchatbot_spm_svar]: val.svar});
        //         setNewLinkTekst({[val.idchatbot_spm_svar]: val.linkTekst});
        //         setNewLink({[val.idchatbot_spm_svar]: val.link});
               
        // })
        });
    }, []);

    const deleteChatbot = (idChatbotSpm) => {
        Axios.post('http://localhost:3001/api/chatbotDelete', {
            idChatbotSpm: idChatbotSpm
        }).then((response) => {
              
            setchatbotList(chatbotList.filter((val)=> {
            return val.idChatbotSpm != idChatbotSpm;
        })
        )});
    };

    
    function NumberList(props) {
        var [newKeywords, setNewKeywords] = useState(null);
        var [newSvar, setNewSvar] = useState(null);
        var [newLinkTekst, setNewLinkTekst] = useState(null);
        var [newLink, setNewLink] = useState(null);
        function handleChange(event) {
            console.log("handlechange")
            if(event.target.name == 'keywords') {
                setNewKeywords(event.target.value);
            }
            if(event.target.name == 'svar') {
                setNewSvar(event.target.value);
            }
            if(event.target.name == 'linkTekst') {
                setNewLinkTekst(event.target.value);
            }
            if(event.target.name == 'link') {
                setNewLink(event.target.value);
            }
            
            
            
            
            console.log(newKeywords + " newswar : " + newSvar)
          }
    
    
          
        const updateChatbot = (idChatbotSpm, link) => {
            console.log(link)

            Axios.post("http://localhost:3001/api/chatbotUpdate", {
                // spm,
                // svar,
                // linkTekst,
                // link,
    
                newKeywords: newKeywords,
                newSvar: newSvar,
                newLinkTekst: newLinkTekst,
                newLink: newLink,
                idChatbotSpm: idChatbotSpm
            }).then((response) => {
                if(response.data) {
                    window.location.reload(false);
                    alert("Chatbot er endret!"); }
            });
        };  
    
        const numbers = props.numbers;
        const listItems = chatbotList.map((val) =>
        
        <div className="form" id="idform">
      
        <InputGroup className="mb-2 mx-auto rounded">   
        <InputGroup.Prepend>
            <InputGroup.Text>Nøkkelord til chatbot</InputGroup.Text>
        </InputGroup.Prepend>
            <FormControl key={val.idchatbot_spm_svar} as="textarea" label="Nøkkelord" type="text" name="keywords" defaultValue={val.spm}  onChange={handleChange} />
      </InputGroup>

      <InputGroup className="mb-2 mx-auto rounded">   
          <InputGroup.Prepend>
            <InputGroup.Text>Svar</InputGroup.Text>
          </InputGroup.Prepend>
            <FormControl key={val.idchatbot_spm_svar} as="textarea" label="Svar" type="text" name="svar" defaultValue={val.svar} onChange={handleChange}  />
      </InputGroup>
      <InputGroup className="mb-2 mx-auto rounded">   
          <InputGroup.Prepend>
            <InputGroup.Text>Lenketekst</InputGroup.Text>
          </InputGroup.Prepend>
            <FormControl key={val.idchatbot_spm_svar} as="textarea" label="LinkTekst" type="text" name="linkTekst" defaultValue={val.linkTekst} onChange={handleChange}  />
      </InputGroup>
      <InputGroup className="mb-2 mx-auto rounded">   
          <InputGroup.Prepend>
            <InputGroup.Text>Link</InputGroup.Text>
          </InputGroup.Prepend>
            <FormControl ref={refName} key={val.idchatbot_spm_svar} as="textarea" label="Link" type="text" name="link" defaultValue={val.link} onChange={handleChange} />
      </InputGroup>

               
                      <ButtonGroup className="mb-4">
                        <Button  key={val.idchatbot_spm_svar}  className="btn btn-outline-primary btn-m" variant="light" onClick={() => updateChatbot(val.idchatbot_spm_svar, refName.current.value)}>Lagre</Button>
                        <Button className="btn btn-outline-danger btn-m" variant="light" onClick={() => deleteChatbot(val.idchatbot_spm_svar)}>Slett</Button>
                    </ButtonGroup>
                 
                </div>
      
        );

    return (
        <div className="App text-center"><h1>Endre Chatbot</h1>
        <ResponsiveContainer>
            {listItems}
        </ResponsiveContainer>
        </div> 
    );
        }
        
        return ( <NumberList/>)

};

export default UpdateChatbot;