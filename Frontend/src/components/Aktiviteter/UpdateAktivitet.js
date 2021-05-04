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
import { FaRegCalendarAlt, FaRegClock, FaMapMarkerAlt } from 'react-icons/fa';
import moment from 'moment';

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

export const UpdateAktivitet = function UpdateAktivitet() {
    var [newTittel, setNewTittel] = useState(null);
    var [newDato, setNewDato] = useState(null);
    var [newTidspunkt, setNewTidspunkt] = useState(null);
    var [newSted, setNewSted] = useState(null);
    var [newTekst, setNewTekst] = useState(null);
    const [aktivitetsList, setAktivitetsList] = useState([]);
    const [getOneList, setGetOneList] = useState([])
    const [showDetailed, setShowDetailed] = React.useState(false);
    const [showTable, setShowTable] = React.useState(true);

    useEffect(() => {
        Axios.get("http://localhost:3001/api/aktivitetGetAll").then((response) => {
            setAktivitetsList(response.data);
        });
    }, []);

    // Henter ut aktivitet for spesifikk ID fra matching-funksjon
    var getOneActivity = (id) => {
        Axios.post("http://localhost:3001/api/aktivitetGetOne", {
            idaktivitet: id 
        }).then((response) => {
            setGetOneList(response.data)
            setNewTittel(response.data[0].tittel)
            setNewDato(moment(response.data[0].dato).format("DD/MM/YYYY"))
            setNewTidspunkt(response.data[0].tidspunktformat)
            setNewSted(response.data[0].sted)
            setNewTekst(response.data[0].tekst)
            }).catch(err =>{
            console.log(err);
        });
    };

    // Sletting av aktivitet
    const deleteAktivitet = (idaktivitet) => {
        console.log(idaktivitet)
        Axios.post('http://localhost:3001/api/aktivitetDelete', {
            idaktivitet: idaktivitet
        }).then((response) => {
            if(response.data) {
                window.location.reload(false);
                alert("Aktivitet er slettet"); 
            };   
        });
    };

    // Oppdatering av aktivitet
    const updateAktivitet = (idaktivitet) => {
        Axios.post("http://localhost:3001/api/aktivitetUpdate", {
            newTittel: newTittel,
            newDato:  moment(newDato, "DD-MM-YYYY").format("YYYY-MM-DD"),
            newTidspunkt: newTidspunkt,
            newSted: newSted,
            newTekst: newTekst,
            idaktivitet: idaktivitet
        }).then((response) => {
            if(response.data) {
                window.location.reload(false);
                alert("Aktivitet er endret!"); 
            };
        });
    }; 

    function clickShow(idaktivitet)  {
        setShowDetailed(true);
        setShowTable(false);
        getOneActivity(idaktivitet);
    };

    function clickHide()  {
        window.location.reload(true);
    };

    function handleChange(event) {
        console.log("handlechange")
        if(event.target.name === 'tittel') {
            setNewTittel(event.target.value);
        }
        if(event.target.name === 'dato') {
            setNewDato(event.target.value);
        }
        if(event.target.name === 'tidspunkt') {
            setNewTidspunkt(event.target.value);
        }
        if(event.target.name === 'sted') {
            setNewSted(event.target.value);
        }
        if(event.target.name === 'tekst') {
            setNewTekst(event.target.value);
        }
    };

    
    return (
        <div className="App text-center"><h1>Endre aktiviteter</h1>
        <ResponsiveContainer>
            <TableContainer>

            { showTable ? 
                <Table bsPrefix='table' responsive="xs" striped bordered hover size="sm"> 
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Tittel</th>
                            <MediaQuery minWidth={480}> 
                            <th>Dato</th>
                            </MediaQuery>
                            <MediaQuery minWidth={993}> 
                            {<th>Tidspunkt</th>}
                            <th>Sted</th>
                            </MediaQuery>
                        </tr>
                    </thead>
                        <tbody>  
                        {aktivitetsList.map((val) => { return (    
                            <tr onClick={(e) => clickShow(val.idaktivitet, e)}>
                                <td>{val.idaktivitet}</td>
                                <td>{val.tittel}</td>
                                <MediaQuery minWidth={480}> 
                                <td>{moment(val.dato).format("DD/MM/YYYY")}</td>
                                </MediaQuery>
                                <MediaQuery minWidth={993}> 
                                {<td>{val.tidspunktformat}</td>}
                                <td>{val.sted}</td> 
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
                            <Badge bsPrefix='badge' variant="secondary">Aktivitet #{val.idaktivitet}</Badge>
                        </BadgePrimary>

                        <InputGroup className="mb-2 mt-3 mx-auto rounded">   
                            <InputGroup.Prepend>
                                <InputGroup.Text>Tittel</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl as="textarea" label="Tittel" type="text" name="tittel" placeholder="Tittel" value={newTittel} onChange={handleChange} />
                        </InputGroup>

                        <InputGroup className="mb-2 mx-auto rounded">   
                            <InputGroup.Prepend>
                                <InputGroup.Text><FaRegCalendarAlt/></InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl label="Dato" type="text" name="dato" placeholder="DD/MM/ÅÅÅÅ" value={newDato} onChange={handleChange} />
                                
                            <InputGroup.Prepend>
                                <InputGroup.Text><FaRegClock/></InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl label="Tidspunkt" type="text" name="tidspunkt" placeholder="00:00" value={newTidspunkt} onChange={handleChange} />
                        </InputGroup>    
                                
                        <InputGroup className="mb-2 mx-auto rounded">   
                            <InputGroup.Prepend>
                                <InputGroup.Text><FaMapMarkerAlt/></InputGroup.Text>
                            </InputGroup.Prepend>   
                            <FormControl label="Sted" type="text" name="sted" placeholder="Sted" value={newSted} onChange={handleChange} />
                        </InputGroup>
                            
                        <InputGroup className="mb-2 mx-auto rounded">   
                            <InputGroup.Prepend>
                                <InputGroup.Text>Tekst</InputGroup.Text>
                            </InputGroup.Prepend> 
                            <FormControl as="textarea" label="Tekst" type="text" name="tekst" placeholder="Tekst" value={newTekst} onChange={handleChange} />
                        </InputGroup>
                            
                        <ButtonGroup className="mb-3">
                            <Button className="btn-m" variant="success" onClick={() => updateAktivitet(val.idaktivitet)}>Lagre</Button>
                            <Button className="btn-m" variant="danger" onClick={() => deleteAktivitet(val.idaktivitet)}>Slett</Button>
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

export default UpdateAktivitet;