//Utviklet av: Gruppe 2
import React, { useState, useEffect } from "react";
import Axios from 'axios';
import { Card, Row, Col } from 'react-bootstrap';
import moment from "moment";
import  BoxImg   from '../../assets/images/Bruker/box_ico.png';
import { FaRegCalendarAlt, FaRegClock } from 'react-icons/fa';
import styled from 'styled-components';
import { appColors } from '../Colors';

export const DivContainer = styled.div` 
    .card {
      border: solid ${ appColors.primaryColor } 3px;
      box-shadow: 0 11px 10px rgba(0,0,0,.5);
    }
    .card-header {
    
    }
    .card-img {
      width: 50px;
      hight: 50px;
      margin-bottom: 5px;
    }

    p.tekst {
      text-align: left;
      padding: 0em 3em 0em 3em;
    }
  `
export const AktivitetsCard = function AktivitetsCard() {

  const [AktivitetsList, setAktivitetsList] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:3001/api/aktivitetGetAll").then((response) => {
      setAktivitetsList(response.data);
      console.log(response.data);
      })
  }, []);

  return (
      <div className="App text-center"><h1>Aktiviteter</h1>
        <DivContainer>
          <Row>
            {AktivitetsList.map((val) => {return (
              <Col lg={6} className="mb-2">
              <Card className="mt-3">
                <Card.Header>
                  <Card.Img src={BoxImg} />
                  <Card.Title>{val.tittel}</Card.Title>
                </Card.Header>
                  <Card.Body>
                    <Card.Text>
                      <p> <FaRegCalendarAlt style={{ fill: [appColors.primaryDarker] }}/> {moment(val.dato).format("DD/MM/YYYY")}  <FaRegClock style={{ fill: [appColors.primaryDarker] }}/> {val.tidspunktformat} </p>
                      <p>{val.sted}</p>
                    </Card.Text>
                  </Card.Body>
                    <Card.Text>
                      <p class="tekst">{val.tekst}</p>
                    </Card.Text>
              </Card>
              </Col>
            )
            })}
          </Row>
        </DivContainer>
      </div>
  );
      
};

export default AktivitetsCard;