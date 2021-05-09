import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import nbLocale from '@fullcalendar/core/locales/nb';
import axios from 'axios';
import SelectBrukere from '../Meldinger/Felles/selectBruker.js'; // Komponent som henter brukerne fra backend ----../Felles/selectBruker.js
import AuthService from '../../services/auth.service';

import { Accordion, Card, Form , Button} from 'react-bootstrap'; 

import EditDialog from './editDialog';
import moment from 'moment';
// import SelectGruppe from '../Meldinger/Grupper/selextGruppe.js'


let dagensDato = moment(new Date()).format("YYYY-MM-DDTHH:MM:00.0000Z");

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
      // gruppeId : '',
     
    };
    
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleBeskrivelseChange = this.handleBeskrivelseChange.bind(this); 
    this.kalenderInnhold = this.kalenderInnhold.bind(this);
    this.handleStedChange = this.handleStedChange.bind(this);
    this.handleStartChange = this.handleStartChange.bind(this);
    this.handleEndChange = this.handleEndChange.bind(this);
    // this.handleDateSelect = this.handleDateSelect.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    // this.handleSelectG = this.handleSelectG.bind(this);
   
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

  // //Select Gruope id i Opprettelse av arrangement
  // handleSelectG(value){
  //   this.setState({gruppeId: value })
  // }

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
                <p>Se avtaler for denne brukeren:</p>
                
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
            initialView='dayGridMonth'
            // contentHeight='auto'
            // contentWidth='auto'
            expandRows={true}
            editable={true}    
            droppable={true}
            eventDrop={this.handleUpdate}
        
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            weekends={this.state.weekendsVisible}
            events={this.state.avtaler}

            select={this.handleDateSelect}

            eventContent={renderEventContent} // custom render function

            eventClick={this.handleEventClick} //Når en avtale i kalenderen blir klicket

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
            <Form.Control type="datetime-local" defaultValue = {this.state.start}  onChange={this.handleStartChange} />
          </Form.Group>

          <Form.Group controlId="formSlutt">
            <Form.Label>Velg sluttid: </Form.Label>
            <Form.Control type="datetime-local" defaultValue = {this.state.slutt}  onChange={this.handleEndChange} />
          </Form.Group>

        <div> <b>
          {
            !this.state.veileder
            ? null
            : (
              <div>
                <p>Denne avtalen skal gjelde:</p>
                
              <SelectBrukere 
                onHandleSelect={this.handleSelect}
              />
              {/* <SelectGruppe
                onHandleSelectG={this.handleSelectG}/> */}
              </div>
              )
              }
              </b></div>
        
                
         <Button type="submit" active>Opprett Avtale</Button> {' '}
         </Form>

        </div>
        <div className='demo-app-sidebar-section'>

          <Form.Group controlId="formCheckbox">
            
          <Form.Check label="Skjul Helg" checked={this.state.weekendsVisible} onChange={this.handleWeekendsToggle}/>
      
           </Form.Group>
        </div>
        <div className='demo-app-sidebar-section'>
        <h2>Rediger og slett avtale:</h2>
        <Accordion>
          { this.state.avtaler.map(avtale => 
        
        // denne sørger for at brukeren kun kan redigere kommende avtaler, ikke tidligere.
          avtale.start <= dagensDato ? null : 
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
    if (!alert("Vil du Avtale for :" + info.event.extendedProps.Opprettetfor + " til kl: "+ info.event.start + "slutt" + info.event.end +"?")) {
      console.log(info.event)

      const updateTid = {
        
        start: info.event.startStr, 
        end: info.event.endStr, 
        title: info.event.title, 
        gstart:info.oldEvent.startStr,
        opprettetfor:info.event.extendedProps.Opprettetfor
      };

      axios.patch(`http://localhost:3001/api/updateTid`,updateTid)
      .then(response => {
        console.log(response)
      })
      .catch(error => {
        console.log(error)
      })

    }
  }

  handleSave = (event) => {
    //Sjekker om det er bruker som er valgt. Hvis begge skulle være valgt vil avtalen legges til en bruker.
    // if (this.state.opprettetfor){

    //Lager objekt som sendes til backend
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

          //Slutt på ny avtale
    // }else{
     // alert('Dette er gruppeID: ' + this.state.gruppeId)
    //   const nyGruppeAvtale = {
    //     title: this.state.title,
    //     beskrivelse: this.state.beskrivelse, 
    //     start: this.state.start, 
    //     end: this.state.end, 
    //     sted: this.state.sted,
    //     opprettetav: this.state.opprettetav, 
    //     gruppeId : this.state.gruppeId,

    //   }
    //   axios.post(`http://localhost:3001/api/nyGruppeAvtale`,nyGruppeAvtale)
    //   .then(response => {
    //     console.log(response)
    //     alert(response)
    //   })
    //   .catch(error => {
    //     console.log(error)
    //   }) //Slutt på axios
      
    // }//Avslutter else
    
  }

  //Ved å klikk på avtalen vil brukeren kunne slette(hvis dette er en fremtidig avtale) eller få opp info
  handleEventClick = (clickInfo) => {

      //Informasjon om avtalen
      alert('Tittel: ' +  clickInfo.event.title  +
        '\n Beskrivelse: ' + clickInfo.event.extendedProps.beskrivelse +
        '\n Sted: ' + clickInfo.event.extendedProps.sted + 
        '\n Tid : ' + moment(clickInfo.event.startStr).format('DD-MM-YYYY HH:mm') + ' Til ' + moment(clickInfo.event.endStr).format('DD-MM-YYYY HH:mm'));

  }

//Setter eventene inn i Kalenderen.
  handleEvents = (events) => {
    this.setState({
      currentEvents: events
    })
  }
}// Slutt på klasse


//Dette er hva som skrives ut i kalenderen.
function renderEventContent(eventInfo) {
  console.log(eventInfo);
  return (
    <>
      <i> <b>{eventInfo.timeText}</b>
     {eventInfo.event.title}</i>
      
    </>
  )
}

