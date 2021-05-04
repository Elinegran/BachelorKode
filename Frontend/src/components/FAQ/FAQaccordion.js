//Utviklet av: Gruppe 2
import React, { useState, useEffect } from "react";
import Axios from 'axios';
import { Accordion, Card } from 'react-bootstrap';
import { FaPlus, FaMinus } from 'react-icons/fa';


function FAQaccordion () {

  const [faqList, setFaqList] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:3001/api/faqGetAll").then((response) => {
      setFaqList(response.data);
      console.log(response.data);
      })
  }, []);
 
  const [open, setOpen] = useState(false);

    return (
      <div className="App text-center"><h1>Ofte stilte spørsmål (FAQ)</h1>
          <Accordion className="mt-4"> 
            {faqList.map((val, index) => {return (
            <Card className="text-left" key={index}>
                <Accordion.Toggle as={Card.Header} eventKey={val} onClick={() => setOpen(!open)}> 
                { open ? <FaMinus className="float-right"/> : <FaPlus className="float-right"/> }
                  {val.spørsmål} 
                </Accordion.Toggle>
                <Accordion.Collapse eventKey={val}>
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