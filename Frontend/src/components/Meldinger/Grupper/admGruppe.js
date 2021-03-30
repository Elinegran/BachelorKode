import React from 'react';
import Axios from 'axios'; // for å sende/ motta til/ fra backend
import { useState } from "react"; // for å sende til backend
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstap
import { Container, Row, Col, Button, Form } from 'react-bootstrap'; // Bootstrap-greier
import AuthService from '../../../services/auth.service';

// Funksjon for å legge til gruppemedlemmer i en gruppe i databasen
function NyttGruppemedlem() {
  const [idbruker, setIdbruker] = useState(0);
  const [gruppeID, setGruppeID] = useState(0);

    // Sender det nye gruppemedlemmet til backend
    const addGruppemedlem = () => {
      Axios.post("http://localhost:3001/api/grupperNyeGruppemedlemmer", { 
        idbruker: idbruker,
        gruppeID: gruppeID, // Sender  idbruker og gruppeID til Backend 
      }) 
    };
    
    // 1. hent gruppeid
    idbruker = 14; 
    // 2. hent brukerid
    gruppeID = 1; 
    // 3. legg til nytt gruppemedlem
  
    // Dette sendes til Meldingssiden
    return (
        <Container fluid>
          
            <Form>
                <Row>
                    <Col>
                        <Form.Label>Legg til nytt medlem i gruppa</Form.Label>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group>
                            <Form.Control input type="text" placeholder="BrukerID" onChange = {(event) => {setIdbruker(event.target.value);}} />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group>
                            <Form.Control input type="text" placeholder="GruppeID" onChange = {(event) => {setGruppeID(event.target.value);}} /> 
                        </Form.Group>
                    </Col>
                    <Col>  
                        <Button onClick={addGruppemedlem} variant="success" type="submit">Lagre nytt medlem</Button>
                    </Col>
                </Row>        
            </Form> 
        </Container> 
    ) // slutt på return()

} // slutt på funksjonen NyttGruppemedlem()

export default NyttGruppemedlem; 



/*
import "./App.css";
import { useState } from "react";
import Axios from "axios";

function App() {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [country, setCountry] = useState("");
  const [position, setPosition] = useState("");
  const [wage, setWage] = useState(0);

  const [newWage, setNewWage] = useState(0);

  const [employeeList, setEmployeeList] = useState([]);

  const addEmployee = () => {
    Axios.post("http://localhost:3001/create", {
      name: name,
      age: age,
      country: country,
      position: position,
      wage: wage,
    }).then(() => {
      setEmployeeList([
        ...employeeList,
        {
          name: name,
          age: age,
          country: country,
          position: position,
          wage: wage,
        },
      ]);
    });
  };

  const getEmployees = () => {
    Axios.get("http://localhost:3001/employees").then((response) => {
      setEmployeeList(response.data);
    });
  };

  const updateEmployeeWage = (id) => {
    Axios.put("http://localhost:3001/update", { wage: newWage, id: id }).then(
      (response) => {
        setEmployeeList(
          employeeList.map((val) => {
            return val.id == id
              ? {
                  id: val.id,
                  name: val.name,
                  country: val.country,
                  age: val.age,
                  position: val.position,
                  wage: newWage,
                }
              : val;
          })
        );
      }
    );
  };

  const deleteEmployee = (id) => {
    Axios.delete(`http://localhost:3001/delete/${id}`).then((response) => {
      setEmployeeList(
        employeeList.filter((val) => {
          return val.id != id;
        })
      );
    });
  };

  return (
    <div className="App">
      <div className="information">
        <label>Name:</label>
        <input
          type="text"
          onChange={(event) => {
            setName(event.target.value);
          }}
        />
        <label>Age:</label>
        <input
          type="number"
          onChange={(event) => {
            setAge(event.target.value);
          }}
        />
        <label>Country:</label>
        <input
          type="text"
          onChange={(event) => {
            setCountry(event.target.value);
          }}
        />
        <label>Position:</label>
        <input
          type="text"
          onChange={(event) => {
            setPosition(event.target.value);
          }}
        />
        <label>Wage (year):</label>
        <input
          type="number"
          onChange={(event) => {
            setWage(event.target.value);
          }}
        />
        <button onClick={addEmployee}>Add Employee</button>
      </div>
      <div className="employees">
       < button onClick={getEmployees}>Show Employees</button>

        {employeeList.map((val, key) => {
          return (
            <div className="employee">
              <div>
                <h3>Name: {val.name}</h3>
                <h3>Age: {val.age}</h3>
                <h3>Country: {val.country}</h3>
                <h3>Position: {val.position}</h3>
                <h3>Wage: {val.wage}</h3>
              </div>
              <div>
                <input
                  type="text"
                  placeholder="2000..."
                  onChange={(event) => {
                    setNewWage(event.target.value);
                  }}
                />
                <button
                  onClick={() => {
                    updateEmployeeWage(val.id);
                  }}
                >
                  {" "}
                  Update
                </button>

                <button
                  onClick={() => {
                    deleteEmployee(val.id);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App; */
