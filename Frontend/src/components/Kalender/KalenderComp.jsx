import React from 'react'
import FullCalendar, { formatDate } from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import nbLocale from '@fullcalendar/core/locales/nb';
import axios from 'axios';
import SelectBrukere from '../Meldinger/Felles/selectBruker.js'; // Komponent som henter brukerne fra backend ----../Felles/selectBruker.js
import AuthService from '../../services/auth.service';
import { Button, ModalBody, ModalFooter } from 'react-bootstrap';

import { Accordion, Container, Row, Col, Card, Form } from 'react-bootstrap'; 

import EditDialog from './editDialog';

export default class KalenderComp extends React.Component {
  
  constructor(props){
    super(props);
    this.state = {
      weekendsVisible: true,
      currentEvents: [],
      avtaler:[],
      veileder: false,
      title:'',
      beskrivelse:'',
      sted:'',
      start:0,
      end:0,
      opprettetav: '',  
      opprettetfor : '', 
     
    };
    
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleBeskrivelseChange = this.handleBeskrivelseChange.bind(this); 
    this.kalenderInnhold = this.kalenderInnhold.bind(this);
    this.handleStedChange = this.handleStedChange.bind(this);
    this.handleStartChange = this.handleStartChange.bind(this);
    this.handleEndChange = this.handleEndChange.bind(this);
    this.handleDateSelect = this.handleDateSelect.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
   
    //Hvis funksjon er gul så er det en arrowfunction
   

  }

  // Velger bruker som Avtaler skal vises for i veileder
  kalenderInnhold(value){
   
   axios.get(`http://localhost:3001/api/kalenderBruker`, 
   {params:
    {enBruker : value}
    } )
   .then(res => {
   this.setState({avtaler : res.data})
   const avtaler = res.data;
   this.setState({ avtaler });
  })
}

//Select bruker i Opprettelse av arrangement
  handleSelect(value){
    this.setState({opprettetfor: value })
  }


  //Onchange håndteringer for inputfelter
  handleTitleChange(event) {
      this.setState({
        title: event.target.value,

      });
     }

  handleBeskrivelseChange(event) {
      this.setState({beskrivelse: event.target.value});
  }
  handleStedChange(event) {
    this.setState({ sted: event.target.value});
  }
  handleStartChange(event) {
    this.setState({ start: event.target.value,});
  }

  handleEndChange(event) {
    this.setState({end: event.target.value });
  }



  componentDidMount() {

      const brukertype = AuthService.getRole();
      const idbruker = AuthService.getUserId();
      this.setState({opprettetav: idbruker});
      if(brukertype == 2){
        this.setState({veileder:true})

          axios.get(`http://localhost:3001/api/kalenderAlleAvtaler`)
            .then(res => {
            this.setState({avtaler : res.data})
            const avtaler = res.data;
            this.setState({ avtaler });
      
          })
        
      }else{
        this.setState({veileder:false})
        this.setState({opprettetfor:idbruker})

       

        axios.get(`http://localhost:3001/api/kalenderBruker`, 
        {params:
         {enBruker : idbruker}
         } )
        .then(res => {
        this.setState({avtaler : res.data})
        const avtaler = res.data;
        this.setState({ avtaler });
       })


      }

    
     
  };


  render() {
    return (
      <div className='demo-app'>
        {this.renderSidebar()}
       
        <div className='demo-app-main'>
        {
            !this.state.veileder
            ? null
            : (
              <div>
                <p>Dette er en avtale for:</p>
                
                <SelectBrukere 
                onHandleSelect={this.kalenderInnhold}/>
              </div>
              )
              }
        
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay'
            }}
            locale={nbLocale }
            initialView='timeGridWeek'
            editable={true}
            eventDrop={this.handleUpdate}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            weekends={this.state.weekendsVisible}
            events={this.state.avtaler}

            select={this.handleDateSelect}

            eventContent={renderEventContent} // custom render function

            eventClick={this.handleEventClick}

            eventsSet={this.handleEvents} // called after events are initialized/added/changed/removed
     
          />
        </div>
      </div>
    )
  }

  renderSidebar() {
    

    return (
      <div className='demo-app-sidebar'>
        <div className='demo-app-sidebar-section'>
          <h2>Legg til avtale</h2>
          
          <Form onSubmit={this.handleSave}>
          <Form.Group controlId="formTitle">
            <Form.Label>Tittel</Form.Label>
            <Form.Control type="text" placeholder="Tittel" onChange={this.handleTitleChange} />
          </Form.Group>

          <Form.Group controlId="formBeskrivelse">
            <Form.Label>Beskrivelse</Form.Label>
            <Form.Control as="textarea" placeholder="Beskrivelse" onChange={this.handleBeskrivelseChange} />
          </Form.Group>

          <Form.Group controlId="formSted">
            <Form.Label>Sted</Form.Label>
            <Form.Control type="text" placeholder="Sted" onChange={this.handleStedChange} />
          </Form.Group>

          <Form.Group controlId="formStart">
            <Form.Label>Velg starttid: </Form.Label>
            <Form.Control type="datetime-local" value = {this.state.start}  onChange={this.handleStartChange} />
          </Form.Group>

          <Form.Group controlId="formSlutt">
            <Form.Label>Velg sluttid: </Form.Label>
            <Form.Control type="datetime-local" value = {this.state.slutt}  onChange={this.handleSluttChange} />
          </Form.Group>

        <div> <b>
          {
            !this.state.veileder
            ? null
            : (
              <div>
                <p>Dette er avtalene til:</p>
                
              <SelectBrukere 
                onHandleSelect={this.handleSelect}
              />
              </div>
              )
              }
              </b></div>
        
                
         <Button type="submit">Lagre</Button> 
         </Form>

        </div>
        <div className='demo-app-sidebar-section'>

          <Form.Group controlId="formCheckbox">
            
          <Form.Check label="Skjul Helg" checked={this.state.weekendsVisible} onChange={this.handleWeekendsToggle}/>
      
           </Form.Group>
        </div>
        <div className='demo-app-sidebar-section'>

        <Accordion>
          { this.state.avtaler.map(avtale => 
          <Card>
              <Card.Header>
                  <Accordion.Toggle as={Button} variant="link" eventKey={avtale.id}>
                    <h2>{avtale.title} 
                      <br></br>
                    </h2>             
                  </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey={avtale.id}>
                <Card.Body> 
                  
                   <EditDialog eventI={avtale.id} eventT = {avtale.title} eventB ={avtale.beskrivelse} eventS ={avtale.sted} eventStart = {avtale.start} eventE = {avtale.end}/>
                   
                </Card.Body> 
            </Accordion.Collapse>
          </Card>
          )}
        </Accordion> 
               
        </div>
      </div>
    )
  }

  handleWeekendsToggle = () => {
    this.setState({
      weekendsVisible: !this.state.weekendsVisible
    })
  }

  handleUpdate = (info) => {
    if (!alert("Dette sender di:" + info.event.startStr + " " + info.event.endStr + " " + info.event.title +"?")) {
      
      console.log(info.event.extendedProps.Opprettetfor)

      const updateTid = {
        
        start: info.event.startStr, 
        end: info.event.endStr, 
        title: info.event.title, 
        gstart:info.oldEvent.startStr,
        opprettetfor:info.event.extendedProps.Opprettetfor
      };

      axios.post(`http://localhost:3001/api/updateTid`, updateTid)
      .then(response => {
        console.log(response)
      })
      .catch(error => {
        console.log(error)
      })
    }
  }

  handleDelete = (id) => {
    //id.preventDefault();
    //alert("Dette er slett ");
    //  axios.delete(`http://localhost:3001/api/slettAvtale`, id)
    //  .then(response => {
    //      console.log(response)
    //    })
    //    .catch(error => {
    //      console.log(error)
    //    })

     }

  handleSave = (event) => {
    const burkertype =  AuthService.getRole()
    //event.preventDefault();
    console.log(this.state);
    alert("You are submitting " + this.state.opprettetfor + "Dette er bruker type: " + burkertype );


    //LAger objekt som sendes til backend
    const nyavtale = {
      title: this.state.title,
      beskrivelse: this.state.beskrivelse, 
      start: this.state.start, 
      end: this.state.end, 
      sted: this.state.sted,
      opprettetav: this.state.opprettetav, 
      opprettetfor: this.state.opprettetfor
    };
    
    axios.post(`http://localhost:3001/api/nyAvtale`,nyavtale)
          .then(response => {
            console.log(response)
            alert(response)
          })
          .catch(error => {
            console.log(error)
          })
  }


  //Denne funkjsonen avtiveres når en dato eller tispunkt klikkes
  handleDateSelect =   (selectInfo) => {
    //event.preventDefault();
    let calendarApi = selectInfo.view.calendar

    calendarApi.unselect() // clear date selection
    this.setState({
      start: selectInfo.startStr,
      end: selectInfo.endStr
    })
    alert("Dette er tiden :" + selectInfo.startStr + 'til' + this.state.end)
  }


  handleEventClick = (clickInfo) => {
    //Dette er delete
    if (window.confirm(`Er du sikker på at du vil slette '${clickInfo.event.title}'?`)) {
      
      //alert("dette er ID: " + clickInfo.event.id)
      console.log(clickInfo.event);
      const avtaleid = clickInfo.event.id;
      axios.post(`http://localhost:3001/api/slettAvtale`, {
        avtaleid: avtaleid
      })
        .then(response => {
            console.log(response)
          })
          .catch(error => {
            console.log(error)
            console.log("message")
          })
          window.location.reload()
    }
  }


  handleEvents = (events) => {
    this.setState({
      currentEvents: events
    })
  }
}// Slutt på klasse


function renderEventContent(eventInfo) {
  console.log(eventInfo);
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
      
    </>
  )
}

// function renderSidebarEvent(event) {
//   return (
//     <li key={event.avtaleid}>
//       <b>{formatDate(event.start, {year: 'numeric', month: 'short', day: 'numeric'})}</b>
//       <i>{event.title}</i>
//     </li>
//   )
// }
