import React from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstap
import { Card, Accordion, Button, Form } from 'react-bootstrap'; // Bootstrap-greier

export default class Rediger extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            avtale: []
        }

        this.handleDelete = this.handleDelete.bind(this);
    }
  
    componentDidMount() {
      axios.get(`http://localhost:3001/api/kalenderAlleAvtaler`)
        .then(res => {
          const avtale = res.data;
          this.setState({ avtale });
         
     
        })
    }

    handleDelete(id){
      //id.preventDefault();
      alert("Dette er slett ");
      //  axios.delete(`http://localhost:3001/api/slettAvtale`, id)
      //  .then(response => {
      //      console.log(response)
      //    })
      //    .catch(error => {
      //      console.log(error)
      //    })

       }
    
   
  
    render() {
        
      return ( // Returnerer en kollaps-liste over alle gruppene, med en liste med medlemmer inni 
        <p>
          <h2> Alle Avtaler </h2>
        <Accordion>
        { this.state.avtale.map(avtaler => 
          <Card>
              <Card.Header>
                  <Accordion.Toggle as={Button} variant="link" eventKey={avtaler.id}><h2> {avtaler.title} </h2></Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey={avtaler.id}>
                  <Card.Body>
                      <Form>
                      {/* {handleDelete(avtaler.id)} */}
                      <Button onClick = {this.handleDelete(avtaler.id)}>Slett</Button>
                      <Button>Rediger</Button>
                      <Form.Group>
                      <Form.Label>Tittel:{avtaler.title}</Form.Label>
                      
                    </Form.Group>
                     

                     
                        </Form> 

{/* 
                    <Form>
                    <Form.Group controllId ="avtale.ControllInput1">
                    <Form.Label>Tittel</Form.Label>
                    <Form.Controll type ='text' id='title' navn = 'title' value = {avtale.title} onChange={this.handleTitleChange} />
                    </Form.Group>

                    <Form.Group controllId="avtale.ControllInput2">
                    <Form.Label>Beskrivelse</Form.Label>
                    <Form.Controll type ='text' id='Beskrivelse' navn = 'beskrivelse' value = {avtale.beskrivelse} onChange={this.handleBeskrivelseChange}/>
                    </Form.Group>  */}

                    {/* <Form.Group controllId="avtale.ControllInput3">
                    <Form.Label>Sted</Form.Label>
                    <Form.Controll type ='text' id='sted' navn = 'sted' placeholder= 'Sted' onChange={this.handleStedChange}/>
                    </Form.Group>

                    <Form.Group controllId="avtale.ControllInput4">
                    <Form.Label>Velg starttid:</Form.Label>
                    <Form.Controll type="datetime-local" id="start" name="start"  value = {this.state.start} onChange={this.handleStartChange}/>
                    </Form.Group>

                    <Form.Group ControllId = "avtale.ControllInput5">
                    <Form.Label>Velg Sluttid</Form.Label>
                    <Form.Controll type="datetime-local" id="slutt" name="sutt" onChange={this.handleSluttChange}/> 
                    </Form.Group>
                    </Form> */}
                   
                   
                    </Card.Body> 
              </Accordion.Collapse>
          </Card>)}

        </Accordion>
        </p>
      ) // slutt på return
    } // slutt på render

    


    
    // }
  }; // slutt på funksjon Gruppeliste

