//Utviklet av: Gruppe 2
import React, { useState, useEffect } from "react";
import Axios from 'axios';
import { InputGroup, FormControl, ButtonGroup, Button } from 'react-bootstrap';
import styled from 'styled-components';
import { Responsive } from '../Responsive';
import BackBtn from '../../assets/images/Bruker/icon_back.png';
import { Table, Badge } from 'react-bootstrap';
import MediaQuery from 'react-responsive';
import { appColors } from '../Colors';

const ResponsiveContainer = styled.div`

td {
    text-align: left;
}

.input-group-text {
    width: 100px;
}

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
margin-right: 60px;
padding-top: 15px;
    .badge {
        margin: auto;
        font-size: 18px;
        background-color: lightgray;
        color: black;
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
            color: ${ appColors.primaryColor };
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
    .table thead {
        background-color: ${ appColors.primaryColor };
        cursor: none;  
    }
    .table tr {
        cursor: pointer;
    } 
    }
}
`

export const UpdateFAQ = function UpdateFAQ() {
    var [newSpørsmål, setNewSpørsmål] = useState(null);
    var [newSvar, setNewSvar] = useState(null);

    const [faqList, setFaqList] = useState([]);
    const [getOneList, setGetOneList] = useState([])
    const [showDetailed, setShowDetailed] = React.useState(false);
    const [showTable, setShowTable] = React.useState(true);

    useEffect(() => {
        Axios.get("http://localhost:3001/api/faqGetAll").then((response) => {
            setFaqList(response.data);
        });
    }, []);

    // Henter ut spørsmål og svar for spesifikk ID fra matching-funksjon
    var getOneFaq = (id) => {
        Axios.post("http://localhost:3001/api/faqGetOne", {
            idfaq: id 
        }).then((response) => {
            setGetOneList(response.data)
            setNewSpørsmål(response.data[0].spørsmål)
            setNewSvar(response.data[0].svar)
            }).catch(err =>{
            console.log(err);
        });
    };

    // Sletting av FAQ
    const deleteFaq = (idfaq) => {
        console.log(idfaq)
        Axios.post('http://localhost:3001/api/faqDelete', {
            idfaq: idfaq
        }).then((response) => {
            if(response.data) {
                window.location.reload(false);
                alert("FAQ er slettet"); 
            };   
        });
    };

    // Oppdatering av FAQ
    const updateFaq = (idfaq) => {
        Axios.post("http://localhost:3001/api/faqUpdate", {
            newSpørsmål: newSpørsmål,
            newSvar: newSvar,
            idfaq: idfaq
        }).then((response) => {
            if(response.data) {
                window.location.reload(false);
                alert("FAQ er endret!"); 
            };
        });
    }; 

    function clickShow(idfaq)  {
        setShowDetailed(true);
        setShowTable(false);
        getOneFaq(idfaq);
    };

    function clickHide()  {
        window.location.reload(true);
    };

    function handleChange(event) {
        console.log("handlechange")
        if(event.target.name === 'spørsmål') {
            setNewSpørsmål(event.target.value);
        }
        if(event.target.name === 'svar') {
            setNewSvar(event.target.value);
        }
    };


    return (
        <div className="App text-center"><h1>Endre FAQ</h1>
        <ResponsiveContainer>
            <TableContainer>
            {showTable ? 
                <Table bsPrefix='table' responsive="xs" striped bordered hover size="sm"> 
                    <thead>
                        <tr>
                            <th>#</th>
                            <MediaQuery minWidth={480}> 
                            <th>Spørsmål</th>
                            </MediaQuery>
                            <MediaQuery minWidth={993}> 
                            <th>Svar</th>
                            </MediaQuery>
                        </tr>
                    </thead>
                        <tbody>  
                        {faqList.map((val) => { return (    
                            <tr onClick={(e) => clickShow(val.idfaq, e)}>
                                <td>{val.idfaq}</td>
                                <MediaQuery minWidth={480}> 
                                <td>{val.spørsmål}</td>
                                </MediaQuery>
                                <MediaQuery minWidth={993}> 
                                <td>{val.svar}</td> 
                                </MediaQuery>
                            </tr>
                        )
                        })}
                        </tbody>
                </Table>  
            : null }

                {/* Når man trykker på en rad i tabellen skjules tabellen og endringsfelter vises:  */}
                { showDetailed ? 
                    <FormContainer>
                    {getOneList.map((val) => { return (    
                    <div className="form" id="idform">
                        <span className="tilbakeBtn" onClick={(e) => clickHide()}>
                            <img src={BackBtn} alt="Tilbake knapp" /> 
                        </span>
                    
                        <BadgePrimary>
                            <Badge bsPrefix='badge' variant="secondary">FAQ #{val.idfaq}</Badge>
                        </BadgePrimary>

                        <InputGroup className="mb-2 mt-3 mx-auto rounded">   
                            <InputGroup.Prepend>
                                <InputGroup.Text>Spørsmål</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl as="textarea" label="Spørsmål" type="text" name="spørsmål" placeholder="Spørsmål" value={newSpørsmål} onChange={handleChange} />
                        </InputGroup>
                            
                        <InputGroup className="mb-2 mx-auto rounded">   
                            <InputGroup.Prepend>
                                <InputGroup.Text>Svar</InputGroup.Text>
                            </InputGroup.Prepend> 
                            <FormControl as="textarea" label="Svar" type="text" name="svar" placeholder="Svar" value={newSvar} onChange={handleChange} />
                        </InputGroup>
                            
                        <ButtonGroup className="mb-3">
                            <Button className="btn-m" variant="success" onClick={() => updateFaq(val.idfaq)}>Lagre</Button>
                            <Button className="btn-m" variant="danger" onClick={() => deleteFaq(val.idfaq)}>Slett</Button>
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

};

export default UpdateFAQ;