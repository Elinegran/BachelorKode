import React from 'react'
import FullCalendar, { formatDate } from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { createEventId,avtaler } from './event-utils'
import nbLocale from '@fullcalendar/core/locales/nb';
import axios from 'axios';
import SelectBrukere from '../Meldinger/Felles/selectBruker.js'; // Komponent som henter brukerne fra backend ----../Felles/selectBruker.js
import AuthService from '../../services/auth.service';


// const { students } = this.props;
// const { name, age } = this.state;



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
      opprettetfor : 0
    };

    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleBeskrivelseChange = this.handleBeskrivelseChange.bind(this);
    this.handleStedChange = this.handleStedChange.bind(this);
    this.handleStartChange = this.handleStartChange.bind(this);
    this.handleEndChange = this.handleEndChange.bind(this);
    this.handleDateSelect = this.handleDateSelect.bind(this);
    this.handleSelect = this.handleSelect.bind(this);

  }



  handleSelect(value){
    this.setState({opprettetfor: value })
  }

  handleTitleChange(event) {
      this.setState({
        title: event.target.value,

      });
      //alert(this.state.title);
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


    axios.get(`http://localhost:3001/api/kalenderAlleAvtaler`)
      .then(res => {
        this.setState({avtaler : res.data})
        const avtaler = res.data;
        this.setState({ avtaler });
      
      })
      const brukertype = AuthService.getRole();
      const idbruker = AuthService.getUserId();
      this.setState({opprettetav: idbruker});

      if(brukertype == 2){
        this.setState({veileder:true})
      }else{
        this.setState({veileder:false})
      }
      // alert("dette er bruker" + this.state.opprettetav + " . Veileder : " + this.state.veileder + "brukerID: " + idbruker)
      // this.setState({opprettetav: idbruker});



     
  };

 


  render() {
    return (
      <div className='demo-app'>
        {this.renderSidebar()}
        
        <div className='demo-app-main'>
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay'
            }}
            locale={nbLocale }
            initialView='dayGridMonth'
            editable={true}
            eventDrop={this.handleUpdate}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            weekends={this.state.weekendsVisible}
            events={this.state.avtaler}

            select={this.handleDateSelect}
            // select={ function(info){
            //   const tid = info.startStr
            //   this.setState({start: tid});
            //   alert('clicked' + tid)
            // }}
            eventContent={renderEventContent} // custom render function
            eventClick={this.handleEventClick}
            eventsSet={this.handleEvents} // called after events are initialized/added/changed/removed
            /* you can update a remote database when these fire:
            eventAdd={function(){}}
            eventChange={function(){}}
            eventRemove={function(){}}
            */
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
          <form onSubmit={this.handleSave}>
          <input type ='text' id='title' navn = 'title' placeholder= 'Tittel' onChange={this.handleTitleChange} />
          <br/>
          <label for= 'beskrivelse'> Beskrivelse</label>
          <input type ='text' id='Beskrivelse' navn = 'beskrivelse' placeholder= 'Beskrivelse' onChange={this.handleBeskrivelseChange}/>
          <br/>
          <label for= 'sted'>Sted</label>
          <input type ='text' id='sted' navn = 'sted' placeholder= 'Sted' onChange={this.handleStedChange}/>

          <br/>
        <label for="start">Velg starttid:</label> <br/>
        <input type="datetime-local" id="start" name="start"  value = {this.state.start} onChange={this.handleStartChange}/>

        <label for="slutt">Velg sluttid:</label> <br/>
        <input type="datetime-local" id="slutt" name="sutt" onChange={this.handleEndChange}/>

        <div> <b>
          {
            !this.state.veileder
            ? null 
            : (
              <div>
                <p>Dette er en avtale for:</p>
                
              <SelectBrukere 
                onHandleSelect={this.handleSelect}
              />
              </div>
              )
              }
              </b></div>
        
        
        {/* <input type="time" id="starttid" name="starttid" onChange={this.handleTidChange}/> */}
          
         <button type="submit">Lagre</button> 
         </form>

        </div>
        <div className='demo-app-sidebar-section'>
          <label>
            <input
              type='checkbox'
              checked={this.state.weekendsVisible}
              onChange={this.handleWeekendsToggle}
            ></input>
            Skjul helg
          </label>
        </div>
        <div className='demo-app-sidebar-section'>
          <h2>All Events ({this.state.currentEvents.length})</h2>
          <ul>
            {this.state.currentEvents.map(renderSidebarEvent)}
          </ul>
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
    const burkertype =  AuthService.getRole()
    //event.preventDefault();
    console.log(this.state);
    alert("You are submitting " + this.state.opprettetav + "Dette er bruker type: " + burkertype );


    //Sende parametere med en gang
    // google req.body
    // skriv ut hva som blir mnotatt i console.log
    //Ring anne
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
            console.log('vi har fått respone')
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

    alert("Dette er tiden :" + this.state.start + 'til' + this.state.end)
    // if (title) {
    //   calendarApi.addEvent({
    //     avtaleid: createEventId(),
    //     title,
    //     start: selectInfo.startStr,
    //     end: selectInfo.endStr,
    //     allDay: selectInfo.allDay
    //   })
    // }
  }


  handleEventClick = (clickInfo) => {
    console.log(clickInfo)
    alert("dette er clikinfo: " + clickInfo.event.extendedProps.beskrivelse + clickInfo.event.extendedProps.sted)
    // For å hente ut ekstrended props skrive: clickInfo.event.extendedProps.DinVariabel
   
  }

  handleEvents = (events) => {
    this.setState({
      currentEvents: events
    })
  }

}

function renderEventContent(eventInfo) {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
      
     
    </>
  )
}

function renderSidebarEvent(event) {
  return (
    <li key={event.avtaleid}>
      <b>{formatDate(event.start, {year: 'numeric', month: 'short', day: 'numeric'})}</b>
      <i>{event.title}</i>
    </li>
  )
}
