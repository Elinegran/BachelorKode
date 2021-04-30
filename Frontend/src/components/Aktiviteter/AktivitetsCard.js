import React, { useState, useEffect } from "react";
import Axios from 'axios';
import { Container, Card, Row, Col } from 'react-bootstrap';
import { appColors } from '../Colors';
import moment from "moment";



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
          <Container>
            <Row>
              {AktivitetsList.map((val) => {return (
                <Col lg={6} className="mb-2">
                <Card className="mb-2">
                  <Card.Header>
                    <Card.Title>{val.tittel}</Card.Title>
                  </Card.Header>
                  <Card.Body>
                    <Card.Text>
                      {moment(val.dato).format("DD/MM/YYYY")} {val.tidspunktformat} {val.sted}
                    </Card.Text>
                  </Card.Body>
                      <Card.Text>
                        <p>{val.tekst}</p>
                      </Card.Text>
                </Card>
                </Col>
              )
              })}

              </Row>
          </Container>
        </div>
    );
      
}

export default AktivitetsCard;