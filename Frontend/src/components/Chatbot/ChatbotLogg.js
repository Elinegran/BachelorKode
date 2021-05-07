//Utviklet av: Gruppe 2
import React, { useState, useEffect } from "react";
import Axios from 'axios';
import styled from 'styled-components';
import { Responsive } from '../Responsive';
import { Table} from 'react-bootstrap';
import {appColors} from '../Colors';

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

export const ChatbotLogg = function ChatbotLogg() {

    const [spmList, setSpmList] = useState([]);

    useEffect(() => {
        Axios.get("http://localhost:3001/api/chatbotGetLog").then((response) => {
            setSpmList(response.data);
        });
    }, []);
     
    
    return (
        <div className="App text-center"><h1>Logg over ubesvarte spørsmål i Matchbot</h1>
        <ResponsiveContainer>
        <TableContainer>

         <Table bsPrefix='table' responsive="xs" striped bordered hover size="sm"> 
            <thead>
                <tr>
                    <th>#</th>
                    <th>Chatbotlogg</th>
                </tr>
            </thead>
              <tbody>  
                {spmList.map((val) => {return (    
                <tr>
                    <td>{ val.idchatbot_spm_logg }</td>
                    <td>{ val.spm}</td>
                </tr>
                )
                })}

             </tbody>
        </Table>  


    </TableContainer>
    </ResponsiveContainer>
    </div>
);
}

export default ChatbotLogg;