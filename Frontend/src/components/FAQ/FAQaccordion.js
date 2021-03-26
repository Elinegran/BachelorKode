import React, { useState, useEffect } from "react";
import Axios from 'axios';
import { Accordion, Card } from 'react-bootstrap';
import { FaChevronRight } from 'react-icons/fa';


function FAQaccordion () {

  const [faqList, setFaqList] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:3001/api/faqGetAll").then((response) => {
      setFaqList(response.data);
      console.log(response.data);
      })
  }, []);
 
    return (
      <div className="App text-center"><h1>Ofte stilte spørsmål (FAQ)</h1>
          <Accordion> 
            {faqList.map((val, index) => {return (
            <Card className="text-left" key={index}>
                <Accordion.Toggle as={Card.Header} eventKey={val.spørsmål}> 
                  {val.spørsmål}<FaChevronRight className="float-right"/> 
                </Accordion.Toggle> 
                <Accordion.Collapse eventKey={val.spørsmål}>
                  <Card.Body> 
                    {val.svar} 
                  </Card.Body>
                </Accordion.Collapse>
            </Card>
            )
            })}
          </Accordion> 
      </div>
    );

};
  
export default FAQaccordion;